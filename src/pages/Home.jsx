import React from 'react';
import Header from '../components/finquest/Header';
import Hero from '../components/finquest/Hero';
import About from '../components/finquest/About';
import TargetAudience from '../components/finquest/TargetAudience';
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
      <TargetAudience />
      <Games />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}