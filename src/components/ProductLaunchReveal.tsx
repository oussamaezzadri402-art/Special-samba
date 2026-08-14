import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductVariant } from '../types';

interface ProductLaunchRevealProps {
  selectedVariant: ProductVariant;
  onRevealComplete?: () => void;
}

export const ProductLaunchReveal: React.FC<ProductLaunchRevealProps> = ({
  selectedVariant,
  onRevealComplete
}) => {
  // Reveal Stages:
  // 'dark' (0-0.8s) -> 'sweep' (0.8-2.2s) -> 'details' (2.2-3.6s) -> 'hero' (3.6-4.5s) -> 'transition' (4.5-4.8s) -> 'done' (>4.8s)
  const [stage, setStage] = useState<'dark' | 'sweep' | 'details' | 'hero' | 'transition' | 'done'>('dark');
  const startTimeRef = useRef<number>(0);
  const onRevealCompleteRef = useRef(onRevealComplete);

  useEffect(() => {
    onRevealCompleteRef.current = onRevealComplete;
  }, [onRevealComplete]);

  useEffect(() => {
    startTimeRef.current = Date.now();

    // Lock page scroll during initial reveal
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Check for prefers-reduced-motion
    const hasReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasReducedMotion) {
      // Simplified 2-second reveal for reduced motion
      setStage('hero');
      const quickTimer = setTimeout(() => {
        setStage('done');
        document.body.style.overflow = originalOverflow;
        if (onRevealCompleteRef.current) onRevealCompleteRef.current();
      }, 2000);

      return () => {
        clearTimeout(quickTimer);
        document.body.style.overflow = originalOverflow;
      };
    }

    // Full 4.8s Cinematic Sequence
    const t1 = setTimeout(() => setStage('sweep'), 800);
    const t2 = setTimeout(() => setStage('details'), 2200);
    const t3 = setTimeout(() => setStage('hero'), 3600);
    const t4 = setTimeout(() => setStage('transition'), 4500);
    const t5 = setTimeout(() => {
      setStage('done');
      document.body.style.overflow = originalOverflow;
      if (onRevealCompleteRef.current) onRevealCompleteRef.current();
    }, 4850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Prevent click-to-skip during the first 3 seconds
  const handleSkip = () => {
    if (Date.now() - startTimeRef.current < 3000) return;
    setStage('done');
    document.body.style.overflow = '';
    if (onRevealCompleteRef.current) onRevealCompleteRef.current();
  };

  if (stage === 'done') {
    return null;
  }

  const accentColor = selectedVariant.theme.accentColor || '#D4A359';

  return (
    <AnimatePresence>
      <motion.div
        key="product-launch-reveal-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === 'transition' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        onClick={handleSkip}
        className="fixed inset-0 w-screen h-screen z-[999999] overflow-hidden bg-black flex items-center justify-center select-none"
      >
          {/* Deep Dark Atmosphere with Accent Glow */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
            style={{
              opacity: stage === 'hero' || stage === 'transition' ? 0.45 : stage === 'details' ? 0.2 : 0.05,
              background: `radial-gradient(circle at 50% 50%, ${accentColor} 0%, transparent 65%)`
            }}
          />

          {/* Vignette Edge Shading */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_#000000_100%)] pointer-events-none" />

          {/* SNEAKER DISPLAY CONTAINER WITH CAMERA PUSH-IN */}
          <motion.div
            initial={{ scale: 0.88, y: 12 }}
            animate={
              stage === 'hero' || stage === 'transition'
                ? { scale: 1.15, y: -6 }
                : stage === 'details'
                ? { scale: 1.02, y: 0 }
                : { scale: 0.92, y: 8 }
            }
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg aspect-square p-6 sm:p-10 flex items-center justify-center overflow-hidden"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* 1. Base Dark Silhouette Layer */}
              <img
                src={selectedVariant.image}
                alt={selectedVariant.arabicName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter brightness-[0.06] contrast-[2] drop-shadow-[0_20px_30px_rgba(0,0,0,0.98)]"
              />

              {/* 2. Narrow Light Beam Sweep Layer */}
              {(stage === 'sweep' || stage === 'details' || stage === 'hero' || stage === 'transition') && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: stage === 'hero' || stage === 'transition' ? 0 : 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                >
                  <motion.div
                    initial={{ x: '-130%', y: '-60%', rotate: -25 }}
                    animate={{ x: '130%', y: '60%', rotate: -25 }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                    className="absolute inset-x-0 h-48 sm:h-64 opacity-90 blur-xl mix-blend-screen"
                    style={{
                      background: `linear-gradient(to bottom, transparent, ${accentColor}, #ffffff, ${accentColor}, transparent)`
                    }}
                  />
                </motion.div>
              )}

              {/* 3. Revealed Sneaker with Dynamic Lighting */}
              {(stage === 'details' || stage === 'hero' || stage === 'transition') && (
                <motion.div
                  initial={{ opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
                  animate={{
                    opacity: 1,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <img
                    src={selectedVariant.image}
                    alt={selectedVariant.arabicName}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-contain transition-all duration-1000 ${
                      stage === 'hero' || stage === 'transition'
                        ? 'filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)] brightness-105 contrast-105'
                        : 'filter brightness-90 contrast-125'
                    }`}
                  />
                </motion.div>
              )}

              {/* 4. Full Hero Explosion Light & Lens Flare */}
              {(stage === 'hero' || stage === 'transition') && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 0.85, scale: 1.4 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="absolute w-80 h-80 rounded-full blur-3xl pointer-events-none mix-blend-screen"
                    style={{ backgroundColor: accentColor }}
                  />

                  {/* Lens Flare Reflection Streak */}
                  <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    animate={{ opacity: [0, 0.8, 0], x: '100%' }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
                  />
                </>
              )}

            </div>
          </motion.div>
        </motion.div>
    </AnimatePresence>
  );
};
