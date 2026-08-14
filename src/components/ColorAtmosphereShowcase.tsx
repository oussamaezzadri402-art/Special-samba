import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Palette, Sparkles, Check, ChevronRight, Layers, Award } from 'lucide-react';
import { ProductVariant } from '../types';

interface ImageWithShimmerProps {
  src: string;
  alt: string;
  className?: string;
  accentColor?: string;
}

const ImageWithShimmer: React.FC<ImageWithShimmerProps> = ({
  src,
  alt,
  className = '',
  accentColor = '#D4A359'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-900/90 rounded-xl overflow-hidden flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          <div 
            className="w-16 h-16 rounded-full blur-xl opacity-25"
            style={{ backgroundColor: accentColor }}
          />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

interface ColorAtmosphereShowcaseProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

export const ColorAtmosphereShowcase: React.FC<ColorAtmosphereShowcaseProps> = ({
  variants,
  selectedVariant,
  onSelectVariant
}) => {
  return (
    <section className="py-12 sm:py-20 relative overflow-hidden bg-zinc-950/90 border-y border-zinc-800/80">
      {/* Background Accent Gradient reflecting selected variant */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${selectedVariant.theme.accentColor} 0%, transparent 70%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header in Darija */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div 
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold border mb-3 backdrop-blur-md"
            style={{
              backgroundColor: selectedVariant.theme.accentColor + '18',
              borderColor: selectedVariant.theme.accentColor + '50',
              color: selectedVariant.theme.accentColor
            }}
          >
            <Palette className="w-4 h-4" />
            <span>تجربة تفاعلية حصرية - اختر اللون وتغيّر أجواء الموقع</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
            تألق بألوان Spezial و Samba OG المصممة لعشاق الأناقة
          </h2>

          <p className="mt-3 text-sm sm:text-base text-zinc-400 font-normal">
            اختر لونك المفضل واستكشف التفاصيل
          </p>
        </div>

        {/* 5-Color Showcase Grid with dynamic active card highlighting */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {variants.map((variant) => {
            const isSelected = variant.id === selectedVariant.id;

            return (
              <motion.div
                key={variant.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelectVariant(variant)}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all duration-500 relative flex flex-col justify-between overflow-hidden group h-full ${
                  isSelected
                    ? 'bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 border-2 shadow-2xl scale-102'
                    : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
                style={{
                  borderColor: isSelected ? variant.theme.accentColor : undefined,
                  boxShadow: isSelected ? `0 12px 30px ${variant.theme.accentGlow}` : undefined
                }}
              >
                {/* Active Selection Glow Ring */}
                {isSelected && (
                  <div 
                    className="absolute top-0 right-0 left-0 h-1.5 transition-all duration-300"
                    style={{ backgroundColor: variant.theme.accentColor }}
                  />
                )}

                {/* Top Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: variant.theme.accentColor + '20',
                      borderColor: variant.theme.accentColor + '40',
                      color: variant.theme.accentColor
                    }}
                  >
                    {variant.badge}
                  </span>

                  {isSelected && (
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center text-zinc-950 font-black text-xs"
                      style={{ backgroundColor: variant.theme.accentColor }}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Product Image */}
                <div className="relative aspect-square w-full rounded-xl bg-zinc-950/80 p-3 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <ImageWithShimmer
                    src={variant.image}
                    alt={variant.arabicName}
                    accentColor={variant.theme.accentColor}
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                </div>

                {/* Info & Price */}
                <div>
                  <h3 className="font-bold text-sm text-white line-clamp-1 mb-1">
                    {variant.arabicName}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 mb-3">
                    {variant.colorNameDarija}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                    <div>
                      <span className="text-base font-black text-white" style={{ color: variant.theme.accentColor }}>
                        {variant.price} د.م
                      </span>
                      <span className="text-xs text-zinc-500 line-through mr-1">
                        {variant.originalPrice} د.م
                      </span>
                    </div>

                    <span 
                      className="text-xs font-bold px-2.5 py-1 rounded-lg transition-colors duration-200"
                      style={{
                        backgroundColor: isSelected ? variant.theme.accentColor : '#27272a',
                        color: isSelected ? '#09090b' : '#a1a1aa'
                      }}
                    >
                      {isSelected ? 'مُحدد الآن' : 'اختر'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Variant Detail Spotlight */}
        <div 
          className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border transition-all duration-700 shadow-2xl relative overflow-hidden"
          style={{ borderColor: selectedVariant.theme.accentColor + '50' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" style={{ color: selectedVariant.theme.accentColor }} />
                <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-400">
                  تفاصيل الجودة والجلد الأصلي
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white">
                {selectedVariant.arabicName} - {selectedVariant.colorNameDarija}
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {selectedVariant.descriptionDarija}
              </p>

              <div className="p-3 rounded-xl bg-zinc-950/90 border border-zinc-800 text-xs sm:text-sm text-amber-300 font-medium">
                {selectedVariant.stylingTipDarija}
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col items-center justify-center border-t md:border-t-0 md:border-r border-zinc-800 pt-4 md:pt-0">
              <div className="text-center mb-3">
                <span className="text-xs text-zinc-400 block">ثمن القطعة فـ العرض</span>
                <span className="text-3xl font-black text-white" style={{ color: selectedVariant.theme.accentColor }}>
                  399 درهم
                </span>
              </div>

              <button
                onClick={() => {
                  const formEl = document.getElementById('order-form-section');
                  if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full py-3 px-6 rounded-xl text-sm font-bold shadow-lg transition-all transform active:scale-95 ${selectedVariant.theme.primaryBtnClass}`}
              >
                تأكيد هاد اللون واطلب الآن 🛍️
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

