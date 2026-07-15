"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Terminal() {
  const [history, setHistory] = useState<string[]>([
    "LOG: Quantum core synchronized successfully.",
    "LOG: AI Agent 'PORTFOLIO_CORE' online.",
    "Operator initialized: BAGMITA POKHREL // AUTHORIZED",
    "Type 'help' to see available mainframe protocols."
  ]);
  const [input, setInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;

    let response = `COMMAND NOT RECOGNIZED: '${command}'. Type 'help' for authorization codes.`;

    if (command === 'help') {
      response = "AVAILABLE PROTOCOLS: 'about' | 'skills' | 'status' | 'clear'";
    } else if (command === 'about') {
      response = "IDENTITY: Bagmita Pokhrel // Passionate Web Developer & Software Engineer. Dedicated to engineering high-performance user interfaces and building scalable, robust web solutions.";
    } else if (command === 'skills') {
      response = "CORE TECH MATRIX: Frontend (Next.js, React, TypeScript, Tailwind CSS) | Backend (Node.js, Express, REST APIs) | Tools (Git, GitHub, Vercel).";
    } else if (command === 'status') {
      response = "SYSTEM STATUS: 100% Operational. Core temperature: optimal. Operator: Bagmita Pokhrel is ready for hire.";
    } else if (command === 'clear') {
      setHistory([]);
      setInput("");
      return;
    }

    setHistory((prev) => [...prev, `> ${input}`, response]);
    setInput("");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl h-[380px] font-mono text-xs text-cyan-400/90 liquid-glass rounded-xl border border-cyan-500/20 p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.05)] bg-black/20"
    >
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
        </div>
        <span className="text-[10px] text-cyan-500/60 tracking-widest uppercase">bagmita_pokhrel://identity_core</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('>') ? 'text-fuchsia-400' : 'text-cyan-300/80'}>
            {line}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-2 border-t border-cyan-500/10 mt-2">
        <span className="text-fuchsia-400 animate-pulse">&gt;</span>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-cyan-200 outline-none border-none focus:ring-0 placeholder-cyan-500/30"
          placeholder="Enter access code..."
          autoFocus
        />
      </form>
    </motion.div>
  );
}