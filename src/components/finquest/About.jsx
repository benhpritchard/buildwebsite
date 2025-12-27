import React from 'react';
import { Target, Gamepad2, Lightbulb, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  const features = [
    {
      icon: Target,
      title: 'Curriculum-Aligned',
      description: 'Every game and lesson connects directly to national education standards'
    },
    {
      icon: Gamepad2,
      title: 'Game-Based',
      description: 'Turn complex financial concepts into interactive, engaging experiences'
    },
    {
      icon: Lightbulb,
      title: 'Teacher-Led',
      description: 'Designed by educators who understand classroom dynamics and needs'
    },
    {
      icon: Globe,
      title: 'Real-World Skills',
      description: 'Prepare students for actual financial decisions they\'ll face in life'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3448C5' }}>
            Why FinnQuest Exists
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            FinnQuest turns money lessons into game-based adventures. Built by educators, for educators — 
            every experience connects financial literacy, entrepreneurship, and real-world decision-making.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
              style={{ backgroundColor: '#FAF7F0' }}
            >
              <CardContent className="p-8 text-center">
                <div 
                  className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center shadow-md"
                  style={{ backgroundColor: '#35D0BA' }}
                >
                  <feature.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <h3 
                  className="text-xl font-bold mb-3"
                  style={{ color: '#3448C5' }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}