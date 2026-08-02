"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

/*
 *  🎨 Shape 1: A globby, morphing sphere in the center-right of the hero
 */
function MorphingBlob() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[1.5, 0, -1]} scale={1.6}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          emissive="#6366f1"
          emissiveIntensity={0.4}
          distort={0.5}
          speed={2}
          roughness={0.1}
          metalness={0.6}
        />
      </mesh>
    </Float>
  );
}

interface FloatingShapeProps {
  position: [number, number, number];
  color: string;
  scale?: number;
}

/*
 *  🎨 Shape 2: Floating Torus Ring
 */
function FloatingRing({ position, color, scale = 1 }: FloatingShapeProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[1, 0.3, 16, 60]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} wireframe={false} />
      </mesh>
    </Float>
  );
}

/*
 *  🎨 Shape 3: Faceted Geometric Crystal (Octahedron)
 */
function FloatingCrystal({ position, color, scale = 0.6 }: FloatingShapeProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5;
      ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

interface ParticleData {
  position: [number, number, number];
  scale: number;
}

/*
 *  🎨 Shape 4: Particle Field (Diamond Dust)
 */
function ParticleField() {
  const particles = useMemo<ParticleData[]>(() => {
    const temp: ParticleData[] = [];
    for (let i = 0; i < 40; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
        ],
        scale: Math.random() * 0.08 + 0.03,
      });
    }
    return temp;
  }, []);

  return (
    <group>
      {particles.map((p, i) => (
        <Float key={i} speed={Math.random() * 2 + 1} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={p.position} scale={p.scale}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#c4b5fd"
              emissive="#a78bfa"
              emissiveIntensity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/*
 *  🎥 Camera Follow (Parallax Effect)
 */
function MouseFollower() {
  useFrame((state) => {
    state.camera.position.x += (state.pointer.x * 0.5 - state.camera.position.x) * 0.05;
    state.camera.position.y += (-state.pointer.y * 0.3 - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

/*
 *  🌌 Scene Content
 */
function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#a78bfa" />
      <pointLight position={[-5, -3, 3]} intensity={1} color="#6366f1" />
      <pointLight position={[0, 4, -2]} intensity={0.8} color="#ec4899" />

      <Stars radius={50} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />

      <MorphingBlob />
      <FloatingRing position={[-2.5, 1.2, -2]} color="#f472b6" scale={0.5} />
      <FloatingRing position={[3, -1.5, -1]} color="#22d3ee" scale={0.35} />
      <FloatingCrystal position={[-3, -1, -0.5]} color="#fbbf24" scale={0.45} />
      <FloatingCrystal position={[3.5, 1.5, -2]} color="#34d399" scale={0.35} />
      <ParticleField />

      <MouseFollower />
    </>
  );
}

/*
 *  🖼️ Main Exported Component
 */
export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950"></div>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
}