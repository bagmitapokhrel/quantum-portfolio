"use client";

import dynamic from 'next/dynamic';
import CinematicIntro from "@/components/UI/CinematicIntro";
import HoloNav from "@/components/UI/HoloNav";
import Terminal from "@/components/UI/Terminal";
import Journey from "@/components/UI/Journey";
import NeuralNetwork from "@/components/UI/NeuralNetwork";
import MetroMap from "@/components/UI/MetroMap";
import CommsTerminal from "@/components/UI/CommsTerminal"; // <-- Add this import
import { useUniverse } from "@/context/UniverseContext";

const UniverseCanvas = dynamic(() => import("@/components/canvas/UniverseCanvas"), { ssr: false });

export default function Home() {
  const { isBooted, currentWorld } = useUniverse();

  return (
    <div className="relative w-screen h-screen min-h-screen bg-black overflow-hidden flex items-center justify-center">
      <CinematicIntro />
      <HoloNav />

      {isBooted && currentWorld === 'galaxy' && <UniverseCanvas />}

      {isBooted && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 pb-24 pointer-events-none">
          <div className="pointer-events-auto w-full flex items-center justify-center">
            {currentWorld === 'identity' && <Terminal />}
            {currentWorld === 'journey' && <Journey />}
            {currentWorld === 'network' && <NeuralNetwork />}
            {currentWorld === 'metro' && <MetroMap />}
            {currentWorld === 'comms' && <CommsTerminal />} {/* <-- Add this handler */}
          </div>
          
          {currentWorld === 'galaxy' && (
            <div className="absolute top-12 text-center select-none pointer-events-none">
              <h1 className="font-mono text-cyan-400 text-xs tracking-[0.4em] uppercase animate-pulse">
                // ENTERING STELLAR CATALOGUE //
              </h1>
              <p className="text-[9px] text-slate-500 font-mono tracking-widest mt-1">
                Click and drag space field to rotate system matrices. Hover anomalous spheres.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}