import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ImageWithLoader from '@/components/ui/ImageWithLoader';

export default function IceCreamFreePlay({ onBack }) {
  const game = {
    id: 1,
    title: 'Ice Cream Truck',
    thumbnail: 'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_riorusriorusrior.png?raw=true',
    link: 'https://icecreamtruck.base44.app',
    description: 'With the sun shining it makes sense to open your own Ice Cream Truck! Can you pick the perfect flavours to sell to make the most money possible? Look out for our fun upgrades to make as much money as possible!'
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
          Ice Cream Truck
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
            <p className="text-lg text-gray-700 leading-relaxed">
              {game.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}