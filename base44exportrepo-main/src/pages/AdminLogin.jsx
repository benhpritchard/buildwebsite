import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '../components/finquest/Header';
import Footer from '../components/finquest/Footer';
import { createPageUrl } from '@/utils';

const MAIN_ADMIN_EMAIL = 'benhpritchard2024@gmail.com';

const MAIN_ADMIN_PASSWORD = 'Liverpool1!';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);

    const emailLower = email.toLowerCase().trim();

    // Check if main admin
    if (emailLower === MAIN_ADMIN_EMAIL) {
      // Show password prompt for main admin
      setShowPasswordPrompt(true);
      setIsLoading(false);
      return;
    }

    await processLogin(emailLower);
  };

  const handleMainAdminLogin = async () => {
    if (password !== MAIN_ADMIN_PASSWORD) {
      setError('Incorrect password.');
      return;
    }

    setIsLoading(true);
    
    // Check if main admin exists in database, create if not
    const mainAdmins = await base44.entities.Teacher.filter({ email: MAIN_ADMIN_EMAIL });
    let mainAdmin;
    if (mainAdmins.length === 0) {
      mainAdmin = await base44.entities.Teacher.create({
        email: MAIN_ADMIN_EMAIL,
        school_name: 'FinnQuest Admin',
        role: 'main_admin',
        credits_total: 0,
        credits_used: 0,
        unlocked_years: []
      });
    } else {
      mainAdmin = mainAdmins[0];
    }
    localStorage.setItem('finnquest_teacher', JSON.stringify(mainAdmin));
    window.location.href = createPageUrl('MainAdminDashboard');
  };

  const processLogin = async (emailLower) => {

    // Find teacher with matching email - fetch all and check manually for case-insensitive match
    const allTeachers = await base44.entities.Teacher.list();
    const matchedTeacher = allTeachers.find(t => t.email?.toLowerCase() === emailLower);
    
    if (!matchedTeacher) {
      setError('Email not found. Please contact FinnQuest for access.');
      setIsLoading(false);
      return;
    }

    // Store teacher session in localStorage
    localStorage.setItem('finnquest_teacher', JSON.stringify(matchedTeacher));
    window.location.href = createPageUrl('AdminDashboard');
  };

  // If showing password prompt for main admin
  if (showPasswordPrompt) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FAF7F0' }}>
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
              <CardTitle className="text-2xl" style={{ color: '#3448C5' }}>Main Admin Login</CardTitle>
              <p className="text-gray-600 mt-2">Please enter your password</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    onKeyDown={(e) => e.key === 'Enter' && handleMainAdminLogin()}
                  />
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <Button 
                  onClick={handleMainAdminLogin} 
                  className="w-full text-lg py-6"
                  style={{ backgroundColor: '#3448C5' }}
                  disabled={isLoading || !password}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setShowPasswordPrompt(false);
                    setPassword('');
                    setError('');
                  }} 
                  className="w-full"
                >
                  Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F0' }}>
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
            <CardTitle className="text-2xl" style={{ color: '#3448C5' }}>Teacher Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Button 
                onClick={handleLogin} 
                className="w-full text-lg py-6"
                style={{ backgroundColor: '#3448C5' }}
                disabled={isLoading || !email.trim()}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}