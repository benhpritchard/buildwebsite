import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getTeacherProfile } from "@/lib/roles";

const MAIN_ADMIN_EMAIL = "benhpritchard2024@gmail.com";

export default function RequireRole({ allow = [], children }) {
  const [state, setState] = useState({ status: "loading", reason: "" });
  const finishedRef = useRef(false);

  useEffect(() => {
    finishedRef.current = false;

    const finish = (next) => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setState(next);
    };

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        finish({ status: "noauth", reason: "" });
        return;
      }

      // Cached session (fast path)
      const cached = localStorage.getItem("finnquest_teacher") || localStorage.getItem("finquest_teacher");
      const cachedRole = localStorage.getItem("finnquest_role") || "teacher";

      // If cached role already allowed, let them in immediately.
      if (allow.includes(cachedRole)) {
        finish({ status: "ok", reason: "cached" });
        return;
      }

      // If this is main admin by email, we can allow main_admin immediately
      const authEmail = (user.email || "").toLowerCase();
      if (authEmail === MAIN_ADMIN_EMAIL.toLowerCase()) {
        localStorage.setItem("finnquest_role", "main_admin");
        // also patch session if it exists
        if (cached) {
          try {
            const s = JSON.parse(cached);
            s.role = "main_admin";
            localStorage.setItem("finnquest_teacher", JSON.stringify(s));
            localStorage.setItem("finquest_teacher", JSON.stringify(s));
          } catch {}
        }
        finish({ status: allow.includes("main_admin") ? "ok" : "forbidden", reason: "main-admin-email" });
        return;
      }

      // Try Firestore role lookup
      try {
        const profile = await getTeacherProfile(user.uid);
        const role = profile?.role || "teacher";
        localStorage.setItem("finnquest_role", role);

        if (allow.includes(role)) finish({ status: "ok", reason: "firestore" });
        else finish({ status: "forbidden", reason: "role" });
      } catch {
        // Firestore blocked/offline:
        // For teacher pages: allow teacher access so schools don’t break.
        // For main admin pages: do NOT allow (needs confirmed role).
        const isMainAdminOnly = allow.length === 1 && allow[0] === "main_admin";
        if (isMainAdminOnly) finish({ status: "forbidden", reason: "firestore-blocked" });
        else finish({ status: "ok", reason: "firestore-blocked-fallback" });
      }
    });

    // Safety timeout: don’t hang forever.
    const t = setTimeout(() => {
      if (!finishedRef.current) {
        const isMainAdminOnly = allow.length === 1 && allow[0] === "main_admin";
        finish({ status: isMainAdminOnly ? "forbidden" : "ok", reason: "timeout-fallback" });
      }
    }, 3500);

    return () => {
      clearTimeout(t);
      unsub();
    };
  }, [allow]);

  if (state.status === "loading") {
    return (
      <div className="pt-32 text-center">
        <div className="font-semibold">Loading…</div>
        <div className="text-xs opacity-70 mt-2">{state.reason}</div>
      </div>
    );
  }

  if (state.status === "noauth") return <Navigate to="/login" replace />;
  if (state.status === "forbidden") return <Navigate to="/" replace />;

  return children;
}
