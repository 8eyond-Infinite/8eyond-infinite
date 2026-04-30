"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const Ribbon = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const t = (i / 64) * Math.PI * 2;
      const x = 10 * Math.sin(t);
      const y = 5 * Math.sin(t) * Math.cos(t);
      const z = 2 * Math.cos(t);
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points, true);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const t = performance.now() / 1000;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    meshRef.current.position.y = -scrollY * 0.005;
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[curve, 128, 0.4, 12, true]} />
      <MeshDistortMaterial
        color="#fbbf24"
        speed={2}
        distort={0.3}
        radius={1}
        emissive="#fbbf24"
        emissiveIntensity={0.5}
        metalness={1}
        roughness={0.1}
      />
    </mesh>
  );
};

export const InfinityRibbon = () => {
  const [particlePositions, setParticlePositions] = useState<[number, number, number][]>([]);

  useEffect(() => {
    setParticlePositions(
      Array.from({ length: 50 }).map(() => [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 20
      ] as [number, number, number])
    );
  }, []);

  if (particlePositions.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] opacity-40">
      <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#fbbf24" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ef4444" />
        <spotLight position={[0, 20, 0]} intensity={2} color="#ffffff" />
        
        <Ribbon />
        
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
           {particlePositions.map((pos, i) => (
             <mesh key={i} position={pos}>
               <sphereGeometry args={[0.05, 8, 8]} />
               <meshBasicMaterial color="#fbbf24" transparent opacity={0.3} />
             </mesh>
           ))}
        </Float>
      </Canvas>
    </div>
  );
};
