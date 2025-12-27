import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function Games() {
  const games = [
    {
      emoji: '⚽',
      image: 'https://github.com/benhpritchard/gamethumbnails/blob/main/Gemini_Generated_Image_b5rg38b5rg38b5rg.png?raw=true',
      title: 'Moneyball FC',
      description: 'Football finance simulator where students manage budgets, transfers, and team economics',
      gradient: 'from-green-400 to-blue-500'
    },
    {
      emoji: '🍕',
      image: 'https://github.com/benhpritchard/gamethumbnails/blob/main/Gemini_Generated_Image_ns6ytcns6ytcns6y.png?raw=true',
      title: 'Pizzeria Tycoon',
      description: 'Price & profit decision-making through running a virtual pizza restaurant business',
      gradient: 'from-red-400 to-orange-500'
    },
    {
      emoji: '☕',
      image: 'https://github.com/benhpritchard/gamethumbnails/blob/main/Gemini_Generated_Image_2rxm7j2rxm7j2rxm.png?raw=true',
      title: 'Coffee Shop Challenge',
      description: 'Entrepreneurship & creativity combined as students build their own coffee shop empire',
      gradient: 'from-amber-400 to-yellow-500'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white" id="games">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#3448C5' }}>
            A Wide Variety of Games
          </h2>
        </div>

        {/* Game Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {games.map((game, index) => (
            <Card 
              key={index}
              className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden group"
            >
              <div className="h-48 w-full overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-20`}></div>
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-8" style={{ backgroundColor: '#FAF7F0' }}>
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