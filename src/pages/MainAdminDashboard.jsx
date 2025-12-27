import React, { useEffect, useMemo, useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase"; // ✅ IMPORTANT: use SAME auth + db instance
import { secondaryAuth } from "@/lib/firebaseSecondaryAuth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import { Plus, Users, CreditCard, Trash2, LogOut, AlertTriangle } from "lucide-react";
import Header from "../components/finquest/Header";
import Footer from "../components/finquest/Footer";
import { createPageUrl } from "@/utils";

const MAIN_ADMIN_EMAIL = "benhpritchard2024@gmail.com";

const YEAR_GROUPS = [
  "Year 1","Year 2","Year 3","Year 4","Year 5","Year 6","Year 7","Year 8","Year 9",
];

// ✅ helper: don’t let Firestore calls hang forever
function withTimeout(promise, ms, label = "Operation") {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
    ),
  ]);
}

function normalizeUnlockedYears(arr) {
  if (!Array.isArray(arr)) return [];
  // Keep only valid Year strings (prevents junk values like "year2")
  return arr.filter((y) => YEAR_GROUPS.includes(y));
}

export default function MainAdminDashboard() {
  const [user, setUser] = useState(null);

  const [teachers, setTeachers] = useState([]);
  const [isLoadingTeachers, setIsLoadingTeachers] = useState(true);

  const [addOpen, setAddOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [newTeacher, setNewTeacher] = useState({
    email: "",
    password: "",
    school_name: "",
    credits_total: 0,
  });

  // 🔥 Very important: show hard errors instead of silent timeouts
  const [fatal, setFatal] = useState("");

  const totals = useMemo(() => {
    const totalCredits = teachers.reduce((sum, t) => sum + (Number(t.credits_total) || 0), 0);
    const usedCredits = teachers.reduce((sum, t) => sum + (Number(t.credits_used) || 0), 0);
    return { totalCredits, usedCredits };
  }, [teachers]);

  // ✅ verify main admin session (localStorage) AND verify Firestore role doc is readable
  useEffect(() => {
    const stored =
      localStorage.getItem("finnquest_teacher") ||
      localStorage.getItem("finquest_teacher");

    if (!stored) {
      window.location.href = createPageUrl("AdminLogin");
      return;
    }

    const parsed = JSON.parse(stored);

    if ((parsed.email || "").toLowerCase() !== MAIN_ADMIN_EMAIL.toLowerCase()) {
      window.location.href = createPageUrl("AdminDashboard");
      return;
    }

    setUser(parsed);
  }, []);

  // ✅ Confirm: we are on the Firebase project we think we are on,
  // and we can read our own teacher doc which must have role="main_admin"
  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        console.log("DEBUG projectId:", db.app.options.projectId);
        console.log("DEBUG main auth uid:", auth.currentUser?.uid);

        if (!auth.currentUser?.uid) {
          // Not fatal: localStorage says you're logged in but auth may be loading.
          // Give it a moment. If needed you can refresh.
          return;
        }

        const ref = doc(db, "teachers", auth.currentUser.uid);
        const snap = await withTimeout(getDoc(ref), 6000, "Read main admin teacher doc");

        if (!snap.exists()) {
          setFatal(
            `Your main admin Firestore doc is missing at /teachers/${auth.currentUser.uid}.\n\nCreate it in Firestore with role="main_admin".`
          );
          return;
        }

        const data = snap.data();
        if (data?.role !== "main_admin") {
          setFatal(
            `Your Firestore role is not main_admin.\n\nIn /teachers/${auth.currentUser.uid}, set role = "main_admin".`
          );
          return;
        }

        // OK
        setFatal("");
      } catch (e) {
        console.error("Main admin verification failed:", e);
        setFatal(
          `Cannot read your main admin doc from Firestore.\n\nThis is either:\n- Firestore rules blocking reads\n- Wrong Firebase project/env vars\n- Network blocking Firestore\n\nError: ${e?.message || e}`
        );
      }
    })();
  }, [user]);

  // ✅ load teachers from Firestore
  const loadTeachers = async () => {
    setIsLoadingTeachers(true);
    try {
      const snap = await withTimeout(getDocs(collection(db, "teachers")), 8000, "Load teachers");

      const list = snap.docs
        .map((d) => {
          const data = d.data();
          return {
            id: d.id,
            ...data,
            unlocked_years: normalizeUnlockedYears(data?.unlocked_years),
          };
        })
        .filter((t) => (t.email || "").toLowerCase() !== MAIN_ADMIN_EMAIL.toLowerCase());

      list.sort((a, b) => (a.school_name || "").localeCompare(b.school_name || ""));
      setTeachers(list);
    } catch (e) {
      console.error("Failed to load teachers:", e);
      alert(
        "Could not load teachers from Firestore.\n\nMost common causes:\n- Firestore Rules don't allow this user to read /teachers\n- Network blocks Firestore\n- Wrong Firebase project/env vars\n\nError: " + (e?.message || e)
      );
    } finally {
      setIsLoadingTeachers(false);
    }
  };

  useEffect(() => {
    if (user && !fatal) loadTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, fatal]);

  // ✅ create teacher (Auth + Firestore teacher doc)
  const handleAddTeacher = async () => {
    if (fatal) {
      alert("Fix the red error message first — Firestore isn’t accessible for main admin yet.");
      return;
    }

    const email = newTeacher.email.trim().toLowerCase();
    const password = newTeacher.password;
    const school_name = newTeacher.school_name.trim();
    const credits_total = Number(newTeacher.credits_total) || 0;

    if (!email) return alert("Please enter an email.");
    if (!password || password.length < 6) return alert("Password must be at least 6 characters.");
    if (!school_name) return alert("Please enter a school name.");

    setIsCreating(true);

    let createdUid = null;

    try {
      console.log("CREATE TEACHER: Step 1 - starting", { email, school_name, credits_total });
      console.log("DEBUG projectId:", db.app.options.projectId);

      // Step A: Create Auth user on secondary app
      console.log("CREATE TEACHER: Step 2 - creating Auth user...");
      const cred = await createUserWithEmailAndPassword(secondaryAuth, email, password);

      createdUid = cred.user.uid;
      console.log("CREATE TEACHER: Step 3 - Auth user created", createdUid);

      // Step B: Write teacher profile doc
      console.log("CREATE TEACHER: Step 4 - writing Firestore teacher doc...");
      const teacherDocRef = doc(db, "teachers", createdUid);

      await withTimeout(
        setDoc(teacherDocRef, {
          email,
          role: "teacher",
          school_name,
          credits_total,
          credits_used: 0,
          unlocked_years: [],
          created_at: serverTimestamp(),
        }),
        12000,
        "Firestore write (teacher profile)"
      );

      // Step C: Verify write by reading it back (catches “writes going to different project” immediately)
      console.log("CREATE TEACHER: Step 5 - verifying Firestore write...");
      const verifySnap = await withTimeout(getDoc(teacherDocRef), 8000, "Verify teacher profile exists");
      if (!verifySnap.exists()) {
        throw new Error(
          "Write reported success but document is not readable. This strongly suggests a project mismatch or rules issue."
        );
      }

      console.log("CREATE TEACHER: Step 6 - signing out secondary auth...");
      await signOut(secondaryAuth);

      setAddOpen(false);
      setNewTeacher({ email: "", password: "", school_name: "", credits_total: 0 });

      await loadTeachers();
      alert("Teacher created successfully (Auth + Firestore).");
    } catch (e) {
      console.error("Create teacher failed:", e);

      const code = e?.code || "";
      const msg = e?.message || "";

      if (code === "auth/email-already-in-use") {
        alert("That email is already in use in Firebase Auth.");
      } else if (msg.toLowerCase().includes("permission") || msg.toLowerCase().includes("insufficient permissions")) {
        alert("Firestore blocked the write (permissions). This is Firestore Rules / role doc problem.\n\n" + msg);
      } else if (msg.toLowerCase().includes("timed out")) {
        alert(
          "Firestore write timed out.\n\nThis usually means:\n- Firestore is blocked by network\nOR\n- request is stuck due to config/project mismatch\n\nAuth user may have been created.\nUID: " +
            (createdUid || "unknown")
        );
      } else {
        alert("Create teacher failed:\n\n" + (code || msg || "unknown error"));
      }

      try {
        await signOut(secondaryAuth);
      } catch {}
    } finally {
      setIsCreating(false);
    }
  };

  const toggleYear = async (teacher, year) => {
    const current = Array.isArray(teacher.unlocked_years) ? teacher.unlocked_years : [];
    const updated = current.includes(year) ? current.filter((y) => y !== year) : [...current, year];

    // optimistic UI
    setTeachers((prev) => prev.map((t) => (t.id === teacher.id ? { ...t, unlocked_years: updated } : t)));

    try {
      await withTimeout(updateDoc(doc(db, "teachers", teacher.id), { unlocked_years: updated }), 8000, "Update unlocked_years");
    } catch (e) {
      console.error("Toggle year failed:", e);
      alert("Failed to update year group (rules/network).\n\n" + (e?.message || e));
      await loadTeachers();
    }
  };

  const updateCredits = async (teacher, credits) => {
    const credits_total = Math.max(0, Number(credits) || 0);

    // optimistic UI
    setTeachers((prev) => prev.map((t) => (t.id === teacher.id ? { ...t, credits_total } : t)));

    try {
      await withTimeout(updateDoc(doc(db, "teachers", teacher.id), { credits_total }), 8000, "Update credits_total");
    } catch (e) {
      console.error("Update credits failed:", e);
      alert("Failed to update credits (rules/network).\n\n" + (e?.message || e));
      await loadTeachers();
    }
  };

  const deleteTeacher = async (teacher) => {
    if (!confirm("Delete this teacher PROFILE from Firestore?\n\nNote: This does NOT delete the Auth user.")) return;

    try {
      await withTimeout(deleteDoc(doc(db, "teachers", teacher.id)), 8000, "Delete teacher profile");
      await loadTeachers();
    } catch (e) {
      console.error("Delete teacher failed:", e);
      alert("Failed to delete teacher (rules/network).\n\n" + (e?.message || e));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("finnquest_teacher");
    localStorage.removeItem("finquest_teacher");
    localStorage.removeItem("finnquest_role");
    window.location.href = createPageUrl("Home");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <Header />

      <div className="pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#3448C5]">Main Admin Dashboard</h1>
              <p className="text-gray-600">Teachers live in Firestore: /teachers/{`{uid}`}</p>
              <p className="text-xs text-gray-500 mt-1">Project: {String(db.app.options.projectId || "")}</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>

          {fatal && (
            <Card className="mb-6 border-red-300 bg-red-50">
              <CardContent className="p-4 text-red-800">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 mt-0.5" />
                  <div className="whitespace-pre-wrap text-sm">{fatal}</div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Teachers</p>
                  <p className="text-2xl font-bold">{teachers.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-100">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Credits Allocated</p>
                  <p className="text-2xl font-bold">{totals.totalCredits}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-100">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Credits Used</p>
                  <p className="text-2xl font-bold">{totals.usedCredits}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add Teacher */}
          <div className="mb-6 flex gap-3">
            <Button
              onClick={() => setAddOpen(true)}
              className="gap-2"
              style={{ backgroundColor: "#3448C5" }}
              disabled={!!fatal}
            >
              <Plus className="w-4 h-4" /> Add Teacher
            </Button>
            <Button variant="outline" onClick={loadTeachers} disabled={isLoadingTeachers || !!fatal}>
              {isLoadingTeachers ? "Refreshing..." : "Refresh List"}
            </Button>
          </div>

          {/* Teachers List */}
          {isLoadingTeachers ? (
            <Card>
              <CardContent className="p-10 text-center text-gray-600">Loading teachers…</CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {teachers.map((t) => (
                <Card key={t.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{t.school_name || "No School Name"}</h3>
                        <p className="text-gray-600">{t.email}</p>
                        <div className="flex gap-3 mt-2">
                          <Badge variant="outline" className="bg-green-50">
                            Credits: {t.credits_used || 0} / {t.credits_total || 0}
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50">
                            Remaining: {(t.credits_total || 0) - (t.credits_used || 0)}
                          </Badge>
                        </div>
                      </div>

                      {/* Year groups */}
                      <div className="flex flex-wrap gap-3">
                        {YEAR_GROUPS.map((year) => {
                          const isUnlocked = (t.unlocked_years || []).includes(year);
                          return (
                            <label key={year} className="flex items-center gap-1.5 text-xs cursor-pointer">
                              <Checkbox checked={isUnlocked} onCheckedChange={() => toggleYear(t, year)} />
                              <span className={isUnlocked ? "text-green-700 font-medium" : "text-gray-500"}>
                                {year}
                              </span>
                            </label>
                          );
                        })}
                      </div>

                      {/* Credits + delete */}
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          className="w-28"
                          defaultValue={t.credits_total || 0}
                          min={0}
                          onBlur={(e) => updateCredits(t, e.target.value)}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => deleteTeacher(t)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              ))}

              {teachers.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center text-gray-500">
                    No teachers in Firestore yet. Click “Add Teacher”.
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Teacher Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Teacher (Firebase)</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                placeholder="teacher@school.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Temporary Password</label>
              <Input
                type="text"
                value={newTeacher.password}
                onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
                placeholder="min 6 characters"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">School Name</label>
              <Input
                value={newTeacher.school_name}
                onChange={(e) => setNewTeacher({ ...newTeacher, school_name: e.target.value })}
                placeholder="Example Primary School"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Credits to Allocate</label>
              <Input
                type="number"
                min={0}
                value={newTeacher.credits_total}
                onChange={(e) => setNewTeacher({ ...newTeacher, credits_total: e.target.value })}
                placeholder="0"
              />
            </div>

            <Button
              onClick={handleAddTeacher}
              className="w-full"
              style={{ backgroundColor: "#3448C5" }}
              disabled={isCreating}
            >
              {isCreating ? "Creating…" : "Create Teacher"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
