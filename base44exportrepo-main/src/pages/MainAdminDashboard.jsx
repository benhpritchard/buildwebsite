import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, CreditCard, LogOut, Trash2, Edit } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '../components/finquest/Header';
import Footer from '../components/finquest/Footer';
import { createPageUrl } from '@/utils';

const MAIN_ADMIN_EMAIL = 'benhpritchard2024@gmail.com';

const YEAR_GROUPS = [
  'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6',
  'Year 7', 'Year 8', 'Year 9'
];

export default function MainAdminDashboard() {
  const [user, setUser] = useState(null);
  const [addTeacherOpen, setAddTeacherOpen] = useState(false);
  const [editTeacherOpen, setEditTeacherOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [newTeacher, setNewTeacher] = useState({ email: '', school_name: '', credits_total: 0 });
  const [editCredits, setEditCredits] = useState(0);
  const queryClient = useQueryClient();

  // Check for admin session
  React.useEffect(() => {
    const storedTeacher = localStorage.getItem('finnquest_teacher') || localStorage.getItem('finquest_teacher');
    if (!storedTeacher) {
      window.location.href = createPageUrl('AdminLogin');
      return;
    }
    const teacherData = JSON.parse(storedTeacher);
    if (teacherData.email !== MAIN_ADMIN_EMAIL) {
      window.location.href = createPageUrl('AdminDashboard');
      return;
    }
    setUser(teacherData);
  }, []);

  // Fetch all teachers (excluding main admin)
  const { data: teachers = [] } = useQuery({
    queryKey: ['all-teachers'],
    queryFn: async () => {
      const allTeachers = await base44.entities.Teacher.list();
      // Filter out main admin
      return allTeachers.filter(t => t.email !== MAIN_ADMIN_EMAIL);
    },
    enabled: !!user
  });

  // Mutations
  const createTeacherMutation = useMutation({
    mutationFn: (data) => base44.entities.Teacher.create(data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['all-teachers'] });
      setAddTeacherOpen(false);
      setNewTeacher({ email: '', school_name: '', credits_total: 0 });
    }
  });

  const updateTeacherMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Teacher.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-teachers'] });
      setEditTeacherOpen(false);
      setSelectedTeacher(null);
    }
  });

  const deleteTeacherMutation = useMutation({
    mutationFn: (id) => base44.entities.Teacher.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['all-teachers'] })
  });

  const [isAdding, setIsAdding] = useState(false);

  const handleAddTeacher = async () => {
    const emailToAdd = newTeacher.email.toLowerCase().trim();
    
    if (!emailToAdd) {
      alert('Please enter an email address.');
      return;
    }
    
    setIsAdding(true);
    
    // Check if teacher already exists (case insensitive, exclude main admin duplicates)
    const existingTeachers = await base44.entities.Teacher.list();
    const exists = existingTeachers.some(t => 
      t.email?.toLowerCase() === emailToAdd && 
      t.email?.toLowerCase() !== MAIN_ADMIN_EMAIL.toLowerCase()
    );
    
    if (exists) {
      alert('A teacher with this email already exists.');
      setIsAdding(false);
      return;
    }
    
    try {
      await createTeacherMutation.mutateAsync({
        email: emailToAdd,
        school_name: newTeacher.school_name,
        role: 'teacher',
        credits_total: parseInt(newTeacher.credits_total) || 0,
        credits_used: 0,
        unlocked_years: []
      });

      // Try to send welcome email (don't fail if email fails)
      try {
        await base44.integrations.Core.SendEmail({
          to: emailToAdd,
          from_name: 'FinnQuest',
          subject: 'Welcome to FinnQuest!',
          body: `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/8a8ccc245_Gemini_Generated_Image_3z9ysf3z9ysf3z9y.png" alt="FinnQuest Logo" style="height: 80px; width: auto; border-radius: 50%;">
    <h1 style="color: #3448C5; margin-top: 15px;">Welcome to FinnQuest!</h1>
  </div>
  
  <p style="margin-bottom: 20px;">We are delighted to have you as part of our financial literacy journey.</p>
  
  <p style="margin-bottom: 20px;">Please log in to the admin section on our page using the email you have provided us with.</p>
  
  <p style="margin-bottom: 20px;">From here, you can create classes, add children and generate their usernames and passwords.</p>
  
  <p style="margin-bottom: 20px;">If you have any issues with this, please send me an email at <a href="mailto:benhpritchard2024@gmail.com" style="color: #3448C5;">benhpritchard2024@gmail.com</a></p>
  
  <p style="margin-bottom: 20px;">We hope you enjoy the games as much as we did making them!</p>
  
  <p style="margin-top: 30px; font-weight: bold; color: #3448C5;">From The FinnQuest Team</p>
</div>`
        });
        alert('Teacher added successfully! A welcome email has been sent.');
      } catch (emailError) {
        console.error('Email failed but teacher added:', emailError);
        alert('Teacher added successfully! (Note: Welcome email could not be sent)');
      }
    } catch (error) {
      console.error('Error adding teacher:', error);
      alert('Failed to add teacher: ' + error.message);
    } finally {
      setIsAdding(false);
    }
  };

  const handleEditTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setEditCredits(teacher.credits_total || 0);
    setEditTeacherOpen(true);
  };

  const handleUpdateCredits = async () => {
    await base44.entities.Teacher.update(selectedTeacher.id, { credits_total: parseInt(editCredits) || 0 });
    queryClient.invalidateQueries({ queryKey: ['all-teachers'] });
    setEditTeacherOpen(false);
    setSelectedTeacher(null);
  };

  const [togglingYear, setTogglingYear] = useState(null);

  const toggleYearGroup = async (teacher, year) => {
    const toggleKey = `${teacher.id}-${year}`;
    if (togglingYear) return;
    
    setTogglingYear(toggleKey);
    
    const currentYears = Array.isArray(teacher.unlocked_years) ? [...teacher.unlocked_years] : [];
    const isCurrentlyUnlocked = currentYears.includes(year);
    const newYears = isCurrentlyUnlocked 
      ? currentYears.filter(y => y !== year) 
      : [...currentYears, year];
    
    // Optimistic update - immediately update the UI
    queryClient.setQueryData(['all-teachers'], (oldData) => {
      if (!oldData) return oldData;
      return oldData.map(t => 
        t.id === teacher.id ? { ...t, unlocked_years: newYears } : t
      );
    });
    
    try {
      await base44.entities.Teacher.update(teacher.id, { unlocked_years: newYears });
    } catch (error) {
      console.error('Error toggling year:', error);
      // Rollback on error
      queryClient.setQueryData(['all-teachers'], (oldData) => {
        if (!oldData) return oldData;
        return oldData.map(t => 
          t.id === teacher.id ? { ...t, unlocked_years: currentYears } : t
        );
      });
      alert('Failed to update year group. Please try again.');
    } finally {
      setTogglingYear(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('finnquest_teacher');
    localStorage.removeItem('finquest_teacher');
    window.location.href = createPageUrl('Home');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF7F0' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F0' }}>
      <Header />
      
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#3448C5' }}>Main Admin Dashboard</h1>
              <p className="text-gray-600">Manage teachers, credits, and year group access</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-blue-100">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Teachers</p>
                    <p className="text-2xl font-bold">{teachers.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-green-100">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Credits Allocated</p>
                    <p className="text-2xl font-bold">{teachers.reduce((sum, t) => sum + (t.credits_total || 0), 0)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-purple-100">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Credits Used</p>
                    <p className="text-2xl font-bold">{teachers.reduce((sum, t) => sum + (t.credits_used || 0), 0)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add Teacher Button */}
          <div className="mb-6">
            <Button onClick={() => setAddTeacherOpen(true)} className="gap-2" style={{ backgroundColor: '#3448C5' }}>
              <Plus className="w-4 h-4" /> Add New Teacher
            </Button>
          </div>

          {/* Teachers List */}
          <div className="space-y-4">
            {teachers.map((teacher) => (
              <Card key={teacher.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{teacher.school_name || 'No School Name'}</h3>
                      <p className="text-gray-600">{teacher.email}</p>
                      <div className="flex gap-4 mt-2">
                        <Badge variant="outline" className="bg-green-50">
                          Credits: {teacher.credits_used || 0} / {teacher.credits_total || 0}
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50">
                          Remaining: {(teacher.credits_total || 0) - (teacher.credits_used || 0)}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Year Group Checkboxes */}
                    <div className="flex flex-wrap gap-3">
                      {YEAR_GROUPS.map((year) => {
                        const isUnlocked = (teacher.unlocked_years || []).includes(year);
                        return (
                          <label
                            key={year}
                            className="flex items-center gap-1.5 text-xs cursor-pointer"
                          >
                            <Checkbox
                              checked={isUnlocked}
                              onCheckedChange={() => toggleYearGroup(teacher, year)}
                              disabled={togglingYear === `${teacher.id}-${year}`}
                            />
                            <span className={isUnlocked ? 'text-green-700 font-medium' : 'text-gray-500'}>
                              {year}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditTeacher(teacher)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-500 hover:text-red-700"
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (confirm('Are you sure you want to delete this teacher?')) {
                            try {
                              await deleteTeacherMutation.mutateAsync(teacher.id);
                            } catch (deleteError) {
                              console.error('Error deleting teacher:', deleteError);
                              alert('Failed to delete teacher: ' + deleteError.message);
                            }
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {teachers.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">No teachers added yet. Click "Add New Teacher" to get started.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Add Teacher Dialog */}
      <Dialog open={addTeacherOpen} onOpenChange={setAddTeacherOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input
                type="email"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                placeholder="teacher@school.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">School Name</label>
              <Input
                value={newTeacher.school_name}
                onChange={(e) => setNewTeacher({ ...newTeacher, school_name: e.target.value })}
                placeholder="Example Primary School"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Credits to Allocate</label>
              <Input
                type="number"
                value={newTeacher.credits_total}
                onChange={(e) => setNewTeacher({ ...newTeacher, credits_total: e.target.value })}
                placeholder="0"
                min="0"
              />
            </div>
            <Button 
              onClick={handleAddTeacher} 
              className="w-full" 
              style={{ backgroundColor: '#3448C5' }}
              disabled={isAdding}
            >
              {isAdding ? 'Adding Teacher...' : 'Add Teacher'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Teacher Dialog */}
      <Dialog open={editTeacherOpen} onOpenChange={setEditTeacherOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Credits for {selectedTeacher?.school_name || selectedTeacher?.email}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="block text-sm font-medium mb-2">Total Credits</label>
              <Input
                type="number"
                value={editCredits}
                onChange={(e) => setEditCredits(e.target.value)}
                min="0"
              />
              <p className="text-sm text-gray-500 mt-2">
                Currently used: {selectedTeacher?.credits_used || 0} credits
              </p>
            </div>
            <Button onClick={handleUpdateCredits} className="w-full" style={{ backgroundColor: '#3448C5' }}>
              Update Credits
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}