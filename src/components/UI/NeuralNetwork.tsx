"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity, Layers } from 'lucide-react';

interface SkillNode {
  name: string;
  category: 'frontend' | 'backend' | 'infra';
  mastery: string;
  experience: string;
}

export default function NeuralNetwork() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const skillNodes: SkillNode[] = [
    { name: "TypeScript", category: "frontend", mastery: "95%", experience: "4+ Years" },
    { name: "Next.js 15", category: "frontend", mastery: "90%", experience: "3+ Years" },
    { name: "React Three Fiber", category: "frontend", mastery: "80%", experience: "2 Years" },
    { name: "Node.js / Rust", category: "backend", mastery: "85%", experience: "3 Years" },
    { name: "GraphQL APIs", category: "backend", mastery: "90%", experience: "3+ Years" },
    { name: "AWS / Docker", category: "infra", mastery: "75%", experience: "2 Years" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-3xl p-6 font-mono grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {/* Left Columns: Interactive Interactive Grid Elements */}
      <div className="md:col-span-2 grid grid-cols-2 gap-3 relative">
        {skillNodes.map((skill, idx) => {
          const isHovered = hoveredIndex === idx;
          
          return (
            <motion.div
              key={idx}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.02, translateY: -2 }}
              className="p-4 rounded-xl liquid-glass border cursor-pointer transition-colors duration-300 flex flex-col justify-between h-24"
              style={{
                borderColor: isHovered ? 'rgba(6, 182, 212, 0.4)' : 'rgba(255, 255, 255, 0.05)',
                boxShadow: isHovered ? '0 0 20px rgba(6, 182, 212, 0.1)' : 'none'
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">{skill.name}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  skill.category === 'frontend' ? 'bg-cyan-400' : skill.category === 'backend' ? 'bg-fuchsia-400' : 'bg-emerald-400'
                }`} />
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-1">
                <Activity className="w-3 h-3 text-cyan-500/60" />
                Read Matrix Data
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Right Column: Holographic Detail Matrix Diagnostic Card */}
      <div className="w-full h-full min-h-[200px]">
        <div className="w-full h-full liquid-glass rounded-2xl border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden">
          {hoveredIndex !== null ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-cyan-400 text-xs tracking-widest border-b border-white/5 pb-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                NODE DIAGNOSTIC
              </div>

              <div>
                <span className="text-[9px] text-slate-500 block uppercase tracking-widest">Identified Core</span>
                <span className="text-sm font-bold text-slate-200">{skillNodes[hoveredIndex].name}</span>
              </div>

              <div>
                <span className="text-[9px] text-slate-500 block uppercase tracking-widest">Efficiency Rating</span>
                <span className="text-sm font-bold text-fuchsia-400">{skillNodes[hoveredIndex].mastery}</span>
              </div>

              <div>
                <span className="text-[9px] text-slate-500 block uppercase tracking-widest">Active Runtime</span>
                <span className="text-xs text-slate-300">{skillNodes[hoveredIndex].experience}</span>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full space-y-2 py-8">
              <Layers className="w-6 h-6 text-slate-600 animate-pulse" />
              <p className="text-[10px] text-slate-500 tracking-wider uppercase max-w-[160px]">
                Hover tech vectors to synchronize subsystem node metrics.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}