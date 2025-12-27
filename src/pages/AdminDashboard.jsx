import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Lock, Unlock, LogOut } from "lucide-react";

import Header from "../components/finquest/Header";
import Footer from "../components/finquest/Footer";
import { createPageUrl } from "@/utils";

const MAIN_ADMIN_EMAIL = "benhpritchard2024@gmail.com";

const yearGroups = [
  "Year 1","Year 2","Year 3","Year 4","Year 5","Year 6",
  "Year 7","Year 8","Year 9",
];

// --- Helpers ---
function generateUsername(name) {
  const clean = name.toLowerCase().replace(/[^a-z]/g, "").slice(0, 10) || "student";
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `${clean}${num}`;
}
function generatePin() {
  return String(Math.floor(Math.random() * 9000) + 1000);
}
function withTimeout(promise, ms, label = "Operation") {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
    ),
  ]);
}
function prettyFirebaseError(e) {
  const code = e?.code || "";
  const msg = e?.message || String(e || "");
  if (msg.toLowerCase().includes("missing or insufficient permissions")) return "Missing or insufficient permissions (Firestore Rules).";
  if (msg.toLowerCase().includes("permission")) return "Permission denied (Firestore Rules).";
  if (msg.toLowerCase().includes("failed to fetch")) return "Network blocked Firestore (school Wi-Fi/VPN/proxy).";
  if (msg.toLowerCase().includes("timed out")) return msg;
  return code ? `${code}: ${msg}` : msg;
}

export default function AdminDashboard() {
  const [user, setUser] = useState(null);

  const [showCreateClass, setShowCreateClass] = useState(false);
  const [className, setClassName] = useState("");
  const [yearGroup, setYearGroup] = useState("");
  const [studentNames, setStudentNames] = useState("");

  const printRef = useRef();
  const queryClient = useQueryClient();

  // 1) Load session from localStorage
  useEffect(() => {
    const storedTeacher =
      localStorage.getItem("finnquest_teacher") ||
      localStorage.getItem("finquest_teacher");

    if (!storedTeacher) {
      window.location.href = createPageUrl("AdminLogin");
      return;
    }

    const teacherData = JSON.parse(storedTeacher);

    // Redirect main admin away
    if ((teacherData.email || "").toLowerCase() === MAIN_ADMIN_EMAIL.toLowerCase()) {
      window.location.href = createPageUrl("MainAdminDashboard");
      return;
    }

    setUser({
      uid: teacherData.uid || teacherData.id,
      email: teacherData.email,
      full_name: teacherData.school_name || teacherData.email,
    });
  }, []);

  // 2) Fetch teacher profile
  const { data: teacher, isLoading: teacherLoading } = useQuery({
    queryKey: ["teacherProfile", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const ref = doc(db, "teachers", user.uid);
      const snap = await withTimeout(getDoc(ref), 8000, "Load teacher profile");
      if (!snap.exists()) return null;
      return { id: snap.id, ...snap.data() };
    },
  });

  // If teacher doc missing
  useEffect(() => {
    if (!user?.uid) return;
    if (teacherLoading) return;
    if (teacher === null) {
      alert("Your account has not been set up. Please contact FinnQuest for access.");
      localStorage.removeItem("finnquest_teacher");
      localStorage.removeItem("finquest_teacher");
      localStorage.removeItem("finnquest_role");
      window.location.href = createPageUrl("AdminLogin");
    }
  }, [user?.uid, teacherLoading, teacher]);

  // 3) Fetch classes for this teacher
  const { data: classes = [], isLoading: classesLoading, error: classesError } = useQuery({
    queryKey: ["classes", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const qy = query(collection(db, "classes"), where("teacherId", "==", user.uid));
      const snap = await withTimeout(getDocs(qy), 8000, "Load classes");
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    },
  });

  // 4) Create class + students (bulk) with full debug + timeout
  const createClassMutation = useMutation({
    mutationFn: async () => {
      if (!user?.uid) throw new Error("No teacher session");
      if (!className.trim() || !yearGroup || !studentNames.trim()) {
        throw new Error("Missing fields");
      }

      console.log("DEBUG projectId:", db?.app?.options?.projectId);
      console.log("CREATE CLASS: Step 1 - inputs", { className, yearGroup });

      const names = studentNames
        .split("\n")
        .map((n) => n.trim())
        .filter(Boolean)
        .slice(0, 35);

      if (names.length === 0) throw new Error("No students provided");

      console.log("CREATE CLASS: Step 2 - parsed students", names.length);

      // Credits check
      const creditsTotal = teacher?.credits_total || 0;
      const creditsUsed = teacher?.credits_used || 0;
      const remaining = creditsTotal - creditsUsed;

      if (creditsTotal > 0 && names.length > remaining) {
        throw new Error(`Not enough credits. You have ${remaining} remaining but need ${names.length}.`);
      }

      console.log("CREATE CLASS: Step 3 - creating class doc...");
      const classRef = await withTimeout(
        addDoc(collection(db, "classes"), {
          teacherId: user.uid,
          name: className.trim(),
          year_group: yearGroup,
          createdAt: serverTimestamp(),
        }),
        12000,
        "Create class write"
      );

      console.log("CREATE CLASS: Step 4 - class created", classRef.id);

      console.log("CREATE CLASS: Step 5 - creating students batch...");
      const batch = writeBatch(db);

      names.forEach((studentName) => {
        const username = generateUsername(studentName);
        const pin = generatePin();
        const studentRef = doc(collection(db, "students"));

        batch.set(studentRef, {
          teacherId: user.uid,
          classId: classRef.id,
          name: studentName,
          username,
          pin,
          has_created_avatar: false,
          createdAt: serverTimestamp(),
        });
      });

      // Update credits used
      if (teacher?.id) {
        const teacherRef = doc(db, "teachers", teacher.id);
        batch.update(teacherRef, {
          credits_used: (teacher?.credits_used || 0) + names.length,
        });
      }

      console.log("CREATE CLASS: Step 6 - committing batch...");
      await withTimeout(batch.commit(), 15000, "Commit students batch");

      console.log("CREATE CLASS: Step 7 - done ✅");
      return { classId: classRef.id, count: names.length };
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["classes", user?.uid] });
      await queryClient.invalidateQueries({ queryKey: ["teacherProfile", user?.uid] });

      setShowCreateClass(false);
      setClassName("");
      setYearGroup("");
      setStudentNames("");
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("finnquest_teacher");
    localStorage.removeItem("finquest_teacher");
    localStorage.removeItem("finnquest_role");
    window.location.href = createPageUrl("Home");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF7F0" }}>
        <p>Loading...</p>
      </div>
    );
  }

  const creditsRemaining = (teacher?.credits_total || 0) - (teacher?.credits_used || 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F0" }}>
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold" style={{ color: "#3448C5" }}>Teacher Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome, {user.full_name || user.email}</p>
              <p className="text-xs text-gray-400 mt-1">
                Debug: projectId={String(db?.app?.options?.projectId || "unknown")}
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>

          {/* Credits + access */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader><CardTitle>Credits</CardTitle></CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold" style={{ color: "#3448C5" }}>{creditsRemaining}</p>
                  <p className="text-gray-500">Credits Remaining</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {teacher?.credits_used || 0} used of {teacher?.credits_total || 0} total
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Year Group Access</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {yearGroups.map((year) => {
                    const isUnlocked = teacher?.unlocked_years?.includes(year);
                    return (
                      <span
                        key={year}
                        className={`px-3 py-1 rounded-full text-sm ${
                          isUnlocked ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {isUnlocked ? <Unlock className="w-3 h-3 inline mr-1" /> : <Lock className="w-3 h-3 inline mr-1" />}
                        {year}
                      </span>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Classes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>My Classes</CardTitle>
                  <Button size="sm" onClick={() => setShowCreateClass(true)}>
                    <Plus className="w-4 h-4 mr-2" /> New Class
                  </Button>
                </CardHeader>

                <CardContent>
                  {classesError && (
                    <div className="text-xs text-red-600 mb-3">
                      Failed to load classes: {prettyFirebaseError(classesError)}
                    </div>
                  )}

                  <div className="space-y-2">
                    {classes.map((cls) => (
                      <Button
                        key={cls.id}
                        variant="outline"
                        className="w-full justify-start text-left h-auto py-3"
                        onClick={() => (window.location.href = createPageUrl(`ClassDashboard?classId=${cls.id}`))}
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-bold">{cls.name}</span>
                          <span className="text-xs text-gray-500">{cls.year_group}</span>
                        </div>
                      </Button>
                    ))}

                    {!classesLoading && classes.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No classes yet. Create one to get started!</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="bg-blue-50 border-blue-100">
                <CardContent className="py-20 text-center">
                  <p className="text-[#3448C5] text-lg font-medium">
                    Select a class from the list to manage students.
                  </p>

                  {createClassMutation.isError && (
                    <p className="mt-4 text-sm text-red-600">
                      Create class failed: {prettyFirebaseError(createClassMutation.error)}
                    </p>
                  )}

                  {createClassMutation.isSuccess && (
                    <p className="mt-4 text-sm text-green-700">
                      Class created ✅
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Create Class Dialog */}
      <Dialog open={showCreateClass} onOpenChange={setShowCreateClass}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Class</DialogTitle>
            <DialogDescription>
              Enter class details and student names (one per line). We’ll generate usernames + PINs.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">Class Name</label>
              <Input value={className} onChange={(e) => setClassName(e.target.value)} placeholder='e.g., "6B"' />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Year Group</label>
              <Select value={yearGroup} onValueChange={setYearGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year group" />
                </SelectTrigger>
                <SelectContent>
                  {yearGroups.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Student Names (one per line, max 35)</label>
              <Textarea
                value={studentNames}
                onChange={(e) => setStudentNames(e.target.value)}
                placeholder={"John Smith\nJane Doe\n..."}
                rows={10}
              />
              <p className="text-sm text-gray-500 mt-1">
                {studentNames.split("\n").filter((n) => n.trim()).length} / 35 students • Credits remaining: {creditsRemaining}
              </p>
            </div>

            <Button
              onClick={() => createClassMutation.mutate()}
              className="w-full"
              style={{ backgroundColor: "#3448C5" }}
              disabled={createClassMutation.isPending}
            >
              {createClassMutation.isPending ? "Creating..." : "Create Class + Generate Student Logins"}
            </Button>

            {createClassMutation.isError && (
              <div className="text-xs text-red-600">
                {prettyFirebaseError(createClassMutation.error)}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
