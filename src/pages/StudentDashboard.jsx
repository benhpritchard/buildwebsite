import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";
import { getStudentSession, clearStudentSession, setStudentSession } from "@/lib/studentSession";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { LogOut, Gamepad2, User, Building2, Brain } from "lucide-react";
import Header from "../components/finquest/Header";
import Footer from "../components/finquest/Footer";

import {
  DEFAULT_BASE_IMAGE,
  HAIR_OPTIONS,
  AVATAR_OPTIONS,
  OUTFITS_OPTIONS,
  TRANSPORT_OPTIONS,
  BACKGROUND_OPTIONS,
  AVATAR_BACKGROUND_DEFAULT,
} from "../components/avatar/avatarData";

function withTimeout(promise, ms = 8000, label = "Operation") {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
    ),
  ]);
}

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [teacherData, setTeacherData] = useState(null);
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    const sess = getStudentSession();
    if (!sess) {
      window.location.href = createPageUrl("StudentLogin");
      return;
    }
    setStudent(sess);

    // Refresh student from Firestore (so avatar/points stay real after logout)
    (async () => {
      try {
        const sRef = doc(db, "students", sess.id);
        const sSnap = await withTimeout(getDoc(sRef), 8000, "Load student profile");
        if (sSnap.exists()) {
          const fresh = { id: sSnap.id, ...sSnap.data() };
          setStudentSession({ ...fresh, class_id: fresh.classId, teacher_id: fresh.teacherId });
          setStudent({ ...fresh, class_id: fresh.classId, teacher_id: fresh.teacherId });
        }
      } catch (e) {
        console.warn("Student refresh failed:", e?.message || e);
      }
    })();
  }, []);

  useEffect(() => {
    if (!student?.teacherId) return;
    (async () => {
      try {
        const tRef = doc(db, "teachers", student.teacherId);
        const tSnap = await withTimeout(getDoc(tRef), 8000, "Load teacher");
        setTeacherData(tSnap.exists() ? { id: tSnap.id, ...tSnap.data() } : null);
      } catch (e) {
        console.warn("Teacher load failed:", e?.message || e);
      }
    })();
  }, [student?.teacherId]);

  useEffect(() => {
    if (!student?.classId) return;
    (async () => {
      try {
        const cRef = doc(db, "classes", student.classId);
        const cSnap = await withTimeout(getDoc(cRef), 8000, "Load class");
        setClassData(cSnap.exists() ? { id: cSnap.id, ...cSnap.data() } : null);
      } catch (e) {
        console.warn("Class load failed:", e?.message || e);
      }
    })();
  }, [student?.classId]);

  const handleLogout = () => {
    clearStudentSession();
    window.location.href = createPageUrl("Home");
  };

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF7F0" }}>
        <p>Loading...</p>
      </div>
    );
  }

  const avatarState = student.avatar_state;
  const points = avatarState?.points || 100;

  const selectedHair = HAIR_OPTIONS.find((h) => h.id === avatarState?.avatar?.hair);
  const selectedAvatar = AVATAR_OPTIONS.find((a) => a.id === avatarState?.avatar?.avatar) || AVATAR_OPTIONS[0];
  const selectedOutfit = OUTFITS_OPTIONS.find((o) => o.id === avatarState?.avatar?.outfits);
  const selectedTransport = TRANSPORT_OPTIONS.find((t) => t.id === avatarState?.avatar?.transport);
  const selectedBackground = BACKGROUND_OPTIONS.find((b) => b.id === avatarState?.avatar?.background) || BACKGROUND_OPTIONS[0];

  const playerName = avatarState?.playerDetails?.name || student.name;

  const hasOutfit = selectedOutfit?.image || selectedOutfit?.avatarImages;
  const getOutfitImage = () => {
    if (!selectedOutfit) return null;
    if (selectedOutfit.avatarImages && avatarState?.avatar?.avatar) {
      return selectedOutfit.avatarImages[avatarState.avatar.avatar] || selectedOutfit.image;
    }
    return selectedOutfit.image;
  };
  const avatarImage = hasOutfit ? getOutfitImage() : (selectedAvatar?.image || DEFAULT_BASE_IMAGE);

  const basePosition = avatarState?.avatar?.layerPositions?.base || { x: 0, y: 0, scale: 1 };
  const hairPosition = avatarState?.avatar?.layerPositions?.hair || { x: 0, y: 0, scale: 1 };
  const transportPosition = avatarState?.avatar?.layerPositions?.transport || { x: 0, y: 0, scale: 1 };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F0" }}>
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-6">
              <div
                className="w-24 h-24 rounded-xl overflow-hidden border-2 border-blue-900 relative"
                style={{
                  backgroundImage: `url(${selectedBackground?.image || AVATAR_BACKGROUND_DEFAULT})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div style={{ transform: "scale(0.35)", transformOrigin: "center center", width: "240px", height: "240px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div
                      style={{
                        width: "240px",
                        height: "240px",
                        transform: `translate(${basePosition.x}px, ${basePosition.y}px) scale(${basePosition.scale})`,
                        position: "relative",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        marginLeft: "-40px",
                      }}
                    >
                      <img src={avatarImage} alt="Avatar" className="h-full w-auto object-contain" />
                      {selectedHair?.image && (
                        <img
                          src={selectedHair.image}
                          alt="Hair"
                          className="absolute object-contain"
                          style={{
                            zIndex: 10,
                            left: `calc(50% + ${hairPosition.x}px)`,
                            top: `${hairPosition.y}px`,
                            transform: `translateX(-50%) scale(${hairPosition.scale})`,
                            width: "60px",
                          }}
                        />
                      )}
                    </div>

                    {selectedTransport?.image && (
                      <div
                        className="absolute object-contain"
                        style={{
                          zIndex: 5,
                          right: "20px",
                          bottom: "10px",
                          width: "100px",
                          transform: `translate(${transportPosition.x}px, ${transportPosition.y}px) scale(${transportPosition.scale})`,
                        }}
                      >
                        <img src={selectedTransport.image} alt="Transport" className="w-full h-full object-contain" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold" style={{ color: "#3448C5" }}>
                  Welcome, {playerName}!
                </h1>
                <p className="text-gray-600">
                  {classData?.name || "Class"} • {classData?.year_group || classData?.yearGroup || ""}
                </p>
                <div className="mt-1 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold" style={{ backgroundColor: "#f6a623", color: "#2b1600" }}>
                  {points} pts
                </div>
              </div>
            </div>

            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to={createPageUrl("ExploreGames")}>
              <Card className="hover:shadow-xl transition-all cursor-pointer h-full">
                <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#3448C5" }}>
                    <Gamepad2 className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2" style={{ color: "#3448C5" }}>Play Games</h2>
                  <p className="text-gray-600">Explore financial literacy games</p>
                </CardContent>
              </Card>
            </Link>

            <Link to={createPageUrl("AvatarCreation")}>
              <Card className="hover:shadow-xl transition-all cursor-pointer h-full">
                <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#35D0BA" }}>
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2" style={{ color: "#3448C5" }}>My Avatar</h2>
                  <p className="text-gray-600">Customize your character</p>
                </CardContent>
              </Card>
            </Link>

            <Link to={createPageUrl("AvatarCreation")}>
              <Card className="hover:shadow-xl transition-all cursor-pointer h-full">
                <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#f6a623" }}>
                    <Building2 className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2" style={{ color: "#3448C5" }}>My Office</h2>
                  <p className="text-gray-600">Design your workspace</p>
                </CardContent>
              </Card>
            </Link>

            <Link to={createPageUrl("TakeQuiz")}>
              <Card className="hover:shadow-xl transition-all cursor-pointer h-full">
                <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#ec4899" }}>
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2" style={{ color: "#3448C5" }}>Take Quiz</h2>
                  <p className="text-gray-600">Test your knowledge</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {teacherData?.unlocked_years?.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Your Unlocked Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {teacherData.unlocked_years.map((year) => (
                    <span key={year} className="px-4 py-2 rounded-full text-white font-medium" style={{ backgroundColor: "#35D0BA" }}>
                      {year}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
