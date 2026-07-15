"use client";

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps {
  position: [number, number, number];
  color: string;
  speed: number;
  name: string;
}

function ProjectPlanet({ position, color, speed, name }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Continuous orbital rotations
    meshRef.current.rotation.y += 0.01 * speed;
    meshRef.current.rotation.x += 0.005;
    
    // Smooth hover scaling acceleration
    const targetScale = hovered ? 1.4 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group position={position}>
      <Sphere 
        ref={meshRef} 
        args={[1, 32, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        className="cursor-pointer"
      >
        <MeshDistortMaterial
          color={hovered ? "#f43f5e" : color}
          attach="material"
          distort={0.35}
          speed={speed * 2}
          roughness={0.15}
          metalness={0.8}
        />
      </Sphere>

      {/* Floating Holographic Project Label */}
      <Text
        position={[0, -1.6, 0]}
        fontSize={0.35}
        color="#22d3ee"
        font="var(--font-mono)"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
}

export default function ProjectGalaxy() {
  const planets: PlanetProps[] = [
    { position: [-4, 1.5, 0], color: "#06b6d4", speed: 1.2, name: "QUANTUM_CORE" },
    { position: [4, -1, 1], color: "#d946ef", speed: 0.8, name: "AETHER_OS" },
    { position: [-0.5, -2.5, -1], color: "#3b82f6", speed: 1.5, name: "NEXUS_DB" },
  ];

  return (
    <group>
      {planets.map((p, idx) => (
        <ProjectPlanet key={idx} {...p} />
      ))}
    </group>
  );
}