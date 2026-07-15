"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, OrbitControls, Stars } from '@react-three/drei';
import ProjectGalaxy from './ProjectGalaxy';

export default function UniverseCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full bg-transparent pointer-events-auto z-0">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#d946ef" />
          
          {/* Deep Space Particle Matrix background */}
          <Stars radius={100} depth={50} count={1500} factor={4} saturation={0.5} fade speed={1} />
          
          <ProjectGalaxy />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            maxPolarAngle={Math.PI / 1.8} 
            minPolarAngle={Math.PI / 2.5} 
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}