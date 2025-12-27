import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Footer() {
  const links = [
    { name: 'Home', page: 'Home' },
    { name: 'About', page: 'About' },
    { name: 'Games', page: 'ExploreGames' },
    { name: 'CPD', page: 'CPD' },
    { name: 'Contact', page: 'Contact' }
  ];

  return (
    <footer 
      className="py-12"
      style={{ backgroundColor: '#1a2744' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Links */}
        <nav className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-8">
          {links.map((link, index) => (
            <React.Fragment key={link.name}>
              {link.page ? (
                <Link
                  to={createPageUrl(link.page)}
                  className="text-white hover:text-[#35D0BA] transition-colors duration-200 text-sm md:text-base font-medium"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  href={link.hash}
                  className="text-white hover:text-[#35D0BA] transition-colors duration-200 text-sm md:text-base font-medium"
                >
                  {link.name}
                </a>
              )}
              {index < links.length - 1 && (
                <span className="text-white/30">•</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Tagline */}
        <div className="text-center">
          <p className="text-white/80 text-lg md:text-xl font-medium">
            Practical. Engaging. Built for Classrooms.
          </p>
          <p className="text-white/50 text-sm mt-4">
            © 2024 FinnQuest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}