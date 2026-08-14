import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, ContactShadows, Sparkles, OrbitControls, Text, Center } from '@react-three/drei';
import * as THREE from 'three';
import { ProductVariant } from '../types';
import { Rotate3d, Sparkles as SparklesIcon, Eye, Move3d, Layers } from 'lucide-react';

interface ShoeMeshProps {
  imageSrc: string;
  accentColor: string;
  is3DRotating: boolean;
}

const ShoeDisplayMesh: React.FC<ShoeMeshProps> = ({ imageSrc, accentColor, is3DRotating }) => {
  const texture = useLoader(THREE.TextureLoader, imageSrc);
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Smooth floating and rotation animation
  useFrame((state, delta) => {
    if (meshRef.current && is3DRotating) {
      meshRef.current.rotation.y += delta * 0.4;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.3;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Dynamic Floating 3D Badge Orbit Ring */}
      <mesh ref={ringRef} position={[0, 0, -0.2]}>
        <torusGeometry args={[2.2, 0.03, 16, 100]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Main Front Shoe Display Mesh */}
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[3.4, 3.4]} />
          <meshBasicMaterial
            map={texture}
            transparent={true}
            side={THREE.DoubleSide}
            alphaTest={0.01}
          />
        </mesh>

        {/* Backside mirrored mesh for full 3D rotation feel */}
        <mesh position={[0, 0, -0.05]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[3.4, 3.4]} />
          <meshBasicMaterial
            map={texture}
            transparent={true}
            side={THREE.DoubleSide}
            alphaTest={0.01}
          />
        </mesh>
      </Float>

      {/* Floating 3D Gold Seal Mesh */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh position={[1.4, 1.2, 0.5]}>
          <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
          <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>
    </group>
  );
};

interface Shoe3DStageCanvasProps {
  selectedVariant: ProductVariant;
  activeImage: string;
}

export const Shoe3DStageCanvas: React.FC<Shoe3DStageCanvasProps> = ({
  selectedVariant,
  activeImage
}) => {
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [is3DCanvasReady, setIs3DCanvasReady] = useState(true);

  return (
    <div className="relative w-full aspect-square max-w-lg rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-950 border transition-all duration-500 shadow-2xl overflow-hidden flex flex-col items-center justify-center group"
      style={{ borderColor: selectedVariant.theme.accentColor + '50' }}
    >
      {/* 3D Atmospheric Background Glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${selectedVariant.theme.accentColor} 0%, transparent 70%)`
        }}
      />

      {/* Top 3D Control Bar Header */}
      <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between">
        <span className="px-3 py-1 rounded-xl bg-zinc-950/80 backdrop-blur-md text-white border border-zinc-800 text-xs font-bold flex items-center gap-1.5 shadow-lg">
          <Rotate3d className="w-4 h-4 animate-spin text-amber-400" style={{ animationDuration: '8s' }} />
          <span>مسرح العرض 3D التفاعلي 360°</span>
        </span>

        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-1 border backdrop-blur-md ${
            isAutoRotating
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-zinc-800 text-zinc-300 border-zinc-700'
          }`}
        >
          <Move3d className="w-3.5 h-3.5" />
          <span>{isAutoRotating ? 'دوران 3D تلقائي' : 'دوران يدوي'}</span>
        </button>
      </div>

      {/* THREE.JS WebGL 3D STAGE CANVAS */}
      {is3DCanvasReady ? (
        <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
          <Canvas
            camera={{ position: [0, 0, 4.2], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            onError={() => setIs3DCanvasReady(false)}
          >
            {/* Ambient & Spotlight react to shoe theme color */}
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} color={selectedVariant.theme.accentColor} />
            <pointLight position={[-5, -5, -2]} intensity={0.8} color="#ffffff" />

            <Suspense fallback={null}>
              <ShoeDisplayMesh
                imageSrc={activeImage}
                accentColor={selectedVariant.theme.accentColor}
                is3DRotating={isAutoRotating}
              />

              {/* Dynamic 3D Floating Particles */}
              <Sparkles
                count={35}
                scale={4}
                size={3}
                speed={0.4}
                opacity={0.6}
                color={selectedVariant.theme.accentColor}
              />

              {/* Realtime Contact Shadow on Floor */}
              <ContactShadows
                position={[0, -1.5, 0]}
                opacity={0.7}
                scale={5}
                blur={2.5}
                far={4}
                color="#000000"
              />
            </Suspense>

            {/* OrbitControls for 360 rotation & zoom */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.8}
              rotateSpeed={0.8}
            />
          </Canvas>

          {/* Interactive Drag Guidance Overlay */}
          <div className="absolute bottom-16 inset-x-0 pointer-events-none flex justify-center z-10">
            <span className="px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5 shadow-xl animate-pulse">
              <Move3d className="w-3.5 h-3.5 text-amber-400" />
              <span>حرك إصبعك أو الماوس للدوران والمعاينة من كل الزوايا 360°</span>
            </span>
          </div>
        </div>
      ) : (
        /* Fallback 2D Image with 3D Depth CSS Tilt if WebGL unavailable */
        <div className="w-full h-full flex items-center justify-center p-6">
          <img
            src={activeImage}
            alt={selectedVariant.arabicName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
          />
        </div>
      )}

      {/* Floating Discount Badge */}
      <div className="absolute top-16 right-4 z-20 flex flex-col items-end">
        <span className="px-3 py-1 rounded-xl bg-red-600 text-white font-black text-xs sm:text-sm shadow-xl tracking-wider animate-bounce">
          -{selectedVariant.discountPercentage}% خصم 3D
        </span>
      </div>

    </div>
  );
};
