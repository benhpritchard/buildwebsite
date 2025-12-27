import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { getTeacherProfile } from "@/lib/roles";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "../components/finquest/Header";
import Footer from "../components/finquest/Footer";

const MAIN_ADMIN_EMAIL = "benhpritchard2024@gmail.com";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    const emailNormalized = email.trim().toLowerCase();

    try {
      // 1) Firebase Auth sign-in
      const cred = await signInWithEmailAndPassword(auth, emailNormalized, password);
      const uid = cred.user.uid;
      const authEmail = (cred.user.email || emailNormalized).toLowerCase();

      // 2) Default role logic
      // IMPORTANT: main admin fallback by email so we don’t rely on Firestore
      let role = authEmail === MAIN_ADMIN_EMAIL.toLowerCase() ? "main_admin" : "teacher";
      let profile = null;

      // 3) Try Firestore profile (non-blocking / timeout-safe in roles.js)
      // If it fails, we STILL continue.
      profile = await getTeacherProfile(uid);

      if (profile?.role) role = profile.role;

      const teacherSession = {
        id: uid,
        uid,
        email: profile?.email || authEmail,
        role,
        credits_total: Number(profile?.credits_total ?? 0),
        credits_used: Number(profile?.credits_used ?? 0),
        unlocked_years: Array.isArray(profile?.unlocked_years) ? profile.unlocked_years : [],
        school_name: profile?.school_name || "",
      };

      // Store keys your app expects
      localStorage.setItem("finnquest_teacher", JSON.stringify(teacherSession));
      localStorage.setItem("finquest_teacher", JSON.stringify(teacherSession));
      localStorage.setItem("finnquest_role", role);

      // Route
      if (role === "main_admin") navigate("/MainAdminDashboard");
      else navigate("/AdminDashboard");
    } catch (e) {
      console.error("Firebase login error:", e);
      const code = e?.code || "";
      const msg =
        code === "auth/user-not-found"
          ? "User not found in this Firebase project."
          : code === "auth/wrong-password"
          ? "Incorrect password."
          : code === "auth/invalid-credential"
          ? "Invalid email/password."
          : code === "auth/too-many-requests"
          ? "Too many attempts. Wait a moment and try again."
          : "Login failed. Please try again.";

      setError(msg);
    } finally {
      setIsLoading(false);
    }
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
              Teacher Login
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">Use your admin email & password</p>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>

              {error && <p className="text-red-600 text-sm text-center">{error}</p>}

              <Button
                onClick={handleLogin}
                className="w-full text-lg py-6"
                style={{ backgroundColor: "#3448C5" }}
                disabled={isLoading || !email.trim() || !password}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
