import React, { useState, useEffect } from 'react';
import { Menu, X, User, GraduationCap, LogOut, Gamepad2, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for logged in user (teacher or student)
  useEffect(() => {
    const checkLoggedInUser = () => {
      const storedTeacher = localStorage.getItem('finnquest_teacher') || localStorage.getItem('finquest_teacher');
      const storedStudent = localStorage.getItem('finnquest_student') || localStorage.getItem('finquest_student');
      
      if (storedTeacher) {
        const teacher = JSON.parse(storedTeacher);
        setLoggedInUser({ type: 'admin', display: teacher.email });
      } else if (storedStudent) {
        const student = JSON.parse(storedStudent);
        setLoggedInUser({ type: 'student', display: student.username, yearGroup: student.year_group });
      } else {
        setLoggedInUser(null);
      }
    };

    checkLoggedInUser();
    // Listen for storage changes
    window.addEventListener('storage', checkLoggedInUser);
    return () => window.removeEventListener('storage', checkLoggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('finnquest_teacher');
    localStorage.removeItem('finnquest_student');
    localStorage.removeItem('finquest_teacher');
    localStorage.removeItem('finquest_student');
    setLoggedInUser(null);
    window.location.href = createPageUrl('Home');
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : 'shadow-md'
      }`}
      style={{ backgroundColor: '#3448C5' }}
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to={createPageUrl('Home')} className="flex items-center gap-3 group">
            <span className="text-white font-bold text-2xl md:text-3xl group-hover:text-[#35D0BA] transition-colors duration-200">FinnQuest</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.filter(link => {
              if (loggedInUser?.type === 'student') {
                return !['Schools', 'CPD', 'Contact'].includes(link.name);
              }
              return true;
            }).map((link) => (
              link.page ? (
                <Link
                  key={link.name}
                  to={createPageUrl(link.page)}
                  className="text-white font-extrabold hover:text-[#35D0BA] transition-colors duration-200 text-xl lg:text-2xl tracking-wide px-2"
                >
                  {link.name}
                </Link>
                ) : (
                <a
                  key={link.name}
                  href={link.hash}
                  className="text-white font-extrabold hover:text-[#35D0BA] transition-colors duration-200 text-xl lg:text-2xl tracking-wide px-2"
                >
                  {link.name}
                </a>
              )
            ))}
          </nav>

          {/* Login Buttons / User Info */}
          <div className="hidden md:flex items-center gap-3">
            {loggedInUser ? (
                <>
                  <span className="text-white text-sm font-bold px-3 py-1 bg-white/10 rounded-full">
                    {loggedInUser.type === 'admin' ? <User className="w-4 h-4 inline mr-2" /> : <GraduationCap className="w-4 h-4 inline mr-2" />}
                    {loggedInUser.display}
                  </span>
                  {loggedInUser.type === 'student' && (
                    <div className="flex flex-col gap-2">
                      <Link to={createPageUrl('ExploreGames')}>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white gap-2 h-8 text-sm font-bold px-3 w-full"
                        >
                          <Gamepad2 className="w-4 h-4" /> Games
                        </Button>
                      </Link>
                      <Link to={createPageUrl('StudentProgressDashboard')}>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white gap-2 h-8 text-sm font-bold px-3 w-full"
                        >
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </Button>
                      </Link>
                    </div>
                  )}
                  {loggedInUser.type === 'admin' && (
                    <Link to={createPageUrl('AdminDashboard')}>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white gap-2 text-sm font-bold px-4 h-9"
                      >
                        <User className="w-4 h-4" /> Admin Page
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white gap-2 text-sm font-bold px-4 h-9"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </Button>
                </>
              ) : (
              <>
                <Link to={createPageUrl('AdminLogin')}>
                  <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white gap-2 text-xl px-8 h-14 font-bold">
                    <User className="w-6 h-6" /> Admin
                  </Button>
                </Link>
                <Link to={createPageUrl('StudentLogin')}>
                  <Button size="lg" className="bg-[#35D0BA] hover:bg-[#2bb8a4] text-white gap-2 text-xl px-8 h-14 font-bold">
                    <GraduationCap className="w-6 h-6" /> Student
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
              link.page ? (
                <Link
                  key={link.name}
                  to={createPageUrl(link.page)}
                  className="block text-white font-medium hover:text-[#35D0BA] transition-colors duration-200 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.hash}
                  className="block text-white font-medium hover:text-[#35D0BA] transition-colors duration-200 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              )
            ))}
            <div className="pt-4 border-t border-white/20 space-y-2">
              {loggedInUser ? (
                <>
                  <div className="flex items-center gap-2 text-white font-medium py-2">
                    {loggedInUser.type === 'admin' ? <User className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                    {loggedInUser.display}
                  </div>
                  {loggedInUser.type === 'student' && (
                    <>
                      <Link
                        to={createPageUrl('ExploreGames')}
                        className="flex items-center gap-2 text-white font-medium hover:text-[#35D0BA] transition-colors duration-200 py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Gamepad2 className="w-4 h-4" /> Games
                      </Link>
                      <Link
                        to={createPageUrl('StudentProgressDashboard')}
                        className="flex items-center gap-2 text-white font-medium hover:text-[#35D0BA] transition-colors duration-200 py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                    </>
                  )}
                  {loggedInUser.type === 'admin' && (
                    <Link
                      to={createPageUrl('AdminDashboard')}
                      className="flex items-center gap-2 text-white font-medium hover:text-[#35D0BA] transition-colors duration-200 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-4 h-4" /> Admin Page
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
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