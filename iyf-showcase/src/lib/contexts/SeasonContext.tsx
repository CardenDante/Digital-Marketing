'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Season } from '@/lib/db/models';

interface SeasonContextType {
  seasons: Season[];
  currentSeason: Season | null;
  setCurrentSeason: (season: Season) => void;
  isLoading: boolean;
  error: string | null;
}

const SeasonContext = createContext<SeasonContextType>({
  seasons: [],
  currentSeason: null,
  setCurrentSeason: () => {},
  isLoading: true,
  error: null
});

export const useSeasons = () => useContext(SeasonContext);

interface SeasonProviderProps {
  children: ReactNode;
}

export const SeasonProvider: React.FC<SeasonProviderProps> = ({ children }) => {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [currentSeason, setCurrentSeason] = useState<Season | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch all seasons
        const seasonsResponse = await fetch('/api/seasons');
        if (!seasonsResponse.ok) {
          throw new Error('Failed to fetch seasons');
        }
        
        const seasonsData = await seasonsResponse.json();
        setSeasons(seasonsData);
        
        // Fetch active season
        const activeSeasonResponse = await fetch('/api/seasons/active');
        
        if (activeSeasonResponse.ok) {
          const activeSeasonData = await activeSeasonResponse.json();
          setCurrentSeason(activeSeasonData);
        } else if (seasonsData.length > 0) {
          // If no active season is set but seasons exist, use the most recent one
          setCurrentSeason(seasonsData[0]);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeasons();
  }, []);

  const value = {
    seasons,
    currentSeason,
    setCurrentSeason,
    isLoading,
    error
  };

  return (
    <SeasonContext.Provider value={value}>
      {children}
    </SeasonContext.Provider>
  );
};