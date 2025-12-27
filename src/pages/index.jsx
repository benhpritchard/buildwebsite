// src/pages/index.jsx
import RequireRole from "@/components/auth/RequireRole";

import Layout from "./Layout.jsx";
import Home from "./Home";
import ExploreGames from "./ExploreGames";
import Contact from "./Contact";
import About from "./About";
import CPD from "./CPD";
import AdminDashboard from "./AdminDashboard";
import StudentLogin from "./StudentLogin";
import AvatarCreation from "./AvatarCreation";
import StudentDashboard from "./StudentDashboard";
import AdminLogin from "./AdminLogin";
import MainAdminDashboard from "./MainAdminDashboard";
import ViewResources from "./ViewResources";
import TakeQuiz from "./TakeQuiz";
import ClassDashboard from "./ClassDashboard";

import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

const PAGES = {
  Home,
  ExploreGames,
  Contact,
  About,
  CPD,
  AdminDashboard,
  StudentLogin,
  AvatarCreation,
  StudentDashboard,
  AdminLogin,
  MainAdminDashboard,
  ViewResources,
  TakeQuiz,
  ClassDashboard,
};

function _getCurrentPage(url) {
  if (url.endsWith("/")) url = url.slice(0, -1);
  let urlLastPart = url.split("/").pop();
  if (urlLastPart.includes("?")) urlLastPart = urlLastPart.split("?")[0];

  return (
    Object.keys(PAGES).find(
      (page) => page.toLowerCase() === urlLastPart.toLowerCase()
    ) || "Home"
  );
}

function PagesContent() {
  const location = useLocation();
  const currentPage = _getCurrentPage(location.pathname);

  return (
    <Layout currentPageName={currentPage}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/StudentLogin" element={<StudentLogin />} />

        <Route path="/Home" element={<Home />} />
        <Route path="/ExploreGames" element={<ExploreGames />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/CPD" element={<CPD />} />
        <Route path="/ViewResources" element={<ViewResources />} />

        {/* Protected */}
        <Route
          path="/AdminDashboard"
          element={
            <RequireRole allow={["teacher", "main_admin"]}>
              <AdminDashboard />
            </RequireRole>
          }
        />
        <Route
          path="/MainAdminDashboard"
          element={
            <RequireRole allow={["main_admin"]}>
              <MainAdminDashboard />
            </RequireRole>
          }
        />

        {/* Student routes */}
        <Route path="/AvatarCreation" element={<AvatarCreation />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/TakeQuiz" element={<TakeQuiz />} />

        {/* Class dashboard (support both casing variants) */}
        <Route path="/ClassDashboard" element={<ClassDashboard />} />
        <Route path="/classdashboard" element={<ClassDashboard />} />
      </Routes>
    </Layout>
  );
}

export default function Pages() {
  return (
    <Router>
      <PagesContent />
    </Router>
  );
}
