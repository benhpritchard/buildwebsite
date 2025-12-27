import React from 'react';
import Header from '../components/finquest/Header';
import Hero from '../components/finquest/Hero';
import About from '../components/finquest/About';
// TargetAudience removed as requested
import Impact from '../components/finquest/Impact';
import VideoGameSection from '../components/finquest/VideoGameSection';
import Games from '../components/finquest/Games';
import Testimonials from '../components/finquest/Testimonials';
import CTA from '../components/finquest/CTA';
import Footer from '../components/finquest/Footer';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F0' }}>
      <Header />
      <Hero />
      <About />
      <VideoGameSection />
      <Impact />
      <Games />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}