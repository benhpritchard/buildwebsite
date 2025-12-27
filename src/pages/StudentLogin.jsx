// src/pages/StudentLogin.jsx
import React, { useMemo, useState } from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

import { db } from "@/lib/firebase";
import { setStudentSession } from "@/lib/studentSession";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "../components/finquest/Header";
import Footer from "../components/finquest/Footer";
import { createPageUrl } from "@/utils";

function withTimeout(promise, ms = 9000, label = "Operation") {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
    ),
  ]);
}

function normalizeClassCode(v) {
  return (v || "").trim().toUpperCase().replace(/\s+/g, "");
}
function normalizeUsername(v) {
  return (v || "").trim().toLowerCase().replace(/\s+/g, "");
}
function normalizePin(v) {
  return (v || "").trim().replace(/\s+/g, "");
}

export default function StudentLogin() {
  const [classCode, setClassCode] = useState("");
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const codeNorm = useMemo(() => normalizeClassCode(classCode), [classCode]);
  const userNorm = useMemo(() => normalizeUsername(username), [username]);
  const pinNorm = useMemo(() => normalizePin(pin), [pin]);

  const canSubmit = codeNorm.length >= 4 && userNorm.length >= 3 && pinNorm.length >= 3 && !isLoading;

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    if (!codeNorm || !userNorm || !pinNorm) {
      setError("Please enter class code, username and PIN.");
      setIsLoading(false);
      return;
    }

    try {
      // 1) Find class by classCode (support both field names just in case)
      const classQ = query(
        collection(db, "classes"),
        where("classCode", "==", codeNorm),
        limit(1)
      );

      const classSnap = await withTimeout(getDocs(classQ), 9000, "Load class");

      if (classSnap.empty) {
        setError("Class code not found. Check with your teacher.");
        setIsLoading(false);
        return;
      }

      const clsDoc = classSnap.docs[0];
      const cls = { id: clsDoc.id, ...clsDoc.data() };

      // 2) Find student in that class by username (supports both classId/class_id just in case)
      // Your AdminDashboard creates students with: classId + username + pin
      const studentQ = query(
        collection(db, "students"),
        where("classId", "==", cls.id),
        where("username", "==", userNorm),
        limit(1)
      );

      const studentSnap = await withTimeout(getDocs(studentQ), 9000, "Load student");

      if (studentSnap.empty) {
        setError("Username not found for this class. Check spelling.");
        setIsLoading(false);
        return;
      }

      const sDoc = studentSnap.docs[0];
      const student = { id: sDoc.id, ...sDoc.data() };

      // 3) Check PIN (stored as "pin")
      if (String(student.pin ?? "") !== String(pinNorm)) {
        setError("Incorrect PIN.");
        setIsLoading(false);
        return;
      }

      // 4) Store session (keep backwards-friendly keys too)
      setStudentSession({
        ...student,
        class_id: cls.id,
        teacher_id: cls.teacherId,
      });

      // 5) Route
      window.location.href = createPageUrl(
        student.has_created_avatar ? "StudentDashboard" : "AvatarCreation"
      );
    } catch (e) {
      console.error("Student login failed:", e);

      const msg = String(e?.message || "");
      if (msg.toLowerCase().includes("timed out")) {
        setError(
          "Login timed out. This is usually school Wi-Fi blocking Firestore.\nTry a hotspot once to confirm it works."
        );
      } else if (msg.toLowerCase().includes("permission")) {
        setError(
          "Login blocked by permissions. (Firestore rules need to allow students read access for this query.)"
        );
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onEnter = (e) => {
    if (e.key === "Enter" && canSubmit) handleLogin();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F0" }}>
      <Header />

      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/8a8ccc245_Gemini_Generated_Image_3z9ysf3z9ysf3z9y.png"
                alt="FinnQuest Logo"
                className="h-20 w-auto mx-auto rounded-full"
              />
            </div>

            <CardTitle className="text-2xl" style={{ color: "#3448C5" }}>
              Student Login
            </CardTitle>

            <p className="text-sm text-gray-600 mt-2">
              Enter your class code + login details
            </p>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Class Code</label>
                <Input
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                  placeholder="e.g. ABCD12"
                  inputMode="text"
                  onKeyDown={onEnter}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. aisha4821"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  onKeyDown={onEnter}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">PIN</label>
                <Input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="4 digits"
                  inputMode="numeric"
                  onKeyDown={onEnter}
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center whitespace-pre-line">
                  {error}
                </p>
              )}

              <Button
                onClick={handleLogin}
                className="w-full text-lg py-6"
                style={{ backgroundColor: "#3448C5" }}
                disabled={!canSubmit}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <p className="text-xs text-gray-400 text-center">
                Tip: Class Code is on your login card from your teacher.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
