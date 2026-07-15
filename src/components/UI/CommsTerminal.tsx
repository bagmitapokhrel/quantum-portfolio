"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, ShieldAlert, Radio, Mail } from 'lucide-react';

export default function CommsTerminal() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success'>('idle');

  const handleTransmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('transmitting');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    }, 2200);
  };

  return (
    <div className="flex flex-col gap-6 items-center w-full max-w-xl p-4 bg-black">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full min-h-[400px] font-mono text-xs text-cyan-400 rounded-xl border border-cyan-500/30 p-5 flex flex-col justify-between overflow-hidden relative shadow-[0_0_30px_rgba(6,182,212,0.15)] bg-zinc-950/90"
      >
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-fuchsia-500 animate-pulse" style={{ width: '16px', height: '16px' }} />
            <span className="text-[10px] text-cyan-400 tracking-widest uppercase">secure_comms://uplink_v7</span>
          </div>
          <div className="text-[9px] text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-1.5 py-0.5 rounded tracking-widest">
            ENC: AES_256
          </div>
        </div>

        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.form key="form" onSubmit={handleTransmission} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 tracking-wider uppercase block">Caller Handle</label>
                    <input 
                      type="text" required value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-zinc-200 outline-none focus:border-cyan-500 transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 tracking-wider uppercase block">Return Address</label>
                    <input 
                      type="email" required value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-zinc-200 outline-none focus:border-cyan-500 transition-colors"
                      placeholder="email@domain.com"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-zinc-500 tracking-wider uppercase block">Message Payload</label>
                  <textarea 
                    rows={4} required value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-zinc-200 outline-none focus:border-cyan-500 transition-colors resize-none font-sans"
                    placeholder="Type your transmission packet here..."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full border border-cyan-500/40 bg-cyan-950/20 hover:bg-cyan-500/20 text-cyan-400 text-[10px] tracking-[0.25em] font-bold py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 uppercase cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" style={{ width: '14px', height: '14px' }} />
                  Initialize Uplink
                </button>
              </motion.form>
            )}

            {status === 'transmitting' && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center space-y-3">
                <ShieldAlert className="w-8 h-8 text-fuchsia-500 animate-spin" style={{ width: '32px', height: '32px' }} />
                <p className="text-fuchsia-400 tracking-widest text-[10px] uppercase animate-pulse">Encrypting data vectors...</p>
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                <CheckCircle className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_15px_rgba(16,183,129,0.4)]" style={{ width: '40px', height: '40px' }} />
                <div className="text-center space-y-1">
                  <h3 className="text-zinc-200 font-bold tracking-widest uppercase">TRANSMISSION COMPLETION</h3>
                  <p className="text-emerald-400 text-[10px] tracking-wider uppercase">Message cached successfully.</p>
                </div>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-2 border border-zinc-800 bg-zinc-900 px-3 py-1.5 rounded text-[9px] tracking-widest text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  RETURN TO SUB-INTERFACE
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Social Links Hub */}
      <div className="w-full grid grid-cols-3 gap-3 font-mono text-[10px]">
        <a 
          href="https://github.com/bagmitapokhrel" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border border-zinc-800 bg-zinc-900/60 hover:bg-cyan-950/40 hover:border-cyan-500/50 text-zinc-400 hover:text-cyan-400 rounded-xl py-3 transition-all duration-300"
        >
          <svg viewBox="0 0 24 24" className="fill-current" style={{ width: '16px', height: '16px' }}>
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span className="uppercase tracking-wider font-bold"></span>
        </a>
        <a 
          href="https://linkedin.com/bagmita-pokhrel" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border border-zinc-800 bg-zinc-900/60 hover:bg-cyan-950/40 hover:border-cyan-500/50 text-zinc-400 hover:text-cyan-400 rounded-xl py-3 transition-all duration-300"
        >
          <svg viewBox="0 0 24 24" className="fill-current" style={{ width: '16px', height: '16px' }}>
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          <span className="uppercase tracking-wider font-bold"></span>
        </a>
        <a 
          href="mailto:bagmitapokhrel@gmail.com" 
          className="flex items-center justify-center gap-2 border border-zinc-800 bg-zinc-900/60 hover:bg-cyan-950/40 hover:border-cyan-500/50 text-zinc-400 hover:text-cyan-400 rounded-xl py-3 transition-all duration-300"
        >
          <Mail className="text-zinc-400 group-hover:text-cyan-400" style={{ width: '16px', height: '16px' }} />
          <span className="uppercase tracking-wider font-bold"></span>
        </a>
      </div>
    </div>
  );
}