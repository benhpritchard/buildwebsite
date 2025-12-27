import React from 'react';
import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "FinnQuest transformed how my students engage with money topics. They actually look forward to financial literacy lessons now!",
      name: "Sarah Mitchell",
      school: "Riverside Academy"
    },
    {
      quote: "The game-based approach makes complex concepts accessible. My Year 9 class went from disengaged to asking for extra time to play.",
      name: "James Thompson",
      school: "Oakwood Secondary"
    },
    {
      quote: "As a CPD lead, I love how FinnQuest supports teachers with ready-made resources that actually work in real classrooms.",
      name: "Priya Sharma",
      school: "Greenfield High School"
    }
  ];

  return (
    <section 
      className="py-20 md:py-28" 
      style={{ backgroundColor: '#FAF7F0' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#3448C5' }}>
            What Educators Say
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white relative"
            >
              <CardContent className="p-8">
                <div 
                  className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: '#35D0BA' }}
                >
                  <Quote className="w-6 h-6 text-white" />
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-6 mt-4">
                  "{testimonial.quote}"
                </p>
                
                <div className="border-t pt-4" style={{ borderColor: '#35D0BA' }}>
                  <p 
                    className="font-bold text-lg"
                    style={{ color: '#3448C5' }}
                  >
                    {testimonial.name}
                  </p>
                  <p className="text-gray-600 mt-1">
                    {testimonial.school}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}