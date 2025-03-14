'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import SeasonSelector from './SeasonSelector';
import { useSeasons } from '@/lib/contexts/SeasonContext';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSeasonDropdownOpen, setIsSeasonDropdownOpen] = useState(false);
  const { 
    isLoading, 
    seasons, 
    currentSeason, 
    setCurrentSeason 
  } = useSeasons();

  const handleSeasonChange = (event: React.MouseEvent, seasonId: number) => {
    const selectedSeason = seasons.find(season => season.id === seasonId);
    
    if (selectedSeason) {
      setCurrentSeason(selectedSeason);
      setIsSeasonDropdownOpen(false);
    }
  };

  return (
    <header className="fixed w-full bg-white z-50">
      <div className="mx-auto border-b border-gray-200">
        <div className="mx-auto max-w-7xl">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="IYF Academy Logo"
                  width={145}
                  height={50}
                  className="object-contain"
                />
              </Link>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
              <nav className="flex items-center space-x-8">
                <Link href="/" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                  Home
                </Link>
                <Link href="/campaigns" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                  Campaigns
                </Link>
                <Link href="/students" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                  Students
                </Link>
                <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                  About
                </Link>
                
              </nav>
            </div>

            {/* Season Selector and Join Us Button - Desktop Only */}
            <div className="hidden md:flex items-center space-x-4">
              {!isLoading && (
                <div className="relative">
                  <button 
                    onClick={() => setIsSeasonDropdownOpen(!isSeasonDropdownOpen)}
                    className="flex items-center rounded-full border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                  >
                    Season {currentSeason?.name.replace('Season ', '') || '7'}
                    <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                  </button>
                  {isSeasonDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div 
                        className="py-1" 
                        role="menu" 
                        aria-orientation="vertical" 
                        aria-labelledby="season-menu"
                      >
                        {seasons.map((season) => (
                          <button
                            key={season.id}
                            onClick={(e) => handleSeasonChange(e, season.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                            role="menuitem"
                          >
                            {season.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <a
                href="https://freeacademy.iyfkenya.org/register"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:from-purple-700 hover:to-indigo-700 transition-all shadow-sm"
              >
                Apply Now
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 bg-white md:hidden">
            <nav className="flex flex-col space-y-1 px-4 py-2">
              {!isLoading && <div className="px-3 py-2"><SeasonSelector /></div>}
              <Link 
                href="/" 
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/campaigns" 
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Campaigns
              </Link>
              <Link 
                href="/students" 
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Students
              </Link>
              <Link 
                href="/about" 
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <a
                href="https://freeacademy.iyfkenya.org/register"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-full text-center shadow-sm"
              >
                Apply Now
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;