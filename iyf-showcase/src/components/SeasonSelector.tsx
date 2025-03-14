// components/SeasonSelector.tsx
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
      <div className={`inline-block ${className}`}>
        <div className="h-10 w-32 bg-white/20 animate-pulse rounded-full"></div>
      </div>
    );
  }

  if (!currentSeason || seasons.length === 0) {
    return null;
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <select
        value={currentSeason.id}
        onChange={handleChange}
        className="appearance-none rounded-full bg-white/20 border border-white/30 px-6 py-2 pr-10 text-sm font-medium text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 hover:bg-white/30 transition-colors"
      >
        {seasons.map((season) => (
          <option key={season.id} value={season.id} className="text-gray-900 bg-white">
            {season.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <ChevronDown className="h-4 w-4 text-white" />
      </div>
    </div>
  );
};

export default SeasonSelector;