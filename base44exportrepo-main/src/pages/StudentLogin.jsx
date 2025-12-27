import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '../components/finquest/Header';
import Footer from '../components/finquest/Footer';
import { createPageUrl } from '@/utils';

export default function StudentLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);

    // Find student with matching credentials
    const students = await base44.entities.Student.filter({ username: username });
    
    if (students.length === 0) {
      setError('Username not found');
      setIsLoading(false);
      return;
    }

    const student = students[0];
    
    if (student.password !== password) {
      setError('Incorrect password');
      setIsLoading(false);
      return;
    }

    // Fetch class to get year group
    const classes = await base44.entities.Class.filter({ id: student.class_id });
    const studentClass = classes[0];
    
    // Enrich student object with year group
    const studentWithYear = {
      ...student,
      year_group: studentClass ? studentClass.year_group : null
    };

    // Store student session in localStorage
    localStorage.setItem('finnquest_student', JSON.stringify(studentWithYear));

    // Redirect logic - All students go to the new unified dashboard
    window.location.href = createPageUrl('StudentProgressDashboard');
  };

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
            <CardTitle className="text-2xl" style={{ color: '#3448C5' }}>Student Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Button 
                onClick={handleLogin} 
                className="w-full text-lg py-6"
                style={{ backgroundColor: '#3448C5' }}
                disabled={isLoading}
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