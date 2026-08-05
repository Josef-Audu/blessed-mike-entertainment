"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function RotatingWireframe() {
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.06;
    ref.current.rotation.x += delta * 0.02;
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[3.2, 28, 28]} />
        <meshBasicMaterial color="#d97706" wireframe transparent opacity={0.16} depthWrite={false} />
      </mesh>
    </group>
  );
}

function ParticleField({ count = 400 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.6 + Math.random() * 1.6;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.06) * 0.2;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attachObject={["attributes", "position"]} count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color="#f59e0b" sizeAttenuation={true} transparent opacity={0.85} />
    </points>
  );
}

export default function CTABackground() {
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setDpr(Math.min(window.devicePixelRatio || 1, 2));
  }, []);

  // Small, lightweight scene used as ambient backdrop. pointer-events-none to avoid capturing clicks.
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={dpr}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power", preserveDrawingBuffer: false }}
        shadows={false}
        frameloop="demand"
      >
        <ambientLight intensity={0.35} />
        <pointLight position={[5, 5, 6]} color="#f59e0b" intensity={0.9} distance={20} />
        <RotatingWireframe />
        <ParticleField count={420} />
      </Canvas>
    </div>
  );
}
