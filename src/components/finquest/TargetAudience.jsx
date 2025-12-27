import React from 'react';
import { School, UserCheck, GraduationCap, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function TargetAudience() {
  const audiences = [
    {
      icon: School,
      title: 'Schools',
      description: 'CPD, competitions, innovation projects'
    },
    {
      icon: UserCheck,
      title: 'Teachers',
      description: 'Lesson packs & worksheets'
    },
    {
      icon: GraduationCap,
      title: 'Tutors',
      description: 'Small-group resources'
    },
    {
      icon: Users,
      title: 'Parents & Students',
      description: 'Home-learning support'
    }
  ];

  return (
    <section 
      className="py-20 md:py-28" 
      style={{ backgroundColor: '#FAF7F0' }}
      id="schools"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#3448C5' }}>
            Who We're For
          </h2>
        </div>

        {/* Audience Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {audiences.map((audience, index) => (
            <Card 
              key={index}
              className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 bg-white"
            >
              <CardContent className="p-8 text-center">
                <div 
                  className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-md"
                  style={{ backgroundColor: '#FFB68B' }}
                >
                  <audience.icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
                <h3 
                  className="text-2xl font-bold mb-3"
                  style={{ color: '#3448C5' }}
                >
                  {audience.title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {audience.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}