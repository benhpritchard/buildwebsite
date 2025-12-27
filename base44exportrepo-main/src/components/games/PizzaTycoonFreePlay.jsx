import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ImageWithLoader from '@/components/ui/ImageWithLoader';

export default function PizzaTycoonFreePlay({ onBack }) {
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: 1,
      title: 'Dough Dash',
      thumbnail: 'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_u3022wu3022wu302.png?raw=true',
      link: 'https://pizzatycoon.base44.app',
      description: 'Welcome to Dough Dash. Can you build your very own pizzeria to make as much money as possible? For this game you need to think about what a pizzeria needs and what you can add to make more customers visit you. Look out for upgrades and customer reviews to support you but ALWAYS think about how much dough (money) you have,'
    },
    {
      id: 2,
      title: 'Pizza Profit Master',
      thumbnail: 'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_u3022wu3022wu302.png?raw=true',
      link: 'https://pizzaprofits.base44.app',
      description: 'You see a job offer to help a struggling pizzeria turn a profit and think - this is the job for me! In this game, you will design special pizza flavours and find out which one makes the most profit. Each round, you need to make decisions with one aim in place - can I make this pizzeria as much profit as possible?'
    },
    {
      id: 3,
      title: 'Topping Trends',
      thumbnail: 'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_u3022wu3022wu302.png?raw=true',
      link: 'https://toppingstrends.base44.app',
      description: 'Welcome to Topping Trends! Owning a pizzeria is hard, especially judging what customers actually want to eat. In this game, you will have to read the market correctly. What are people saying on their social media? What were the sales last month? Use all this information to win the Pizza Festival at the end of the game!'
    },
    {
      id: 4,
      title: 'Michelin Manager',
      thumbnail: 'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_u3022wu3022wu302.png?raw=true',
      link: 'https://michelinstar.base44.app',
      description: 'You\'ve done it - you have won a Michelin Star for your contributions to the pizza world. Now you need to showcase your skills as a manager of a successful pizzeria. Here, you need to make smart decisions on fixed and variable costs whilst also keeping your staff and customers happy. It\'s tough at the top!'
    }
  ];

  if (selectedGame) {
    return (
      <div>
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => setSelectedGame(null)}
            className="flex items-center gap-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left side - Game thumbnail and play button */}
          <div className="space-y-6">
            <Card className="rounded-3xl shadow-xl overflow-hidden border-0">
              <div className="aspect-video w-full overflow-hidden">
                <ImageWithLoader 
                  src={selectedGame.thumbnail} 
                  alt={selectedGame.title}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
              </div>
            </Card>
            
            <Button
              className="w-full py-8 text-2xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: '#35D0BA', color: 'white' }}
              onClick={() => window.open(selectedGame.link, '_blank')}
            >
              Play Game
            </Button>
          </div>

          {/* Right side - Description */}
          <Card className="rounded-3xl shadow-xl border-0 p-8">
            <CardContent className="p-0">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#3448C5' }}>
                {selectedGame.title}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {selectedGame.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Free Play
        </Button>
      </div>

      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3448C5' }}>
          Pizza Tycoon Games
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700">
          Choose a game to play
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => (
          <Card
            key={game.id}
            className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer"
            onClick={() => game.link && setSelectedGame(game)}
          >
            <div className="aspect-video w-full overflow-hidden bg-gray-100">
              {game.thumbnail ? (
                <ImageWithLoader 
                  src={game.thumbnail} 
                  alt={game.title}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl">🍕</span>
                </div>
              )}
            </div>
            <CardContent className="p-6 bg-white">
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#3448C5' }}>
                {game.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {game.link ? 'Click to learn more' : 'Coming soon...'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}