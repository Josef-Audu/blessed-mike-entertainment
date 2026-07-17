"use client";

import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";

function GoldenOrb() {
  const group = useRef(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x += (state.pointer.y * 0.18 - group.current.rotation.x) * 0.035;
    group.current.rotation.z += (state.pointer.x * 0.14 - group.current.rotation.z) * 0.035;
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.7}>
        <mesh><sphereGeometry args={[2.15, 32, 32]} /><meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.28} /></mesh>
        <mesh rotation={[0.45, 0.4, 0.2]}><icosahedronGeometry args={[1.15, 1]} /><meshStandardMaterial color="#18181b" emissive="#f59e0b" emissiveIntensity={0.42} roughness={0.55} metalness={0.8} wireframe transparent opacity={0.72} /></mesh>
        <mesh rotation={[Math.PI / 2.4, 0.3, 0]}><torusGeometry args={[2.65, 0.025, 8, 96]} /><meshBasicMaterial color="#fbbf24" transparent opacity={0.38} /></mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  const reduceMotion = useReducedMotion();

  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 42 }} dpr={[1, 1.5]} frameloop={reduceMotion ? "demand" : "always"} fallback={<div className="hero-orb-fallback" />} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={0.45} />
      <pointLight position={[3, 3, 4]} color="#f59e0b" intensity={18} distance={12} />
      <GoldenOrb />
    </Canvas>
  );
}
