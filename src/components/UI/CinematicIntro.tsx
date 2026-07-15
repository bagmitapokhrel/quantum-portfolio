"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useUniverse } from '@/context/UniverseContext';

export default function CinematicIntro() {
  const { bootUniverse, isBooted } = useUniverse();
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const springConfig = { damping: 30, stiffness: 150, mass: 0.6 };
  const orbX = useSpring(mouseX, springConfig);
  const orbY = useSpring(mouseY, springConfig);

  const glowX = useTransform(orbX, (v) => v * 1.4);
  const glowY = useTransform(orbY, (v) => v * 1.4);

  return (
    <AnimatePresence>
      {!isBooted && (
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.3, 
            filter: "blur(30px)",
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black cursor-crosshair select-none"
        >
          {/* Ambient Background Glow Layer */}
          <motion.div 
            style={{ x: glowX, y: glowY }}
            className="absolute w-[450px] h-[450px] bg-cyan-500/10 rounded-full filter blur-[100px] pointer-events-none"
          />
          
          {/* The Magnetic Interactive Orb Container */}
          <motion.div
            style={{ x: orbX, y: orbY }}
            onClick={bootUniverse}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-44 h-44 rounded-full flex items-center justify-center group cursor-pointer z-30"
          >
            {/* Holographic Outer Ring */}
            <div className="absolute inset-0 rounded-full border border-cyan-500/20 group-hover:border-cyan-400/60 transition-colors duration-500 animate-spin [animation-duration:12s] pointer-events-none" />
            
            {/* Dashed Inner Core Orbit */}
            <div className="absolute inset-4 rounded-full border border-dashed border-fuchsia-500/20 group-hover:border-fuchsia-400/40 transition-colors duration-500 animate-spin [animation-duration:8s] reverse pointer-events-none" />
            
            {/* Fixed Vector Quantum Fluid Core */}
            <div className="relative w-24 h-24 flex items-center justify-center mix-blend-screen">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_25px_rgba(6,182,212,0.8)] animate-pulse">
                <defs>
                  <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#d946ef" />
                  </linearGradient>
                </defs>
                <motion.path
                  animate={{
                    d: [
                      "M50 15 C65 15, 85 30, 85 50 C85 70, 68 85, 50 85 C32 85, 15 68, 15 50 C15 30, 35 15, 50 15 Z",
                      "M50 20 C70 15, 80 35, 80 50 C80 70, 65 78, 50 80 C30 82, 20 65, 20 50 C20 32, 30 25, 50 20 Z",
                      "M50 15 C65 15, 85 30, 85 50 C85 70, 68 85, 50 85 C32 85, 15 68, 15 50 C15 30, 35 15, 50 15 Z"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut"
                  }}
                  fill="url(#coreGrad)"
                />
              </svg>
            </div>
          </motion.div>

          {/* Text Instruction HUD */}
          <div className="mt-8 text-center pointer-events-none z-10">
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-cyan-400/80">
              CLICK CORE TO BOOT SYSTEM
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}