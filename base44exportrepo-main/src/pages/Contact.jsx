import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Mail, Phone, Instagram, Linkedin, Send } from 'lucide-react';
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
        to: 'finnquest1@gmail.com',
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
            We'd love to hear from you. Send us a message for more information and pricing!
          </p>
          <p className="text-lg text-gray-700 mt-4">
            Click{' '}
            <Dialog>
              <DialogTrigger asChild>
                <button className="font-bold underline hover:text-[#3448C5] transition-colors cursor-pointer">
                  here
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold text-center mb-6" style={{ color: '#3448C5' }}>
                    FinnQuest Pricing
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div className="text-gray-700 space-y-4">
                    <p className="text-lg leading-relaxed">
                      FinnQuest is a yearly subscription that unlocks everything you need for a full academic year delivering outstanding Financial Literacy topics rich with entrepreneurial skills.
                    </p>
                    <p className="text-lg leading-relaxed">
                      A years subscription gives you access to: games, lesson packs, displays, free play games and unplugged activities. As we are running alongside a curriculum, all curriculum packs are included.
                    </p>
                    <p className="text-lg font-bold leading-relaxed" style={{ color: '#3448C5' }}>
                      FinnQuest has EVERYTHING you need right at your fingertips.
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2" style={{ borderColor: '#3448C5' }}>
                          <th className="p-4 text-left font-bold" style={{ color: '#3448C5' }}>Tier</th>
                          <th className="p-4 text-left font-bold" style={{ color: '#3448C5' }}>Student Range</th>
                          <th className="p-4 text-left font-bold" style={{ color: '#3448C5' }}>Credits</th>
                          <th className="p-4 text-left font-bold" style={{ color: '#3448C5' }}>Teacher Accounts</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-4 font-semibold">Tier 1</td>
                          <td className="p-4">Less than 500 students</td>
                          <td className="p-4">500 credits</td>
                          <td className="p-4">Up to 25</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-4 font-semibold">Tier 2</td>
                          <td className="p-4">500 - 1500 students</td>
                          <td className="p-4">1500 credits</td>
                          <td className="p-4">Up to 50</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-4 font-semibold">Tier 3</td>
                          <td className="p-4">1500+ students</td>
                          <td className="p-4">Negotiable</td>
                          <td className="p-4">Negotiable</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 p-6 rounded-xl" style={{ backgroundColor: '#FAF7F0' }}>
                    <p className="text-gray-700 leading-relaxed">
                      FinnQuest is not just for schools. We offer tailored packs to small and large companies who may wish to use our product. Drop FinnQuest a message to discuss your needs.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            {' '}for more information on our pricing
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
                          href="mailto:finnquest1@gmail.com"
                          className="text-lg font-semibold hover:text-[#3448C5] transition-colors break-all"
                        >
                          finnquest1@gmail.com
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
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
                      style={{ backgroundColor: '#0077B5' }}
                    >
                      <Linkedin className="w-8 h-8 text-white" />
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