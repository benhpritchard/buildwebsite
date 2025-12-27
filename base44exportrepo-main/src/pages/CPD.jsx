import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import Header from '../components/finquest/Header';
import Footer from '../components/finquest/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, Loader2, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function CPD() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('how-to');
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    long_description: '',
    category: 'online',
    location: ''
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  
  // Booking Form State
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    school: '',
    notes: ''
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    const checkAdmin = () => {
      const storedTeacher = localStorage.getItem('finnquest_teacher') || localStorage.getItem('finquest_teacher');
      if (storedTeacher) {
        const teacher = JSON.parse(storedTeacher);
        if (teacher.role === 'main_admin') {
          setIsAdmin(true);
        }
      }
    };
    checkAdmin();
  }, []);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['cpd-events'],
    queryFn: async () => {
      try {
        const result = await base44.entities.CPDEvent.list();
        return result || [];
      } catch (error) {
        console.error("Error fetching CPD events:", error);
        return [];
      }
    }
  });

  const createEventMutation = useMutation({
    mutationFn: (eventData) => base44.entities.CPDEvent.create(eventData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cpd-events'] });
      setDialogOpen(false);
      setNewEvent({
        title: '',
        date: '',
        time: '',
        description: '',
        long_description: '',
        category: 'online',
        location: ''
      });
      toast.success('Event created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create event: ' + error.message);
    }
  });

  const bookingMutation = useMutation({
    mutationFn: async (data) => {
      const response = await base44.functions.invoke('sendBookingEmail', {
        eventTitle: selectedEvent.title,
        eventDate: selectedEvent.date,
        ...data
      });
      if (response.data.error) throw new Error(response.data.error);
      return response.data;
    },
    onSuccess: () => {
      setBookingOpen(false);
      setBookingData({ name: '', email: '', school: '', notes: '' });
      toast.success('Booking enquiry sent! We will contact you shortly.');
    },
    onError: (error) => {
      toast.error('Failed to send booking enquiry: ' + error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createEventMutation.mutate(newEvent);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    bookingMutation.mutate(bookingData);
  };

  const openBookingDialog = (event) => {
    setSelectedEvent(event);
    setBookingOpen(true);
  };

  const openEventDetails = (event) => {
    setSelectedEvent(event);
  };

  const filteredEvents = events.filter(event => event.category === selectedCategory);
  
  // Use real events if available, otherwise show empty state (no fake events anymore as user asked for real demo ones which I created)
  const displayEvents = filteredEvents;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#3448C5' }}>
            Professional Development
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enhance your teaching skills with our specialized financial literacy training sessions.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <Button
            variant={selectedCategory === 'how-to' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('how-to')}
            className={`rounded-full px-8 ${selectedCategory === 'how-to' ? 'bg-[#35D0BA] hover:bg-[#2bb8a4] text-white' : ''}`}
          >
            How to use FinnQuest
          </Button>
          <Button
            variant={selectedCategory === 'online' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('online')}
            className={`rounded-full px-8 ${selectedCategory === 'online' ? 'bg-[#35D0BA] hover:bg-[#2bb8a4] text-white' : ''}`}
          >
            Online
          </Button>
          <Button
            variant={selectedCategory === 'in-school' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('in-school')}
            className={`rounded-full px-8 ${selectedCategory === 'in-school' ? 'bg-[#35D0BA] hover:bg-[#2bb8a4] text-white' : ''}`}
          >
            In School
          </Button>
          <Button
            variant={selectedCategory === 'face-to-face' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('face-to-face')}
            className={`rounded-full px-8 ${selectedCategory === 'face-to-face' ? 'bg-[#35D0BA] hover:bg-[#2bb8a4] text-white' : ''}`}
          >
            Events
          </Button>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          {selectedCategory === 'how-to' ? (
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-[#3448C5]">How to use FinnQuest</h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                This video will show you how to use FinnQuest as a teacher and student. It guides you through setting up classes, unlocking lessons, and tracking student progress.
              </p>
              
              {/* Video */}
              <div className="w-full mx-auto max-w-3xl mb-6">
                <div style={{padding:'56.22% 0 0 0', position:'relative'}}>
                  <iframe 
                    src="https://player.vimeo.com/video/1148972961?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} 
                    title="How to use FinnQuest"
                  />
                </div>
                <script src="https://player.vimeo.com/api/player.js"></script>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                If you want a demo Class to try out features for yourself, drop us a message in the contact area and we can give you a 48 hour trial!
              </p>
            </div>
          ) : selectedCategory === 'online' ? (
            <div className="bg-white rounded-3xl shadow-lg p-12 text-center max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-12 h-12 text-[#3448C5]" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-[#3448C5]">Coming Soon!</h3>
              <p className="text-xl text-gray-600">
                Online CPD courses will be available soon. Watch this space!
              </p>
            </div>
          ) : selectedCategory === 'in-school' || selectedCategory === 'face-to-face' ? (
            <div className="bg-white rounded-3xl shadow-lg p-12 text-center max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-12 h-12 text-[#3448C5]" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-[#3448C5]">Coming Soon!</h3>
              <p className="text-xl text-gray-600">
                FinnQuest will soon be offering training - watch this space!
              </p>
            </div>
          ) : (
            // Fallback for events list if we ever go back to it or other categories
            isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayEvents.length > 0 ? (
                  displayEvents.map((event) => (
                <Dialog key={event.id}>
                    <DialogTrigger asChild>
                        <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer" onClick={() => openEventDetails(event)}>
                          <CardContent className="p-6">
                            <div className="mb-4">
                              <span className="inline-block px-3 py-1 bg-blue-100 text-[#3448C5] rounded-full text-sm font-medium capitalize">
                                {event.category.replace('-', ' ')}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">{event.title}</h3>
                            <div className="space-y-2 text-gray-600 mb-4">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                <span>{format(new Date(event.date), 'MMMM do, yyyy')}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{event.time}</span>
                              </div>
                              {event.location && (
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  <span>{event.location}</span>
                                </div>
                              )}
                            </div>
                            <p className="text-gray-600 line-clamp-3">{event.description}</p>
                            <Button className="w-full mt-6 bg-[#3448C5] hover:bg-[#2a3a9f]">
                                View Details & Book
                            </Button>
                          </CardContent>
                        </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-[#3448C5]">{event.title}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 space-y-6">
                            <div className="flex flex-wrap gap-6 text-gray-700">
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="w-5 h-5 text-[#35D0BA]" />
                                    <span className="font-medium">{format(new Date(event.date), 'MMMM do, yyyy')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-[#35D0BA]" />
                                    <span className="font-medium">{event.time}</span>
                                </div>
                                {event.location && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-[#35D0BA]" />
                                        <span className="font-medium">{event.location}</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                <h4 className="font-semibold text-lg mb-2 text-[#3448C5]">About this Session</h4>
                                <p className="text-gray-700 whitespace-pre-line">{event.long_description || event.description}</p>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button 
                                    size="lg"
                                    className="bg-[#3448C5] hover:bg-[#2a3a9f] w-full sm:w-auto"
                                    onClick={() => openBookingDialog(event)}
                                >
                                    {event.category === 'online' && 'Book Online Course'}
                                    {event.category === 'in-school' && 'Book In School CPD'}
                                    {event.category === 'face-to-face' && 'Book Event to your School'}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
              ))
              ) : (
              <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm">
                <p className="text-gray-500 text-lg">No events scheduled in this category yet.</p>
                <p className="text-gray-400 mt-2">Check back soon for updates!</p>
              </div>
              )}
              </div>
              )
              )}
              </div>

        {/* Booking Dialog */}
        <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Book Event</DialogTitle>
            </DialogHeader>
            {selectedEvent && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                    <p><strong>Event:</strong> {selectedEvent.title}</p>
                    <p><strong>Date:</strong> {format(new Date(selectedEvent.date), 'PPP')}</p>
                </div>
            )}
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                  required
                  placeholder="you@school.edu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="school">School Name</Label>
                <Input
                  id="school"
                  value={bookingData.school}
                  onChange={(e) => setBookingData({ ...bookingData, school: e.target.value })}
                  required
                  placeholder="School name"
                />
              </div>
               <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  placeholder="Any specific requirements or questions..."
                />
              </div>
              <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setBookingOpen(false)}>Cancel</Button>
                  <Button type="submit" className="bg-[#3448C5] hover:bg-[#2a3a9f]" disabled={bookingMutation.isPending}>
                    {bookingMutation.isPending ? 'Sending...' : 'Send Enquiry'}
                  </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Admin Controls</h2>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#3448C5] hover:bg-[#2a3a9f]">
                    <Plus className="w-4 h-4 mr-2" /> Add New Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg overflow-y-auto max-h-[90vh]">
                  <DialogHeader>
                    <DialogTitle>Add New CPD Event</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title</Label>
                      <Input
                        id="title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          value={newEvent.time}
                          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                          placeholder="e.g. 14:00 - 16:00"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newEvent.category}
                        onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">Online</SelectItem>
                          <SelectItem value="in-school">In School</SelectItem>
                          <SelectItem value="face-to-face">Face to Face (Events)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location/Link</Label>
                      <Input
                        id="location"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                        placeholder="Zoom link or Physical address"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Short Description (Card view)</Label>
                      <Textarea
                        id="description"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        required
                        className="h-20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="long_description">Detailed Description (Popup view)</Label>
                      <Textarea
                        id="long_description"
                        value={newEvent.long_description}
                        onChange={(e) => setNewEvent({ ...newEvent, long_description: e.target.value })}
                        placeholder="Full details about the event curriculum, speakers, etc."
                        className="h-32"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-[#3448C5] hover:bg-[#2a3a9f]" disabled={createEventMutation.isPending}>
                      {createEventMutation.isPending ? 'Creating...' : 'Create Event'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}