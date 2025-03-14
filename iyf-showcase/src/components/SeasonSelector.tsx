'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useSeasons } from '@/lib/contexts/SeasonContext';
import { Season } from '@/lib/db/models';

interface SeasonSelectorProps {
  className?: string;
}

const SeasonSelector: React.FC<SeasonSelectorProps> = ({ className = '' }) => {
  const { seasons, currentSeason, setCurrentSeason, isLoading } = useSeasons();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSeasonId = parseInt(e.target.value);
    const selectedSeason = seasons.find(season => season.id === selectedSeasonId);
    if (selectedSeason) {
      setCurrentSeason(selectedSeason);
    }
  };

  if (isLoading) {
    return (
      <div className={`inline-flex items-center space-x-2 ${className}`}>
        <div className="h-5 w-20 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  if (!currentSeason || seasons.length === 0) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      <select
        value={currentSeason.id}
        onChange={handleChange}
        className="appearance-none bg-green-500/10 rounded-full px-4 py-1.5 pr-8 text-sm font-semibold text-green-800 ring-1 ring-inset ring-green-600/20 focus:outline-none focus:ring-2 focus:ring-green-600"
      >
        {seasons.map((season) => (
          <option key={season.id} value={season.id}>
            {season.name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-800 pointer-events-none" />
    </div>
  );
};

export default SeasonSelector;