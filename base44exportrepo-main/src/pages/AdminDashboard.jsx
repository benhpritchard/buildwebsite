import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Printer, Lock, Unlock, LogOut, Pencil, Trash2, UserPlus, Target } from 'lucide-react';
import Header from '../components/finquest/Header';
import Footer from '../components/finquest/Footer';
import { createPageUrl } from '@/utils';

const MAIN_ADMIN_EMAIL = 'benhpritchard2024@gmail.com';

const yearGroups = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9'];

function generateUsername(name) {
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  return `${cleanName}${randomNum}`;
}

function generatePassword() {
  const adjectives = ['Happy', 'Bright', 'Swift', 'Clever', 'Brave', 'Lucky', 'Sunny', 'Cool'];
  const nouns = ['Star', 'Moon', 'Cloud', 'Tiger', 'Eagle', 'River', 'Mountain', 'Forest'];
  const num = Math.floor(Math.random() * 90) + 10;
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${num}`;
}

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [className, setClassName] = useState('');
  const [yearGroup, setYearGroup] = useState('');
  const [studentNames, setStudentNames] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [showEditClass, setShowEditClass] = useState(false);
  const [showAddStudents, setShowAddStudents] = useState(false);
  const [newStudentNames, setNewStudentNames] = useState('');
  const [editClassName, setEditClassName] = useState('');
  const [editYearGroup, setEditYearGroup] = useState('');
  const printRef = useRef();
  
  const queryClient = useQueryClient();

  // Check for teacher session - redirect main admin to their dashboard
  React.useEffect(() => {
    const storedTeacher = localStorage.getItem('finnquest_teacher') || localStorage.getItem('finquest_teacher');
    if (!storedTeacher) {
      window.location.href = createPageUrl('AdminLogin');
      return;
    }
    const teacherData = JSON.parse(storedTeacher);
    if (teacherData.email === MAIN_ADMIN_EMAIL) {
      window.location.href = createPageUrl('MainAdminDashboard');
      return;
    }
    setUser({ email: teacherData.email, full_name: teacherData.school_name || teacherData.email });
  }, []);

  // Fetch teacher data - case insensitive lookup
  const { data: teacher } = useQuery({
    queryKey: ['teacher', user?.email],
    queryFn: async () => {
      const allTeachers = await base44.entities.Teacher.list();
      return allTeachers.find(t => t.email?.toLowerCase() === user?.email?.toLowerCase());
    },
    enabled: !!user?.email,
  });

  // Fetch classes
  const { data: classes = [] } = useQuery({
    queryKey: ['classes', teacher?.id],
    queryFn: () => base44.entities.Class.filter({ teacher_id: teacher?.id }),
    enabled: !!teacher?.id,
  });

  // Fetch students for selected class
  const { data: students = [] } = useQuery({
    queryKey: ['students', selectedClass?.id],
    queryFn: () => base44.entities.Student.filter({ class_id: selectedClass?.id }),
    enabled: !!selectedClass?.id,
  });

  // Create teacher mutation (not used anymore - teachers are created by main admin)
  const createTeacherMutation = useMutation({
    mutationFn: (data) => base44.entities.Teacher.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teacher'] }),
  });

  // Create class mutation
  const createClassMutation = useMutation({
    mutationFn: (data) => base44.entities.Class.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      setShowCreateClass(false);
      setClassName('');
      setYearGroup('');
      setStudentNames('');
    },
  });

  // Create students mutation
  const createStudentsMutation = useMutation({
    mutationFn: (data) => base44.entities.Student.bulkCreate(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  });

  // Update teacher mutation
  const updateTeacherMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Teacher.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teacher'] }),
  });

  // Update class mutation
  const updateClassMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Class.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      setShowEditClass(false);
    },
  });

  const updateStudentMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Student.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  // Delete class mutation
  const deleteClassMutation = useMutation({
    mutationFn: (id) => base44.entities.Class.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      setSelectedClass(null);
    },
  });

  // Delete student mutation
  const deleteStudentMutation = useMutation({
    mutationFn: (id) => base44.entities.Student.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      // Refund credit
      if (teacher) {
        updateTeacherMutation.mutate({
          id: teacher.id,
          data: { credits_used: Math.max(0, (teacher?.credits_used || 1) - 1) }
        });
      }
    },
  });

  // Redirect if teacher doesn't exist in database (not added by main admin)
  React.useEffect(() => {
    if (user?.email && teacher === null) {
      alert('Your account has not been set up. Please contact FinnQuest for access.');
      localStorage.removeItem('finnquest_teacher');
      localStorage.removeItem('finquest_teacher');
      window.location.href = createPageUrl('AdminLogin');
    }
  }, [user?.email, teacher]);

  const handleCreateClass = async () => {
    if (!className || !yearGroup || !studentNames.trim()) return;
    
    const names = studentNames.split('\n').filter(n => n.trim()).slice(0, 35);
    if (names.length === 0) return;

    // Check credits
    const creditsRemaining = (teacher?.credits_total || 0) - (teacher?.credits_used || 0);
    if (names.length > creditsRemaining) {
      alert(`Not enough credits. You have ${creditsRemaining} credits remaining but need ${names.length}. Please contact FinnQuest for more credits.`);
      return;
    }

    // Create the class
    const newClass = await base44.entities.Class.create({
      name: className,
      teacher_id: teacher.id,
      year_group: yearGroup
    });

    // Generate students with usernames and passwords
    const studentsData = names.map(name => ({
      name: name.trim(),
      username: generateUsername(name.trim()),
      password: generatePassword(),
      class_id: newClass.id,
      teacher_id: teacher.id,
      has_created_avatar: false
    }));

    await createStudentsMutation.mutateAsync(studentsData);
    
    // Update credits used
    await updateTeacherMutation.mutateAsync({
      id: teacher.id,
      data: { credits_used: (teacher?.credits_used || 0) + names.length }
    });

    setSelectedClass(newClass);
    setShowCreateClass(false);
    setClassName('');
    setYearGroup('');
    setStudentNames('');
    queryClient.invalidateQueries({ queryKey: ['classes'] });
  };

  const handleEditClass = () => {
    if (!editClassName) return;
    updateClassMutation.mutate({
      id: selectedClass.id,
      data: { name: editClassName, year_group: editYearGroup }
    });
    setSelectedClass({ ...selectedClass, name: editClassName, year_group: editYearGroup });
  };

  const handleDeleteClass = async (e, classId, className) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete ${className}? This cannot be undone and will delete all students in this class.`)) {
      try {
        // Get students in this class
        const classStudents = await base44.entities.Student.filter({ class_id: classId });

        // Delete all students
        await Promise.all(classStudents.map(student => base44.entities.Student.delete(student.id)));

        // Refund credits
        if (teacher && classStudents.length > 0) {
          await base44.entities.Teacher.update(teacher.id, {
            credits_used: Math.max(0, (teacher.credits_used || 0) - classStudents.length)
          });
          queryClient.invalidateQueries({ queryKey: ['teacher'] });
        }

        // Delete class
        deleteClassMutation.mutate(classId);
      } catch (error) {
        console.error("Error deleting class:", error);
        alert("An error occurred while deleting the class.");
      }
    }
  };

  const handleAddStudents = async () => {
    if (!newStudentNames.trim() || !selectedClass) return;
    
    const names = newStudentNames.split('\n').filter(n => n.trim()).slice(0, 35);
    if (names.length === 0) return;

    const creditsRemaining = (teacher?.credits_total || 0) - (teacher?.credits_used || 0);
    if (names.length > creditsRemaining) {
      alert(`Not enough credits. You have ${creditsRemaining} credits remaining but need ${names.length}.`);
      return;
    }

    const studentsData = names.map(name => ({
      name: name.trim(),
      username: generateUsername(name.trim()),
      password: generatePassword(),
      class_id: selectedClass.id,
      teacher_id: teacher.id,
      has_created_avatar: false
    }));

    await createStudentsMutation.mutateAsync(studentsData);
    await updateTeacherMutation.mutateAsync({
      id: teacher.id,
      data: { credits_used: (teacher?.credits_used || 0) + names.length }
    });

    setNewStudentNames('');
    setShowAddStudents(false);
  };

  const handleDeleteStudent = async (studentId, studentName) => {
    if (confirm(`Are you sure you want to remove ${studentName} from this class? This will refund 1 credit.`)) {
      deleteStudentMutation.mutate(studentId);
    }
  };

  const openEditClass = () => {
    setEditClassName(selectedClass.name);
    setEditYearGroup(selectedClass.year_group);
    setShowEditClass(true);
  };

  const handlePrintCards = () => {
    const printContent = document.getElementById('print-cards');
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Student Login Cards</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
            .card { border: 2px solid #3448C5; border-radius: 10px; padding: 15px; text-align: center; page-break-inside: avoid; }
            .card h3 { margin: 0 0 10px 0; color: #3448C5; font-size: 14px; }
            .card p { margin: 5px 0; font-size: 12px; }
            .card .label { color: #666; }
            .card .value { font-weight: bold; color: #333; font-size: 14px; }
            @media print { .card-grid { grid-template-columns: repeat(3, 1fr); } }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
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
      
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold" style={{ color: '#3448C5' }}>Teacher Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome, {user.full_name || user.email}</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>

          {/* Credits and Year Access Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold" style={{ color: '#3448C5' }}>
                    {(teacher?.credits_total || 0) - (teacher?.credits_used || 0)}
                  </p>
                  <p className="text-gray-500">Credits Remaining</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {teacher?.credits_used || 0} used of {teacher?.credits_total || 0} total
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Year Group Access</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {yearGroups.map((year) => {
                    const isUnlocked = teacher?.unlocked_years?.includes(year);
                    return (
                      <span
                        key={year}
                        className={`px-3 py-1 rounded-full text-sm ${
                          isUnlocked 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {isUnlocked ? <Unlock className="w-3 h-3 inline mr-1" /> : <Lock className="w-3 h-3 inline mr-1" />}
                        {year}
                      </span>
                    );
                  })}
                </div>
                <p className="text-sm text-gray-500 mt-4">Contact FinnQuest to unlock more year groups.</p>
              </CardContent>
            </Card>
          </div>

          {/* Classes Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>My Classes</CardTitle>
                  <Button size="sm" onClick={() => setShowCreateClass(true)}>
                    <Plus className="w-4 h-4 mr-2" /> New Class
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {classes.map((cls) => (
                      <div key={cls.id} className="group relative">
                        <Button
                          variant={selectedClass?.id === cls.id ? "default" : "outline"}
                          className={`w-full justify-start text-left h-auto py-3 pr-12 ${selectedClass?.id === cls.id ? 'bg-[#3448C5] text-white hover:bg-[#2a3a9f]' : ''}`}
                          onClick={() => setSelectedClass(cls)}
                        >
                          <div className="flex flex-col items-start">
                            <span className="font-bold">{cls.name}</span>
                            <span className={selectedClass?.id === cls.id ? "text-white/80" : "text-gray-500"}>{cls.year_group}</span>
                          </div>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 transition-opacity opacity-0 group-hover:opacity-100 ${
                            selectedClass?.id === cls.id 
                              ? 'text-white/70 hover:text-white hover:bg-white/20' 
                              : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                          }`}
                          onClick={(e) => handleDeleteClass(e, cls.id, cls.name)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {classes.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No classes yet. Create one to get started!</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {selectedClass ? (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
                    <div>
                      <CardTitle className="text-2xl" style={{ color: '#3448C5' }}>{selectedClass.name}</CardTitle>
                      <p className="text-sm text-gray-500">{selectedClass.year_group} • {students.length} Students</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setShowAddStudents(true)} className="gap-1">
                        <UserPlus className="w-4 h-4" /> Add Students
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => window.location.href = createPageUrl('ClassUnlocks') + `?classId=${selectedClass.id}`}
                        className="gap-1"
                      >
                        <Unlock className="w-4 h-4" /> Unlock Lessons
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => window.location.href = createPageUrl('AssessmentPage') + `?classId=${selectedClass.id}`}
                        className="gap-1"
                      >
                        <Target className="w-4 h-4" /> Assessment
                      </Button>
                      <Button onClick={handlePrintCards} size="sm" className="gap-1 bg-[#3448C5]">
                        <Printer className="w-4 h-4" /> Print Cards
                      </Button>
                      <Button variant="ghost" size="sm" onClick={openEditClass}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-3 text-left">Name</th>
                            <th className="border p-3 text-left">Username</th>
                            <th className="border p-3 text-left">Password</th>
                            <th className="border p-3 text-left w-32">Year Group</th>
                            <th className="border p-3 text-center w-16">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.map((student) => (
                            <tr key={student.id}>
                              <td className="border p-3">{student.name}</td>
                              <td className="border p-3 font-mono">{student.username}</td>
                              <td className="border p-3 font-mono">{student.password}</td>
                              <td className="border p-3">
                                <Select 
                                  value={student.year_group || selectedClass.year_group} 
                                  onValueChange={(value) => updateStudentMutation.mutate({ id: student.id, data: { year_group: value } })}
                                >
                                  <SelectTrigger className="h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {yearGroups.map((year) => (
                                      <SelectItem key={year} value={year}>{year}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="border p-3 text-center">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteStudent(student.id, student.name)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                          {students.length === 0 && (
                            <tr>
                              <td colSpan="4" className="border p-8 text-center text-gray-500">
                                No students in this class yet. Click "Add Students" to get started.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    
                    <div id="print-cards" className="hidden">
                      <div className="card-grid">
                        {students.map((student) => (
                          <div key={student.id} className="card">
                            <h3>FinnQuest Login</h3>
                            <p className="label">Name</p>
                            <p className="value">{student.name}</p>
                            <p className="label">Username</p>
                            <p className="value">{student.username}</p>
                            <p className="label">Password</p>
                            <p className="value">{student.password}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-blue-50 border-blue-100">
                  <CardContent className="py-20 text-center">
                    <p className="text-[#3448C5] text-lg font-medium">
                      Select a class from the list to manage students, view assessments, and set quizzes.
                    </p>
                    <p className="text-gray-500 mt-2 text-sm">
                      You can create a new class using the button on the left.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

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
                placeholder="e.g., Class 2B"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Year Group</label>
              <Select value={editYearGroup} onValueChange={setEditYearGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year group" />
                </SelectTrigger>
                <SelectContent>
                  {yearGroups.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleEditClass} className="w-full" style={{ backgroundColor: '#3448C5' }}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Students Dialog */}
      <Dialog open={showAddStudents} onOpenChange={setShowAddStudents}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Students to {selectedClass?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">Student Names (one per line)</label>
              <Textarea
                value={newStudentNames}
                onChange={(e) => setNewStudentNames(e.target.value)}
                placeholder="John Smith&#10;Jane Doe&#10;..."
                rows={8}
              />
              <p className="text-sm text-gray-500 mt-1">
                {newStudentNames.split('\n').filter(n => n.trim()).length} students • 
                Credits remaining: {(teacher?.credits_total || 0) - (teacher?.credits_used || 0)}
              </p>
            </div>
            <Button onClick={handleAddStudents} className="w-full" style={{ backgroundColor: '#3448C5' }}>
              Add Students
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Class Dialog */}
      <Dialog open={showCreateClass} onOpenChange={setShowCreateClass}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Class</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">Class Name</label>
              <Input
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="e.g., Class 2B"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Year Group</label>
              <Select value={yearGroup} onValueChange={setYearGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year group" />
                </SelectTrigger>
                <SelectContent>
                  {yearGroups.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Student Names (one per line, max 35)</label>
              <Textarea
                value={studentNames}
                onChange={(e) => setStudentNames(e.target.value)}
                placeholder="John Smith&#10;Jane Doe&#10;..."
                rows={10}
              />
              <p className="text-sm text-gray-500 mt-1">
                {studentNames.split('\n').filter(n => n.trim()).length} / 35 students
              </p>
            </div>
            <Button onClick={handleCreateClass} className="w-full" style={{ backgroundColor: '#3448C5' }}>
              Generate Usernames & Passwords
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}