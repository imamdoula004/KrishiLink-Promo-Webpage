"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// --- Waving Instanced Grass Component ---
function WavingGrass({ count = 2500, scrollProgress = 0 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Custom vertex shader logic injection to sway grass blades using wind noise
  const customShader = useMemo(() => {
    return {
      uniforms: {
        uTime: { value: 0 },
        uWindSpeed: { value: 2.2 },
        uWindStrength: { value: 0.28 },
      },
      vertexShaderHook: `
        uniform float uTime;
        uniform float uWindSpeed;
        uniform float uWindStrength;
        
        // Sway function based on height (uv.y) and sin/cos noise
        vec3 applyWind(vec3 pos, vec2 uv, vec3 instPos) {
          float sway = pow(uv.y, 2.0); // Only sway top of blade
          float angle = uTime * uWindSpeed + instPos.x * 0.8 + instPos.z * 0.8;
          float windX = sin(angle) * uWindStrength * sway;
          float windZ = cos(angle * 0.8) * uWindStrength * 0.5 * sway;
          return pos + vec3(windX, 0.0, windZ);
        }
      `
    };
  }, []);

  // Initialize instance positions, scales, and colors
  const attribs = useMemo(() => {
    const tempPosition = new THREE.Vector3();
    const tempRotation = new THREE.Euler();
    const tempScale = new THREE.Vector3();
    const tempMatrix = new THREE.Matrix4();
    const tempColor = new THREE.Color();

    const data = [];
    const colors = [];

    // Distribute grass instances over a grid representing Bangladeshi crop fields
    for (let i = 0; i < count; i++) {
      // Circle layout with higher density in center
      const r = Math.sqrt(Math.random()) * 25;
      const theta = Math.random() * Math.PI * 2;
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);
      const y = -0.5; // ground offset

      tempPosition.set(x, y, z);
      tempRotation.set(
        (Math.random() - 0.5) * 0.15,
        Math.random() * Math.PI,
        (Math.random() - 0.5) * 0.15
      );
      
      // Grass blade heights
      const height = 0.8 + Math.random() * 1.4;
      tempScale.set(0.08 + Math.random() * 0.08, height, 0.05 + Math.random() * 0.05);

      tempMatrix.compose(tempPosition, new THREE.Quaternion().setFromEuler(tempRotation), tempScale);
      data.push(tempMatrix.clone());

      // Blend organic green, fresh leaf, and golden yellow colors (sunrise aesthetic)
      const colorType = Math.random();
      if (colorType < 0.35) {
        tempColor.setHSL(0.28 + Math.random() * 0.06, 0.65, 0.35 + Math.random() * 0.1); // Green
      } else if (colorType < 0.8) {
        tempColor.setHSL(0.35 + Math.random() * 0.08, 0.7, 0.4 + Math.random() * 0.1); // Fresh leaf
      } else {
        tempColor.setHSL(0.12 + Math.random() * 0.04, 0.8, 0.45 + Math.random() * 0.1); // Golden rice yellow
      }
      colors.push(tempColor.r, tempColor.g, tempColor.b);
    }

    return { matrices: data, colors: new Float32Array(colors) };
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    
    // Apply matrices and colors to the InstancedMesh
    attribs.matrices.forEach((matrix, index) => {
      meshRef.current!.setMatrixAt(index, matrix);
    });

    const colorAttribute = new THREE.InstancedBufferAttribute(attribs.colors, 3);
    meshRef.current.geometry.setAttribute("color", colorAttribute);
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [attribs]);

  // Sway the grass programmatically inside the shader hook by injecting uniform time
  useFrame((state) => {
    if (materialRef.current) {
      if (materialRef.current.userData.uTime === undefined) {
        materialRef.current.userData.uTime = { value: 0 };
      }
      materialRef.current.userData.uTime.value = state.clock.getElapsedTime();
    }
  });

  // Compile custom shader modification to inject waving animations
  const onBeforeCompile = (shader: any) => {
    if (materialRef.current) {
      if (materialRef.current.userData.uTime === undefined) {
        materialRef.current.userData.uTime = { value: 0 };
      }
      shader.uniforms.uTime = materialRef.current.userData.uTime;
    } else {
      shader.uniforms.uTime = { value: 0 };
    }
    shader.uniforms.uWindSpeed = { value: customShader.uniforms.uWindSpeed.value };
    shader.uniforms.uWindStrength = { value: customShader.uniforms.uWindStrength.value };

    shader.vertexShader = `
      ${customShader.vertexShaderHook}
      ${shader.vertexShader}
    `;

    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `
        #include <begin_vertex>
        // Extract instance coordinates from instanceMatrix
        vec3 instPos = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
        transformed = applyWind(transformed, uv, instPos);
      `
    );
  };

  // Build curved plane representation of a grass blade
  const bladeGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1, 1, 1, 8);
    // Align blade origin to base instead of center
    geo.translate(0, 0.5, 0);
    return geo;
  }, []);

  return (
    <instancedMesh
      ref={meshRef}
      args={[bladeGeometry, null as any, count]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        ref={materialRef}
        vertexColors
        roughness={0.8}
        metalness={0.1}
        side={THREE.DoubleSide}
        onBeforeCompile={onBeforeCompile}
      />
    </instancedMesh>
  );
}

// --- Floating Pollen Particles ---
function PollenParticles({ count = 250 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30; // X
      positions[i * 3 + 1] = Math.random() * 8 - 1;   // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30; // Z

      speeds[i] = 0.15 + Math.random() * 0.35;
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, speeds, phases };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      // Drift upwards
      positions[i * 3 + 1] += particles.speeds[i] * 0.02;
      // Sway horizontally using sin/cos phases
      positions[i * 3] += Math.sin(time * 0.8 + particles.phases[i]) * 0.005;

      // Recycle particles that float out of view
      if (positions[i * 3 + 1] > 6) {
        positions[i * 3 + 1] = -1;
        positions[i * 3] = (Math.random() - 0.5) * 30;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#F1C40F"
        size={0.06}
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// --- Flying Birds Component (Distant flocks) ---
function DistantBirds({ count = 8 }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const birdData = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      speed: 1.5 + Math.random() * 1.2,
      scale: 0.15 + Math.random() * 0.15,
      yOffset: Math.random() * 3 + 4,
      zOffset: (Math.random() - 0.5) * 8 - 12,
      phase: Math.random() * Math.PI,
    }));
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, index) => {
      const data = birdData[index];
      // Fly across from left to right (-20 to +20)
      const x = ((time * data.speed + index * 5) % 40) - 20;
      child.position.set(x, data.yOffset + Math.sin(x * 0.5) * 0.5, data.zOffset);
      
      // Flapping wings animation
      const leftWing = child.children[0] as THREE.Mesh;
      const rightWing = child.children[1] as THREE.Mesh;
      if (leftWing && rightWing) {
        const flap = Math.sin(time * 12 + data.phase) * 0.65;
        leftWing.rotation.z = flap;
        rightWing.rotation.z = -flap;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {birdData.map((data, idx) => (
        <group key={idx}>
          {/* Simple low-poly bird constructed of wings (planes) and a head */}
          {/* Left wing */}
          <mesh rotation={[0, 0, 0]}>
            <planeGeometry args={[0.3, 0.08]} />
            <meshBasicMaterial color="#1E5128" side={THREE.DoubleSide} />
          </mesh>
          {/* Right wing */}
          <mesh rotation={[0, 0, 0]} position={[0.3, 0, 0]}>
            <planeGeometry args={[0.3, 0.08]} />
            <meshBasicMaterial color="#1E5128" side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// --- Camera Controller linked to Scroll ---
function SceneController({ scrollProgress = 0 }) {
  const { camera } = useThree();
  const initialCameraPos = useRef(new THREE.Vector3(0, 3, 8));
  const initialCameraLookAt = useRef(new THREE.Vector3(0, 0.5, -4));

  useFrame(() => {
    // Interpolate camera position and target based on scrollProgress (0 to 1)
    // Sinks the camera deeper into the rice field as user scrolls down
    const p = scrollProgress;
    
    // Zoom in and lower angle
    camera.position.x = THREE.MathUtils.lerp(initialCameraPos.current.x, 0, p);
    camera.position.y = THREE.MathUtils.lerp(initialCameraPos.current.y, 0.25, p);
    camera.position.z = THREE.MathUtils.lerp(initialCameraPos.current.z, 2.2, p);

    // Dynamic rotation tilt
    const targetLookY = THREE.MathUtils.lerp(initialCameraLookAt.current.y, -0.2, p);
    camera.lookAt(0, targetLookY, -2);
  });

  return null;
}

// --- Main Farmland Canvas Exporter ---
interface FarmlandProps {
  scrollProgress: number; // 0 to 1
}

export default function FarmlandCanvas({ scrollProgress = 0 }: FarmlandProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
      <Canvas
        shadows
        camera={{ position: [0, 3, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#fbfaf2"]} />
        <fogExp2 attach="fog" args={["#efeee6", 0.045]} />

        {/* Cinematic Morning Lighting */}
        <ambientLight intensity={0.7} />
        {/* Rising sun light */}
        <directionalLight
          position={[10, 6, -8]}
          intensity={2.2}
          color="#ffe088" // Golden sun rays (Stitch tertiary-fixed)
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={35}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {/* Soft fill light (greenish bounce from rice fields) */}
        <directionalLight
          position={[-5, 2, 5]}
          intensity={0.6}
          color="#beedd7" // Soft forest green light (Stitch primary-fixed)
        />

        {/* FARMLAND SCENE COMPONENTS */}
        <WavingGrass count={2800} scrollProgress={scrollProgress} />
        <PollenParticles count={180} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <DistantBirds count={6} />
        </Float>

        {/* Dynamic camera syncing */}
        <SceneController scrollProgress={scrollProgress} />
      </Canvas>
      {/* Volumetric glow overlay representing early morning mist and sunlight */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#efeee6]/20 to-[#ffe088]/10 mix-blend-multiply pointer-events-none" />
    </div>
  );
}
