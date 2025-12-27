import React, { useState, useEffect } from 'react';
import { Menu, X, User, GraduationCap, LogOut, Gamepad2, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Firebase user = { email, uid } when logged in
  const [firebaseUser, setFirebaseUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for Firebase login/logout
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user ? { email: user.email, uid: user.uid } : null);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } finally {
      // clear any old Base44 leftovers so they don't confuse the UI
      localStorage.removeItem('finnquest_teacher');
      localStorage.removeItem('finnquest_student');
      localStorage.removeItem('finquest_teacher');
      localStorage.removeItem('finquest_student');

      setFirebaseUser(null);
      navigate(createPageUrl('Home'));
    }
  };

  const navLinks = [
    { name: 'Home', page: 'Home' },
    { name: 'About', page: 'About' },
    { name: 'Games', page: 'ExploreGames' },
    { name: 'Schools', page: 'ViewResources' },
    { name: 'CPD', page: 'CPD' },
    { name: 'Contact', page: 'Contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-md'}`}
      style={{ backgroundColor: '#3448C5' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
              <div className="bg-white rounded-full p-2">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/8a8ccc245_Gemini_Generated_Image_3z9ysf3z9ysf3z9y.png"
                  alt="FinnQuest Logo"
                  className="h-8 md:h-10 w-auto rounded-full"
                />
              </div>
            </div>
            <span className="text-white font-bold text-xl md:text-2xl">FinnQuest</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={createPageUrl(link.page)}
                className="text-white font-medium hover:text-[#35D0BA] transition-colors duration-200 text-sm lg:text-base"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop: Login/User */}
          <div className="hidden md:flex items-center gap-3">
            {firebaseUser ? (
              <>
                <span className="text-white text-sm font-medium px-3 py-1 bg-white/10 rounded-full">
                  <User className="w-4 h-4 inline mr-1" />
                  {firebaseUser.email}
                </span>

                {/* Temporary button (until we re-enable role redirects) */}
                <Link to={createPageUrl('AdminDashboard')}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white gap-2"
                  >
                    <User className="w-4 h-4" /> Admin Page
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Link to={createPageUrl('AdminLogin')}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white gap-2"
                  >
                    <User className="w-4 h-4" /> Admin
                  </Button>
                </Link>
                <Link to={createPageUrl('StudentLogin')}>
                  <Button size="sm" className="bg-[#35D0BA] hover:bg-[#2bb8a4] text-white gap-2">
                    <GraduationCap className="w-4 h-4" /> Student
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={createPageUrl(link.page)}
                className="block text-white font-medium hover:text-[#35D0BA] transition-colors duration-200 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-white/20 space-y-2">
              {firebaseUser ? (
                <>
                  <div className="flex items-center gap-2 text-white font-medium py-2">
                    <User className="w-4 h-4" /> {firebaseUser.email}
                  </div>

                  <Link
                    to={createPageUrl('AdminDashboard')}
                    className="flex items-center gap-2 text-white font-medium hover:text-[#35D0BA] transition-colors duration-200 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" /> Admin Page
                  </Link>

                  <button
                    onClick={async () => {
                      await handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-white font-medium hover:text-[#35D0BA] transition-colors duration-200 py-2"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={createPageUrl('AdminLogin')}
                    className="flex items-center gap-2 text-white font-medium hover:text-[#35D0BA] transition-colors duration-200 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" /> Admin Login
                  </Link>
                  <Link
                    to={createPageUrl('StudentLogin')}
                    className="flex items-center gap-2 text-white font-medium hover:text-[#35D0BA] transition-colors duration-200 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <GraduationCap className="w-4 h-4" /> Student Login
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
