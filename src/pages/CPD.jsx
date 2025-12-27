import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Monitor, Users, School, Plus, Lock, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import Header from '../components/finquest/Header';
import Footer from '../components/finquest/Footer';

const ADMIN_EMAIL = 'benhpritchard2024@gmail.com';
const ADMIN_PASSWORD = 'Liverpool1!';

export default function CPD() {
  const [selectedCategory, setSelectedCategory] = useState('online');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState({ title: '', time: '', description: '', location: '' });

  const queryClient = useQueryClient();

  const { data: events = [] } = useQuery({
    queryKey: ['cpd-events'],
    queryFn: () => base44.entities.CPDEvent.list()
  });

  const createEventMutation = useMutation({
    mutationFn: (eventData) => base44.entities.CPDEvent.create(eventData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cpd-events'] });
      setAddEventOpen(false);
      setNewEvent({ title: '', time: '', description: '', location: '' });
    }
  });

  const categories = [
    { id: 'online', title: 'Online Courses', icon: Monitor, color: '#3448C5' },
    { id: 'face-to-face', title: 'Face to Face', icon: Users, color: '#35D0BA' },
    { id: 'in-school', title: 'In School', icon: School, color: '#FFB68B' }
  ];

  const handleLogin = () => {
    if (loginEmail === ADMIN_EMAIL && loginPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginOpen(false);
      setLoginError('');
      setLoginEmail('');
      setLoginPassword('');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleAddEvent = () => {
    if (!newEvent.title) return;
    createEventMutation.mutate({
      ...newEvent,
      date: format(selectedDate, 'yyyy-MM-dd'),
      category: selectedCategory
    });
  };

  const filteredEvents = events.filter(e => e.category === selectedCategory);

  const getEventsForDate = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return filteredEvents.filter(e => e.date === dateStr);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F0' }}>
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3448C5' }}>
              CPD Training
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700">
              Professional development opportunities for educators
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-8 py-6 text-lg font-semibold transition-all ${
                  selectedCategory === cat.id ? 'scale-105 shadow-lg' : 'opacity-70'
                }`}
                style={{ 
                  backgroundColor: selectedCategory === cat.id ? cat.color : '#e5e7eb',
                  color: selectedCategory === cat.id ? 'white' : '#374151'
                }}
              >
                <cat.icon className="w-5 h-5 mr-2" />
                {cat.title}
              </Button>
            ))}
          </div>

          {/* Calendar Section */}
          {categories.map((cat) => (
            cat.id === selectedCategory && (
              <Card key={cat.id} className="rounded-3xl shadow-xl border-0 overflow-hidden">
                <div className="p-4 text-white text-center" style={{ backgroundColor: cat.color }}>
                  <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                    <cat.icon className="w-6 h-6" />
                    {cat.title}
                  </h2>
                </div>
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Calendar */}
                    <div className="flex-1 flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        className="rounded-xl border shadow-sm"
                        modifiers={{
                          hasEvent: filteredEvents.map(e => new Date(e.date))
                        }}
                        modifiersStyles={{
                          hasEvent: { backgroundColor: cat.color, color: 'white', borderRadius: '50%' }
                        }}
                      />
                    </div>

                    {/* Events for Selected Date */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-4" style={{ color: '#3448C5' }}>
                        Events on {format(selectedDate, 'MMMM d, yyyy')}
                      </h3>
                      <div className="space-y-4 max-h-80 overflow-y-auto">
                        {getEventsForDate(selectedDate).length > 0 ? (
                          getEventsForDate(selectedDate).map((event) => (
                            <div 
                              key={event.id} 
                              className="p-4 rounded-xl border-l-4"
                              style={{ borderColor: cat.color, backgroundColor: '#f9fafb' }}
                            >
                              <h4 className="font-bold text-gray-900">{event.title}</h4>
                              {event.time && <p className="text-sm text-gray-600">{event.time}</p>}
                              {event.location && <p className="text-sm text-gray-600">{event.location}</p>}
                              {event.description && <p className="text-gray-700 mt-2">{event.description}</p>}
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 italic">No events scheduled for this date.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Add Event Button */}
                  <div className="mt-8 flex justify-center">
                    {isAuthenticated ? (
                      <Dialog open={addEventOpen} onOpenChange={setAddEventOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            className="rounded-full px-8 py-6 text-lg font-semibold"
                            style={{ backgroundColor: cat.color }}
                          >
                            <Plus className="w-5 h-5 mr-2" />
                            Add Event
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Add New Event</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div>
                              <label className="text-sm font-medium">Event Title *</label>
                              <Input
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                                placeholder="Enter event title"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Date: {format(selectedDate, 'MMMM d, yyyy')}</label>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Time</label>
                              <Input
                                value={newEvent.time}
                                onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                                placeholder="e.g. 10:00 AM - 12:00 PM"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Location / Link</label>
                              <Input
                                value={newEvent.location}
                                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                                placeholder="Enter location or meeting link"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Description</label>
                              <Textarea
                                value={newEvent.description}
                                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                                placeholder="Event details..."
                              />
                            </div>
                            <Button 
                              onClick={handleAddEvent}
                              className="w-full"
                              style={{ backgroundColor: cat.color }}
                              disabled={createEventMutation.isPending}
                            >
                              {createEventMutation.isPending ? 'Adding...' : 'Add Event'}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            className="rounded-full px-8 py-6 text-lg font-semibold"
                            style={{ backgroundColor: cat.color }}
                          >
                            <Lock className="w-5 h-5 mr-2" />
                            Add Event
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Admin Login</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div>
                              <label className="text-sm font-medium">Email</label>
                              <Input
                                type="email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                placeholder="Enter admin email"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Password</label>
                              <Input
                                type="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                placeholder="Enter password"
                              />
                            </div>
                            {loginError && (
                              <p className="text-red-500 text-sm">{loginError}</p>
                            )}
                            <Button 
                              onClick={handleLogin}
                              className="w-full"
                              style={{ backgroundColor: '#3448C5' }}
                            >
                              Login
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}