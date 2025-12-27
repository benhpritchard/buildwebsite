// src/pages/ClassDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { ArrowLeft, Pencil, Printer, Trash2, UserPlus } from "lucide-react";

import Header from "../components/finquest/Header";
import Footer from "../components/finquest/Footer";
import { createPageUrl } from "@/utils";

const YEAR_GROUPS = [
  "Year 1","Year 2","Year 3","Year 4","Year 5","Year 6","Year 7","Year 8","Year 9",
];

// Username: name + random 4 digits
function generateUsername(name) {
  const clean =
    (name || "")
      .toLowerCase()
      .replace(/[^a-z]/g, "")
      .slice(0, 10) || "student";
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `${clean}${num}`;
}

// 4-digit PIN string
function generatePin() {
  return String(Math.floor(Math.random() * 9000) + 1000);
}

function getClassIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  // support both ?classId= and ?classid=
  return params.get("classId") || params.get("classid") || "";
}

export default function ClassDashboard() {
  const queryClient = useQueryClient();

  const [teacherSession, setTeacherSession] = useState(null);
  const [classId, setClassId] = useState("");

  const [activeTab, setActiveTab] = useState("logins"); // logins | assessment | quiz

  const [showAddStudents, setShowAddStudents] = useState(false);
  const [newStudentNames, setNewStudentNames] = useState("");

  const [showEditClass, setShowEditClass] = useState(false);
  const [editClassName, setEditClassName] = useState("");
  const [editYearGroup, setEditYearGroup] = useState("");

  // 1) Load teacher session + classId
  useEffect(() => {
    const stored =
      localStorage.getItem("finnquest_teacher") ||
      localStorage.getItem("finquest_teacher");

    if (!stored) {
      window.location.href = createPageUrl("AdminLogin");
      return;
    }

    const parsed = JSON.parse(stored);
    setTeacherSession({
      uid: parsed.uid || parsed.id,
      email: parsed.email,
      school_name: parsed.school_name || "",
    });

    setClassId(getClassIdFromUrl());
  }, []);

  const teacherUid = teacherSession?.uid;

  // 2) Load teacher profile
  const { data: teacherProfile, isLoading: teacherLoading } = useQuery({
    queryKey: ["teacherProfile", teacherUid],
    enabled: !!teacherUid,
    queryFn: async () => {
      const ref = doc(db, "teachers", teacherUid);
      const snap = await getDoc(ref);
      if (!snap.exists()) return null;
      return { id: snap.id, ...snap.data() };
    },
  });

  // 3) Load class doc
  const { data: classDetails, isLoading: classLoading } = useQuery({
    queryKey: ["class", classId],
    enabled: !!classId,
    queryFn: async () => {
      const ref = doc(db, "classes", classId);
      const snap = await getDoc(ref);
      if (!snap.exists()) return null;
      return { id: snap.id, ...snap.data() };
    },
  });

  // 4) Load students for this class + teacher
  const { data: students = [], isLoading: studentsLoading } = useQuery({
    queryKey: ["students", classId, teacherUid],
    enabled: !!classId && !!teacherUid,
    queryFn: async () => {
      const q = query(
        collection(db, "students"),
        where("classId", "==", classId),
        where("teacherId", "==", teacherUid)
      );
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    },
  });

  const creditsRemaining = useMemo(() => {
    const total = Number(teacherProfile?.credits_total || 0);
    const used = Number(teacherProfile?.credits_used || 0);
    return total - used;
  }, [teacherProfile]);

  // Guard: class not found OR belongs to another teacher
  useEffect(() => {
    if (!classId) return;
    if (classLoading) return;

    if (!classDetails) {
      alert("Class not found (wrong link or deleted).");
      window.location.href = createPageUrl("AdminDashboard");
      return;
    }

    if (teacherUid && classDetails.teacherId && classDetails.teacherId !== teacherUid) {
      alert("You don’t have permission to view this class.");
      window.location.href = createPageUrl("AdminDashboard");
    }
  }, [classId, classLoading, classDetails, teacherUid]);

  const addStudentsMutation = useMutation({
    mutationFn: async ({ names }) => {
      if (!teacherUid) throw new Error("Missing teacher session");
      if (!classId) throw new Error("Missing classId");
      if (!teacherProfile) throw new Error("Teacher profile not loaded");

      const total = Number(teacherProfile?.credits_total || 0);
      const used = Number(teacherProfile?.credits_used || 0);
      const remaining = total - used;

      if (total > 0 && names.length > remaining) {
        throw new Error(`Not enough credits. You have ${remaining} remaining but need ${names.length}.`);
      }

      const batch = writeBatch(db);

      names.forEach((studentName) => {
        const studentRef = doc(collection(db, "students"));
        batch.set(studentRef, {
          teacherId: teacherUid,
          classId,
          name: studentName,
          username: generateUsername(studentName),
          pin: generatePin(),
          has_created_avatar: false,
          createdAt: serverTimestamp(),
        });
      });

      batch.update(doc(db, "teachers", teacherUid), {
        credits_used: used + names.length,
      });

      await batch.commit();
      return true;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["students", classId, teacherUid] });
      await queryClient.invalidateQueries({ queryKey: ["teacherProfile", teacherUid] });
      setNewStudentNames("");
      setShowAddStudents(false);
    },
  });

  const deleteStudentMutation = useMutation({
    mutationFn: async ({ studentId }) => {
      if (!teacherUid) throw new Error("Missing teacher session");
      if (!teacherProfile) throw new Error("Teacher profile not loaded");

      const used = Number(teacherProfile?.credits_used || 0);

      const batch = writeBatch(db);
      batch.delete(doc(db, "students", studentId));
      batch.update(doc(db, "teachers", teacherUid), {
        credits_used: Math.max(0, used - 1),
      });

      await batch.commit();
      return true;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["students", classId, teacherUid] });
      await queryClient.invalidateQueries({ queryKey: ["teacherProfile", teacherUid] });
    },
  });

  const updateClassMutation = useMutation({
    mutationFn: async ({ name, year_group }) => {
      if (!classId) throw new Error("Missing classId");
      await updateDoc(doc(db, "classes", classId), { name, year_group });
      return true;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["class", classId] });
      setShowEditClass(false);
    },
  });

  const handleAddStudents = () => {
    const names = newStudentNames
      .split("\n")
      .map((n) => n.trim())
      .filter(Boolean)
      .slice(0, 35);

    if (names.length === 0) return;
    addStudentsMutation.mutate({ names });
  };

  const handleDeleteStudent = (studentId, studentName) => {
    if (confirm(`Remove ${studentName}? This refunds 1 credit.`)) {
      deleteStudentMutation.mutate({ studentId });
    }
  };

  const openEditClass = () => {
    setEditClassName(classDetails?.name || "");
    setEditYearGroup(classDetails?.year_group || "");
    setShowEditClass(true);
  };

  const handleEditClass = () => {
    if (!editClassName.trim()) return;
    if (!editYearGroup) return alert("Please select a year group.");
    updateClassMutation.mutate({
      name: editClassName.trim(),
      year_group: editYearGroup,
    });
  };

  const handlePrintCards = () => {
    const printContent = document.getElementById("print-cards");
    if (!printContent) return;

    const w = window.open("", "", "width=900,height=650");
    w.document.write(`
      <html>
        <head>
          <title>Student Login Cards</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
            .card { border: 2px solid #3448C5; border-radius: 10px; padding: 15px; text-align: center; page-break-inside: avoid; }
            .card h3 { margin: 0 0 10px 0; color: #3448C5; font-size: 14px; }
            .card p { margin: 5px 0; font-size: 12px; }
            .label { color: #666; }
            .value { font-weight: bold; color: #333; font-size: 14px; }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `);
    w.document.close();
    w.print();
  };

  if (!teacherSession || teacherLoading || classLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF7F0" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!classId) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF7F0" }}>
        <p>Missing classId in the URL. Go back and open the class again.</p>
      </div>
    );
  }

  if (!teacherProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF7F0" }}>
        <p>Your teacher account is not set up in Firestore.</p>
      </div>
    );
  }

  if (!classDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF7F0" }}>
        <p>Class not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F0" }}>
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <Button
            variant="outline"
            onClick={() => (window.location.href = createPageUrl("AdminDashboard"))}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>

          <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
            <div>
              <h1 className="text-4xl font-bold" style={{ color: "#3448C5" }}>
                {classDetails.name}
              </h1>
              <p className="text-gray-600 mt-2">
                {classDetails.year_group} • {students.length} Students
              </p>
              <p className="text-xs text-gray-500 mt-1">Credits remaining: {creditsRemaining}</p>
            </div>

            <Button onClick={openEditClass} variant="outline" className="gap-2">
              <Pencil className="w-4 h-4" /> Edit Class
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-200 pb-1 overflow-x-auto">
            {["logins", "assessment", "quiz"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-6 py-3 font-bold text-lg transition-colors whitespace-nowrap ${
                  activeTab === t
                    ? "text-[#3448C5] border-b-4 border-[#3448C5]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t === "logins" ? "Student Logins" : t === "assessment" ? "Assessment" : "Set Quiz"}
              </button>
            ))}
          </div>

          {activeTab === "logins" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
                <CardTitle>Manage Students</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddStudents(true)}
                    className="gap-1"
                  >
                    <UserPlus className="w-4 h-4" /> Add Students
                  </Button>
                  <Button
                    onClick={handlePrintCards}
                    size="sm"
                    className="gap-1 bg-[#3448C5]"
                  >
                    <Printer className="w-4 h-4" /> Print Cards
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {studentsLoading ? (
                  <div className="py-8 text-center text-gray-600">Loading students…</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-3 text-left">Name</th>
                          <th className="border p-3 text-left">Username</th>
                          <th className="border p-3 text-left">PIN</th>
                          <th className="border p-3 text-center w-16">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((s) => (
                          <tr key={s.id}>
                            <td className="border p-3">{s.name}</td>
                            <td className="border p-3 font-mono">{s.username}</td>
                            <td className="border p-3 font-mono">{s.pin}</td>
                            <td className="border p-3 text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteStudent(s.id, s.name)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                disabled={deleteStudentMutation.isPending}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                        {students.length === 0 && (
                          <tr>
                            <td colSpan={4} className="border p-6 text-center text-gray-500">
                              No students yet. Add some students to generate logins.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Hidden print content */}
                <div id="print-cards" className="hidden">
                  <div className="card-grid">
                    {students.map((s) => (
                      <div key={s.id} className="card">
                        <h3>FinnQuest Login</h3>
                        <p className="label">Name</p>
                        <p className="value">{s.name}</p>
                        <p className="label">Username</p>
                        <p className="value">{s.username}</p>
                        <p className="label">PIN</p>
                        <p className="value">{s.pin}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </CardContent>
            </Card>
          )}

          {activeTab !== "logins" && (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {activeTab === "assessment" ? "Assessment Area" : "Set Quiz"}
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">Coming soon.</p>
            </div>
          )}

        </div>
      </div>

      {/* Add Students Dialog */}
      <Dialog open={showAddStudents} onOpenChange={setShowAddStudents}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Students to {classDetails.name}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">Student Names (one per line)</label>
              <Textarea
                value={newStudentNames}
                onChange={(e) => setNewStudentNames(e.target.value)}
                placeholder={"John Smith\nJane Doe\n..."}
                rows={8}
              />
              <p className="text-sm text-gray-500 mt-1">
                {newStudentNames.split("\n").filter((n) => n.trim()).length} students • Credits remaining:{" "}
                {creditsRemaining}
              </p>
            </div>

            {addStudentsMutation.isError && (
              <div className="text-sm text-red-600">
                {String(addStudentsMutation.error?.message || "Error adding students")}
              </div>
            )}

            <Button
              onClick={handleAddStudents}
              className="w-full"
              style={{ backgroundColor: "#3448C5" }}
              disabled={addStudentsMutation.isPending}
            >
              {addStudentsMutation.isPending ? "Adding..." : "Add Students"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Class Dialog */}
      <Dialog open={showEditClass} onOpenChange={setShowEditClass}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">Class Name</label>
              <Input
                value={editClassName}
                onChange={(e) => setEditClassName(e.target.value)}
                placeholder='e.g., "6B"'
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Year Group</label>
              <Select value={editYearGroup} onValueChange={setEditYearGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year group" />
                </SelectTrigger>
                <SelectContent>
                  {YEAR_GROUPS.map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {updateClassMutation.isError && (
              <div className="text-sm text-red-600">
                {String(updateClassMutation.error?.message || "Error updating class")}
              </div>
            )}

            <Button
              onClick={handleEditClass}
              className="w-full"
              style={{ backgroundColor: "#3448C5" }}
              disabled={updateClassMutation.isPending}
            >
              {updateClassMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
