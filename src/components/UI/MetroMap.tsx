"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Shield, Zap, Database, Terminal, Layout } from 'lucide-react';

interface MetroStation {
  id: string;
  name: string;
  line: 'core' | 'data' | 'interface';
  icon: React.ComponentType<{ className?: string }>;
  details: string;
  coordinates: { x: string; y: string };
}

export default function MetroMap() {
  const [activeStation, setActiveStation] = useState<MetroStation | null>(null);

  const stations: MetroStation[] = [
    { id: '1', name: 'UI_GATEWAY', line: 'interface', icon: Layout, details: 'Client application layouts, responsive DOM tree components, and dynamic design templates.', coordinates: { x: '15%', y: '25%' } },
    { id: '2', name: 'ENGINE_NODE', line: 'core', icon: Terminal, details: 'The application core execution environment, handling lifecycle states and calculations.', coordinates: { x: '50%', y: '35%' } },
    { id: '3', name: 'PIPELINE_X', line: 'core', icon: Zap, details: 'Fast asset packaging, bundle minifiers, and real-time streaming sockets.', coordinates: { x: '80%', y: '25%' } },
    { id: '4', name: 'REDUX_VAULT', line: 'data', icon: Database, details: 'Global memory registries, local storage synchronize modules, and state synchronization systems.', coordinates: { x: '30%', y: '70%' } },
    { id: '5', name: 'GUARD_PROXY', line: 'data', icon: Shield, details: 'Security payload filters, token validation routers, and system encryption layers.', coordinates: { x: '65%', y: '75%' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl p-6 font-mono flex flex-col gap-6 items-center justify-center"
    >
      {/* Interactive Transit Grid Area */}
      <div className="w-full h-[320px] liquid-glass rounded-2xl border border-white/10 relative overflow-hidden bg-black/40">
        {/* Holographic Layout Grid Lines */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-20">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-dashed border-cyan-500/40" />
          ))}
        </div>

        {/* Vector SVG Rail Line Connecting Path Tracks */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          {/* Interface Line (Cyan) */}
          <line x1="15%" y1="25%" x2="50%" y2="35%" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" />
          {/* Core Execution Line (Fuchsia) */}
          <line x1="50%" y1="35%" x2="80%" y2="25%" stroke="#d946ef" strokeWidth="2" />
          {/* Data Line (Emerald) */}
          <line x1="50%" y1="35%" x2="30%" y2="70%" stroke="#10b981" strokeWidth="2" />
          <line x1="30%" y1="70%" x2="65%" y2="75%" stroke="#10b981" strokeWidth="2" strokeDasharray="6 3" />
          <line x1="50%" y1="35%" x2="65%" y2="75%" stroke="#d946ef" strokeWidth="1.5" />
        </svg>

        {/* Dynamic Map Stations Render Loop */}
        {stations.map((station) => {
          const StationIcon = station.icon;
          const isActive = activeStation?.id === station.id;

          return (
            <button
              key={station.id}
              onClick={() => setActiveStation(station)}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-xl border z-20 transition-all duration-300 group focus:outline-none bg-black"
              style={{
                left: station.coordinates.x,
                top: station.coordinates.y,
                borderColor: isActive 
                  ? '#f43f5e' 
                  : station.line === 'interface' ? '#06b6d4' : station.line === 'core' ? '#d946ef' : '#10b981',
                boxShadow: isActive ? '0 0 20px rgba(244, 63, 94, 0.4)' : 'none'
              }}
            >
              <StationIcon className={`w-4 h-4 transition-transform ${isActive ? 'scale-120 text-rose-400' : 'text-slate-300 group-hover:scale-110'}`} />
              
              {/* Floating Inline Tag Pin */}
              <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-1.5 py-0.5 rounded text-[8px] bg-black/80 border border-white/10 text-slate-400 tracking-wider whitespace-nowrap opacity-70 group-hover:opacity-100">
                {station.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Telemetry HUD Detail Box */}
      <div className="w-full min-h-[90px] liquid-glass rounded-xl border border-white/5 p-4 flex items-start gap-3">
        <MapPin className="w-5 h-5 text-rose-500 mt-0.5 shrink-0 animate-bounce" />
        <div>
          {activeStation ? (
            <>
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest">
                STATION LINK ESTABLISHED // LINE: {activeStation.line.toUpperCase()}::{activeStation.name}
              </h3>
              <p className="text-[11px] font-sans text-slate-400 leading-relaxed mt-1">
                {activeStation.details}
              </p>
            </>
          ) : (
            <p className="text-[10px] text-slate-500 uppercase tracking-wider py-2">
              Select an active coordinate node station from the system layout matrix above to intercept network diagnostics.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}