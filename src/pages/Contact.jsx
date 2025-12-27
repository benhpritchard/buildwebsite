import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Mail, Phone, Instagram, Facebook, Send } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import Header from '../components/finquest/Header';
import Footer from '../components/finquest/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await base44.integrations.Core.SendEmail({
        to: 'benhpritchard2024@gmail.com',
        subject: `FinnQuest Contact Form: ${formData.purpose}`,
        body: `
Name: ${formData.name}
Email: ${formData.email}
Purpose: ${formData.purpose}

Message:
${formData.message}
        `
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', purpose: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F0' }}>
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3448C5' }}>
              Get In Touch
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700">
              We'd love to hear from you. Send us a message!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <Card className="rounded-3xl shadow-xl border-0">
              <CardHeader className="p-8">
                <CardTitle className="text-3xl font-bold" style={{ color: '#3448C5' }}>
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <Select
                      value={formData.purpose}
                      onValueChange={(value) => setFormData({ ...formData, purpose: value })}
                      required
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Schools">Schools</SelectItem>
                        <SelectItem value="Home">Home</SelectItem>
                        <SelectItem value="Tutoring Company">Tutoring Company</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="rounded-xl"
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="p-4 rounded-xl bg-green-100 text-green-800">
                      Message sent successfully! We'll get back to you soon.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 rounded-xl bg-red-100 text-red-800">
                      Failed to send message. Please try again.
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    style={{ backgroundColor: '#FFB68B', color: '#1a1a1a' }}
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="rounded-3xl shadow-xl border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6" style={{ color: '#3448C5' }}>
                    Contact Details
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-xl font-bold mb-2" style={{ color: '#3448C5' }}>
                        Ben Pritchard
                      </p>
                      <p className="text-gray-600 mb-4">Founder</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#35D0BA' }}
                      >
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <a 
                          href="tel:+971585327459"
                          className="text-lg font-semibold hover:text-[#3448C5] transition-colors"
                        >
                          +971 58 532 7459
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#35D0BA' }}
                      >
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <a 
                          href="mailto:benhpritchard2024@gmail.com"
                          className="text-lg font-semibold hover:text-[#3448C5] transition-colors break-all"
                        >
                          benhpritchard2024@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-xl border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6" style={{ color: '#3448C5' }}>
                    Follow Us
                  </h3>
                  
                  <div className="flex gap-6">
                    <a 
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
                      style={{ backgroundColor: '#FFB68B' }}
                    >
                      <Instagram className="w-8 h-8 text-white" />
                    </a>
                    <a 
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
                      style={{ backgroundColor: '#3448C5' }}
                    >
                      <Facebook className="w-8 h-8 text-white" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}