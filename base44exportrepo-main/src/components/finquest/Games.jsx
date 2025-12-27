import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function Games() {
  const games = [
    {
      emoji: '⚽',
      image: 'https://github.com/benhpritchard/gamethumbnails/blob/main/Gemini_Generated_Image_b5rg38b5rg38b5rg.png?raw=true',
      title: 'Moneyball FC',
      description: 'You think owning a football club is just about scoring goals? Think again. Build a squad and staff roster whilst sticking to a budget and balancing pros and cons. Choose vendors, sponsors and ticket prices to maximise profits. Deal with ever changing squad dynamics to build team morale. Will your team top the financial table?',
      gradient: 'from-green-400 to-blue-500'
    },
    {
      emoji: '🍕',
      image: 'https://github.com/benhpritchard/gamethumbnails/blob/main/Gemini_Generated_Image_ns6ytcns6ytcns6y.png?raw=true',
      title: 'Pizzeria Tycoon',
      description: 'Embrace tasty challenges as you run multiple Pizzerias throughout your journey. Every lesson is about making wise decisions to make the most dough (I know) as possible. Can you create a new trending pizza flavour that customers keep coming back for?',
      gradient: 'from-red-400 to-orange-500'
    },
    {
      emoji: '☕',
      image: 'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_4cqbfh4cqbfh4cqb.png?raw=true',
      title: 'Coffee Shop Challenge',
      description: 'Uncle Ahmed hands you the keys to his coffee shop - under one condition. You learn all about what teenagers spend their money on in order to understand your target market. Can you make Uncle Ahmed proud and run a successful coffee shop?',
      gradient: 'from-amber-400 to-yellow-500'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white" id="games">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#3448C5' }}>
            A Growing Library of Financial Games
          </h2>
        </div>

        {/* Game Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {games.map((game, index) => (
            <Card 
              key={index}
              className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden group h-full flex flex-col"
              style={{ backgroundColor: '#FAF7F0' }}
            >
              <div className="h-48 w-full overflow-hidden relative flex-shrink-0">
                <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-20`}></div>
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-8 flex-grow">
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ color: '#3448C5' }}
                >
                  {game.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {game.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}