"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useUniverse, WorldState } from '@/context/UniverseContext';
import { Terminal, Compass, Globe, Share2, Eye, Map } from 'lucide-react';

export default function HoloNav() {
  const { currentWorld, setCurrentWorld, isBooted } = useUniverse();

  // If the universe hasn't been booted yet via the orb, keep the navigation hidden
  if (!isBooted) return null;

  // Configuration for our futuristic workspace zones
  const navigationItems = [
    { id: 'identity', label: 'Identity', icon: Terminal },
    { id: 'journey', label: 'Journey', icon: Compass },
    { id: 'galaxy', label: 'Galaxy', icon: Globe },
    { id: 'network', label: 'Neural', icon: Eye },
    { id: 'metro', label: 'Metro', icon: Map },
    { id: 'comms', label: 'Comms', icon: Share2 },
  ] as const;

  return (
    <motion.nav 
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 120, damping: 20 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 py-2 liquid-glass rounded-full flex items-center gap-1 max-w-sm sm:max-w-xl"
    >
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentWorld === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setCurrentWorld(item.id)}
            className="relative p-3 rounded-full text-slate-400 hover:text-slate-100 transition-colors group focus:outline-none"
          >
            {/* The Liquid Spring Active Capsule Backdrop */}
            {isActive && (
              <motion.div 
                layoutId="holoActiveCapsule"
                className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/30 rounded-full neon-glow-cyan"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            
            {/* Icon Element */}
            <Icon className={`w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-cyan-400' : ''}`} />
            
            {/* Holographic Tooltip Popup */}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-0.5 text-[9px] font-mono tracking-widest text-cyan-400 uppercase bg-black/90 border border-cyan-500/20 rounded opacity-0 scale-90 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
              {item.label}
            </span>
          </button>
        );
      })}
    </motion.nav>
  );
}