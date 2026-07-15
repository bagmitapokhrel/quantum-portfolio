"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Briefcase, Milestone } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  company: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
}

export default function Journey() {
  const [activeNode, setActiveNode] = useState<number>(0);

  const timelineData: TimelineEvent[] = [
    {
      year: "2026",
      title: "Full-Stack Web Developer",
      company: "Personal Projects & Freelance",
      description: "Building modern interactive web applications using Next.js, Framer Motion, and high-performance user interfaces.",
      icon: Briefcase,
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"]
    },
    {
      year: "2025",
      title: "Software Engineering Student",
      company: "Development Bootcamps / Education",
      description: "Mastered core JavaScript concepts, asynchronous programming, system data modeling, and clean code principles.",
      icon: Milestone,
      tags: ["JavaScript", "HTML5", "CSS3", "Git & GitHub"]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl p-6 flex flex-col md:flex-row gap-8 items-center justify-center font-mono"
    >
      <div className="flex md:flex-col gap-6 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-cyan-500/10 hidden md:block" />
        <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-cyan-500/10 md:hidden" />

        {timelineData.map((node, index) => {
          const NodeIcon = node.icon;
          const isSelected = activeNode === index;

          return (
            <button
              key={index}
              onClick={() => setActiveNode(index)}
              className="relative z-10 p-4 rounded-xl liquid-glass border focus:outline-none transition-all duration-300 group flex flex-col items-center justify-center w-20 h-20 bg-black"
              style={{
                borderColor: isSelected ? 'rgba(6, 182, 212, 0.4)' : 'rgba(255, 255, 255, 0.05)',
                boxShadow: isSelected ? '0 0 20px rgba(6, 182, 212, 0.15)' : 'none'
              }}
            >
              <NodeIcon className={`w-5 h-5 transition-transform duration-300 ${isSelected ? 'text-cyan-400 scale-110' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span className={`text-[10px] mt-1 tracking-wider ${isSelected ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
                {node.year}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 w-full min-h-[260px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode}
            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full h-full liquid-glass rounded-2xl border border-white/10 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-fuchsia-400" />
                <span className="text-xs text-fuchsia-400 tracking-widest bg-fuchsia-500/10 px-2 py-0.5 rounded border border-fuchsia-500/25">
                  TEMPORAL NODE: {timelineData[activeNode].year}
                </span>
              </div>

              <h2 className="text-sm md:text-base font-bold text-slate-100 tracking-wide uppercase">
                {timelineData[activeNode].title}
              </h2>
              <p className="text-xs text-cyan-400/80 mt-0.5 tracking-wider">
                @ {timelineData[activeNode].company}
              </p>

              <p className="text-xs text-slate-400 leading-relaxed mt-4 font-sans max-w-xl">
                {timelineData[activeNode].description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-6 mt-4 border-t border-white/5">
              {timelineData[activeNode].tags.map((tag, idx) => (
                <span key={idx} className="text-[9px] tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}