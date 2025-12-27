import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ImageWithLoader from '@/components/ui/ImageWithLoader';

export default function MoneyballFreePlay({ onBack }) {
  const game = {
    id: 1,
    title: 'Moneyball FC',
    thumbnail: 'https://github.com/benhpritchard/buildwebsite/blob/main/moneyballfc.png?raw=true',
    link: 'https://moneyball.base44.app/home',
    description: 'Growing up many people dream of playing for a football team. Now is your chance to give people the opportunity to do just that - as the owner of your own club!\n\nBegin by building your squad and staff whilst sticking to a budget. Navigate through pre-season and issues in the team in a stadium you designed!\n\nCan you pick the correct sponsor to match the kit and badge of your club? These are decisions that lie in your hands as you try to win the league and ultimately - make the most money!!'
  };

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
          Moneyball FC
        </h1>
      </div>

      {/* Main Game Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
        {/* Left side - Game thumbnail and play button */}
        <div className="space-y-6">
          <Card className="rounded-3xl shadow-xl overflow-hidden border-0">
            <div className="aspect-video w-full overflow-hidden">
              <ImageWithLoader 
                src={game.thumbnail} 
                alt={game.title}
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
            </div>
          </Card>
          
          <Button
            className="w-full py-8 text-2xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundColor: '#35D0BA', color: 'white' }}
            onClick={() => window.open(game.link, '_blank')}
          >
            Play Game
          </Button>
        </div>

        {/* Right side - Description */}
        <Card className="rounded-3xl shadow-xl border-0 p-8">
          <CardContent className="p-0">
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#3448C5' }}>
              {game.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {game.description}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Instructions Section */}
      <div className="max-w-6xl mx-auto space-y-12">
        {/* First instruction - League Setup */}
        <Card className="rounded-3xl shadow-xl border-0 p-8">
          <CardContent className="p-0">
            <div className="mb-6">
              <ImageWithLoader 
                src="https://github.com/benhpritchard/buildwebsite/blob/main/Screenshot%202025-12-22%208.37.14%20PM.png?raw=true"
                alt="League Setup"
                className="w-full rounded-2xl"
                containerClassName="w-full"
              />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              To play the game first set up your league on the homepage. Remember write ✏️ down your league code - you need this! Moneyball FC is split into 6 activities lasting about 1 hour each. You navigate the activities on the dashboard. You will need to write ✏️ down your team pin too.
            </p>
          </CardContent>
        </Card>

        {/* Second instruction - Two images side by side */}
        <Card className="rounded-3xl shadow-xl border-0 p-8">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ImageWithLoader 
                src="https://github.com/benhpritchard/buildwebsite/blob/main/Screenshot%202025-12-22%208.34.52%20PM.png?raw=true"
                alt="Activity Guide 1"
                className="w-full rounded-2xl"
                containerClassName="w-full"
              />
              <ImageWithLoader 
                src="https://github.com/benhpritchard/buildwebsite/blob/main/Screenshot%202025-12-22%208.35.11%20PM.png?raw=true"
                alt="Activity Guide 2"
                className="w-full rounded-2xl"
                containerClassName="w-full"
              />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Each activity comes with an important guide. It will tell you how to play and what you will learn. This is VITAL that you read this!
            </p>
          </CardContent>
        </Card>

        {/* Third instruction - Tasks */}
        <Card className="rounded-3xl shadow-xl border-0 p-8">
          <CardContent className="p-0">
            <div className="mb-6">
              <ImageWithLoader 
                src="https://github.com/benhpritchard/buildwebsite/blob/main/Screenshot%202025-12-22%208.35.34%20PM.png?raw=true"
                alt="Tasks and Competition"
                className="w-full rounded-2xl"
                containerClassName="w-full"
              />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Moneyball FC has clear tasks designed to engage you and immerse you in the world of football. We suggest you get a group of friends together and compete in the same league - who can run a club the best? There is only one way to find out!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}