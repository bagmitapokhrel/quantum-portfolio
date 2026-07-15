"use client";

import React, { createContext, useContext, useState } from 'react';

// These are all the different "worlds" our visitor can travel to
export type WorldState = 'intro' | 'identity' | 'journey' | 'galaxy' | 'network' | 'metro' | 'comms';

interface UniverseContextType {
  isBooted: boolean;
  bootUniverse: () => void;
  currentWorld: WorldState;
  setCurrentWorld: (world: WorldState) => void;
}

const UniverseContext = createContext<UniverseContextType | undefined>(undefined);

export const UniverseProvider = ({ children }: { children: React.ReactNode }) => {
  const [isBooted, setIsBooted] = useState(false);
  const [currentWorld, setCurrentWorld] = useState<WorldState>('intro');

  const bootUniverse = () => {
    setIsBooted(true);
    setCurrentWorld('identity'); // Go straight to identity terminal once clicked!
  };

  return (
    <UniverseContext.Provider value={{ isBooted, bootUniverse, currentWorld, setCurrentWorld }}>
      {children}
    </UniverseContext.Provider>
  );
};

export const useUniverse = () => {
  const context = useContext(UniverseContext);
  if (!context) throw new Error('useUniverse must be wrapped inside a UniverseProvider');
  return context;
};