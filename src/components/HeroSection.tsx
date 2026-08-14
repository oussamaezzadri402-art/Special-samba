import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Zap, 
  Flame, 
  ChevronLeft,
  Eye,
  Check
} from 'lucide-react';
import { ProductVariant } from '../types';

interface HeroSectionProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
  onOrderClick: () => void;
  selectedSize: number;
  onSelectSize: (size: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  variants,
  selectedVariant,
  onSelectVariant,
  onOrderClick,
  selectedSize,
  onSelectSize
}) => {
  const [activeImage, setActiveImage] = useState<string>(selectedVariant.image);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });
  const [viewingCount, setViewingCount] = useState<number>(34);

  // Sync active image when selected variant changes
  useEffect(() => {
    setActiveImage(selectedVariant.image);
  }, [selectedVariant]);

  // Dynamic countdown timer for offer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 5, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate active viewers for conversion pressure
  useEffect(() => {
    const interval = setInterval(() => {
      setViewingCount(Math.floor(Math.random() * 15) + 28);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] py-8 sm:py-14 overflow-hidden transition-all duration-700">
      {/* DYNAMIC ATMOSPHERIC BACKGROUND REACTING TO COLOR SELECTION */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000 opacity-80"
        style={{ background: selectedVariant.theme.heroBgOverlay }}
      />

      {/* Floating Ambient Glowing Orbs */}
      <div 
        className="absolute top-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-[110px] pointer-events-none transition-all duration-1000 animate-pulse-slow"
        style={{ backgroundColor: selectedVariant.theme.accentGlow }}
      />
      <div 
        className="absolute bottom-10 left-10 w-60 sm:w-80 h-60 sm:h-80 rounded-full blur-[100px] pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: selectedVariant.theme.accentGlow }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Moroccan Banner Trust Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-800/60 text-xs sm:text-sm text-zinc-300">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400">متوفر الآن فـ المخزون بالمغرب</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-zinc-400" /> {viewingCount} واحد كايشوف هاد الصفحة دابا
            </span>
          </div>

          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>4.9/5</span>
            <span className="text-zinc-400 font-normal">(482+ تقييم زبون مغربي)</span>
          </div>
        </div>

        {/* Main Grid: Shoe Showcase + Order Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT/RIGHT COLUMN (RTL): Product Visual Stage & Color Palette Picker */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Color Atmosphere Notification Tag */}
            <motion.div
              key={`tag-${selectedVariant.id}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md shadow-lg ${selectedVariant.theme.badgeBg} ${selectedVariant.theme.badgeText}`}
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{selectedVariant.badge}</span>
              <span className="text-zinc-500">•</span>
              <span>{selectedVariant.colorNameDarija}</span>
            </motion.div>

            {/* Main Interactive Product Image Card */}
            <div className="relative w-full max-w-lg aspect-square rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 p-4 sm:p-8 border transition-all duration-500 shadow-2xl flex flex-col items-center justify-center group overflow-hidden"
              style={{ borderColor: selectedVariant.theme.accentColor + '50' }}
            >
              {/* Dynamic Accent Lighting Ring */}
              <div 
                className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-700 opacity-20 group-hover:opacity-40"
                style={{ 
                  boxShadow: `inset 0 0 60px ${selectedVariant.theme.accentColor}`,
                  border: `1px solid ${selectedVariant.theme.accentColor}`
                }}
              />

              {/* Discount Stamp Badge */}
              <div className="absolute top-4 right-4 z-10 flex flex-col items-end">
                <span className="px-3 py-1 rounded-xl bg-red-600 text-white font-black text-xs sm:text-sm shadow-lg tracking-wider animate-bounce">
                  -{selectedVariant.discountPercentage}% خصم
                </span>
                <span className="text-[10px] text-zinc-400 font-semibold mt-1 bg-zinc-950/80 px-2 py-0.5 rounded-md border border-zinc-800">
                  عرض خاص اليوم
                </span>
              </div>

              {/* Model Tag Overlay */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-xl bg-zinc-900/90 text-zinc-200 border border-zinc-800 text-xs font-bold">
                  {selectedVariant.modelName}
                </span>
              </div>

              {/* Animated Product Showcase Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.95, rotate: 3 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full h-full flex items-center justify-center p-2"
                >
                  <img
                    src={activeImage}
                    alt={selectedVariant.arabicName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Interactive Thumbnail Angle Switcher */}
              <div className="absolute bottom-4 inset-x-4 flex justify-center gap-2 z-10">
                {selectedVariant.secondaryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-12 h-12 rounded-xl border-2 overflow-hidden bg-zinc-900 transition-all duration-200 ${
                      activeImage === img
                        ? 'scale-110 shadow-lg'
                        : 'opacity-60 hover:opacity-100 border-zinc-800'
                    }`}
                    style={{
                      borderColor: activeImage === img ? selectedVariant.theme.accentColor : undefined
                    }}
                  >
                    <img src={img} alt="Angle view" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* COLOR VARIATION PICKER - SPECIAL INTERACTION REQUIREMENT */}
            <div className="w-full max-w-lg mt-6 bg-zinc-900/90 p-4 sm:p-5 rounded-2xl border border-zinc-800/80 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: selectedVariant.theme.accentColor }} />
                  <span className="text-xs sm:text-sm font-bold text-zinc-100">
                    اختر اللون المفضل (تتغير خلفية وأجواء الصفحة فوراً):
                  </span>
                </div>
                <span className="text-xs font-bold text-zinc-400">
                  5 ألوان متوفرة
                </span>
              </div>

              {/* Responsive Color Switch Buttons */}
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {variants.map((variant) => {
                  const isSelected = variant.id === selectedVariant.id;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => onSelectVariant(variant)}
                      className={`relative flex flex-col items-center p-2 rounded-xl border transition-all duration-300 transform active:scale-95 ${
                        isSelected
                          ? 'bg-zinc-800 border-2 shadow-xl scale-105'
                          : 'bg-zinc-950/60 border-zinc-800/80 hover:bg-zinc-800/50 hover:border-zinc-700'
                      }`}
                      style={{
                        borderColor: isSelected ? variant.theme.accentColor : undefined
                      }}
                    >
                      {/* Color Circle Swatch */}
                      <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-zinc-700 mb-1 shadow-inner">
                        <img 
                          src={variant.image} 
                          alt={variant.colorNameDarija} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white font-bold" />
                          </div>
                        )}
                      </div>

                      <span className="text-[10px] sm:text-xs font-semibold text-center text-zinc-300 line-clamp-1">
                        {variant.colorNameDarija.split('/')[0]}
                      </span>

                      {/* Low Stock Indicator Dot */}
                      {variant.stockLeft <= 5 && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-zinc-950 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Styling Tip in Darija */}
              <motion.div 
                key={`tip-${selectedVariant.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3.5 p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs text-zinc-300 flex items-start gap-2"
              >
                <span className="text-sm">💬</span>
                <p className="leading-relaxed">{selectedVariant.stylingTipDarija}</p>
              </motion.div>
            </div>

          </div>

          {/* RIGHT COLUMN (RTL): Product Copy, Value Proposition, Size Picker & Order Action */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* Title & Brand Headline in Darija */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-400">
                  {selectedVariant.modelName} Collection 2026
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> سلعة مريڤلة 100%
                </span>
              </div>

              <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-snug tracking-tight break-words">
                {selectedVariant.arabicName}
              </h1>

              <p className="mt-2 text-sm text-zinc-300 leading-relaxed font-normal">
                {selectedVariant.tagline}
              </p>
            </div>

            {/* Price & Offer Highlight Box */}
            <div 
              className="p-4 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900 border transition-colors duration-500 mb-5 shadow-xl"
              style={{ borderColor: selectedVariant.theme.accentColor + '50' }}
            >
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-zinc-400 font-medium block">ثمن العرض الترويجي:</span>
                  <div className="flex items-baseline gap-2">
                    <span 
                      className="text-3xl sm:text-4xl font-black text-white tracking-tight"
                      style={{ color: selectedVariant.theme.accentColor }}
                    >
                      399
                    </span>
                    <span className="text-xl font-bold text-white">درهم</span>
                    <span className="text-sm text-zinc-500 line-through mr-2">699 د.م</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-extrabold border border-emerald-500/30">
                    توصيل فابور 0 د.م
                  </span>
                  <span className="text-[11px] text-zinc-400 block mt-1">الدفع كاش عند الاستلام</span>
                </div>
              </div>

              {/* Countdown Timer Bar */}
              <div className="mt-3.5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <Clock className="w-3.5 h-3.5 animate-pulse" />
                  <span>ينتهي العرض الخاص في:</span>
                </div>
                <div className="flex items-center gap-1 font-mono font-bold text-white dir-ltr">
                  <span className="bg-zinc-800 px-2 py-0.5 rounded text-amber-400">0{timeLeft.hours}</span>:
                  <span className="bg-zinc-800 px-2 py-0.5 rounded text-amber-400">{timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}</span>:
                  <span className="bg-zinc-800 px-2 py-0.5 rounded text-amber-400">{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</span>
                </div>
              </div>
            </div>

            {/* QUICK SIZE SELECTOR */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-bold text-zinc-200">
                  اختر مقاسك (المقاسات المغربية العادية Standard):
                </span>
                <span className="text-xs text-amber-400 font-semibold cursor-pointer underline">
                  جدول المقاسات
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
                {selectedVariant.availableSizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => onSelectSize(sz)}
                      className={`py-2.5 px-1 sm:px-2 rounded-xl text-xs sm:text-sm font-extrabold border transition-all duration-200 active:scale-95 ${
                        isSelected
                          ? 'bg-zinc-100 text-zinc-950 border-white shadow-lg scale-105'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800'
                      }`}
                      style={{
                        borderColor: isSelected ? selectedVariant.theme.accentColor : undefined,
                        backgroundColor: isSelected ? selectedVariant.theme.accentColor : undefined,
                        color: isSelected ? '#09090b' : undefined
                      }}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>

              {/* Stock urgency note */}
              <div className="mt-2 flex items-center gap-1.5 text-xs text-red-400 font-semibold">
                <Flame className="w-3.5 h-3.5 fill-red-400" />
                <span>متبقي فقط {selectedVariant.stockLeft} حبات من هذا المقاس واللون بالمخزون!</span>
              </div>
            </div>

            {/* Features Bullets in Darija */}
            <div className="space-y-2 mb-6">
              {selectedVariant.featuresDarija.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* High Impact Primary Conversion CTA */}
            <div className="space-y-3">
              <button
                onClick={onOrderClick}
                className={`w-full py-4 rounded-2xl text-base sm:text-lg font-black transition-all duration-300 transform active:scale-98 shadow-2xl flex items-center justify-center gap-3 animate-cta-pulse ${selectedVariant.theme.primaryBtnClass}`}
              >
                <Zap className="w-5 h-5 fill-current animate-bounce" />
                <span>طلب الآن - الدفع عند المعاينة والاستلام (399 د.م)</span>
              </button>

              {/* Guarantee badges bar */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] sm:text-xs text-center text-zinc-400">
                <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="block font-bold text-zinc-200">🚚 توصيل مجاني</span>
                  <span>لجميع مدن المغرب</span>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="block font-bold text-zinc-200">🔍 معاينة قبل الدفع</span>
                  <span>جرب وقلب عاد خلص</span>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="block font-bold text-zinc-200">🔄 تبديل المقاس</span>
                  <span>مجاني خلال 7 أيام</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

