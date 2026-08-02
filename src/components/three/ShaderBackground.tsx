"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;

  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));
    vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
    vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;
    i=mod289(i);
    vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m=m*m;m=m*m;
    vec3 x=2.0*fract(p*C.www)-1.0;
    vec3 h=abs(x)-0.5;
    vec3 ox=floor(x+0.5);vec3 a0=x-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g;g.x=a0.x*x0.x+h.x*x0.y;
    g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.0*dot(m,g);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.12;
    float n1 = snoise(uv * 1.5 + vec2(t*0.6, t*0.4));
    float n2 = snoise(uv * 2.8 - vec2(t*0.3, t*0.7) + n1*0.5);
    float n3 = snoise(uv * 4.0 + vec2(-t*0.5, t*0.2) + n2*0.4);
    float noise = (n1*0.6 + n2*0.3 + n3*0.2);

    vec2 mouse = uMouse*0.5+0.5;
    float mouseDist = length(uv - mouse);
    float mouseGlow = smoothstep(0.55, 0.0, mouseDist) * 0.3;

    vec3 deep     = vec3(0.02, 0.02, 0.03);
    vec3 mid      = vec3(0.10, 0.06, 0.15);
    vec3 accent   = vec3(0.04, 0.58, 0.28); // 👈 Royal Green accent (RGB normalized 0.0 to 1.0)
    vec3 highlight = vec3(0.58, 0.32, 0.95);

    float mf = noise*0.5+0.5;
    vec3 color = mix(deep, mid, mf);
    color = mix(color, accent, smoothstep(0.55, 0.85, mf)*0.55);
    color = mix(color, highlight, smoothstep(0.78, 0.95, mf)*0.30);
    color += accent * mouseGlow;

    float vign = smoothstep(1.2, 0.4, length(uv - 0.5));
    color *= 0.6 + 0.4*vign;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const mouseTarget = useRef(new THREE.Vector2(0, 0));
  const speedMult = 1.0; // 👈 Defined speed multiplier

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state) => {
    const mat = materialRef.current;
    if (!mat || !mat.uniforms) return;

    if (mat.uniforms.uTime) {
      mat.uniforms.uTime.value = state.clock.elapsedTime * speedMult;
    }

    if (!isMobile && mat.uniforms.uMouse) {
      mouseTarget.current.x += (state.pointer.x - mouseTarget.current.x) * 0.05; // Used R3F's native state.pointer
      mouseTarget.current.y += (state.pointer.y - mouseTarget.current.y) * 0.05;
      mat.uniforms.uMouse.value.copy(mouseTarget.current);
    } else if (isMobile && mat.uniforms.uMouse) {
      // Gentle ambient light drift for touch screens
      const t = state.clock.elapsedTime * 0.5;
      mouseTarget.current.x = Math.sin(t) * 0.3;
      mouseTarget.current.y = Math.cos(t * 0.8) * 0.3;
      mat.uniforms.uMouse.value.copy(mouseTarget.current);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function ShaderBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(
        window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768
      );
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 50 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ShaderPlane isMobile={isMobile} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none"></div>
    </div>
  );
}