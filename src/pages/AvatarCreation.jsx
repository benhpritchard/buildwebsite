import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";
import { getStudentSession, setStudentSession } from "@/lib/studentSession";

import { createPageUrl } from "@/utils";
import Header from "../components/finquest/Header";
import Footer from "../components/finquest/Footer";
import FinQuestAvatarOffice from "../components/avatar/FinQuestAvatarOffice";

function withTimeout(promise, ms = 8000, label = "Operation") {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
    ),
  ]);
}

export default function AvatarCreation() {
  const [student, setStudent] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const sess = getStudentSession();
    if (!sess) {
      window.location.href = createPageUrl("StudentLogin");
      return;
    }
    setStudent(sess);
  }, []);

  const handleSave = async (newState) => {
    if (!student?.id) return;

    setSaving(true);
    try {
      const updatedStudent = {
        ...student,
        avatar_state: newState,
        has_created_avatar: true,
      };

      // 1) Save to Firestore
      const ref = doc(db, "students", student.id);
      await withTimeout(
        updateDoc(ref, {
          avatar_state: newState,
          has_created_avatar: true,
        }),
        8000,
        "Save avatar"
      );

      // 2) Save to local session
      setStudentSession(updatedStudent);
      setStudent(updatedStudent);
    } catch (e) {
      console.error("Avatar save failed:", e);
      alert(e?.message?.includes("timed out")
        ? "Saving timed out (school Wi-Fi can block Firestore). Try a hotspot once to confirm."
        : "Could not save avatar. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF7F0" }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ffd7a0" }}>
      <Header />
      <div className="pt-24 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {saving && (
            <div className="mb-4 text-sm text-center text-gray-700">
              Saving…
            </div>
          )}
        </div>

        <FinQuestAvatarOffice student={student} onSave={handleSave} />
      </div>
      <Footer />
    </div>
  );
}
