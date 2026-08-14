import React, { useState, useEffect } from 'react';
import { ShoppingBag, MessageCircle, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { ProductVariant } from '../types';

interface HeaderNavbarProps {
  selectedVariant: ProductVariant;
  onOrderClick: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  selectedVariant,
  onOrderClick
}) => {
  const [tickerIndex, setTickerIndex] = useState(0);

  const TIKERS = [
    '🚚 توصيل فابور لجميع المدن المغربية والدفع بعد المعاينة كاش',
    '⚡ العرض المحدود: 399 درهم عوض 699 درهم - خصم 43% اليوم!',
    '🔥 أكثر من 480 زبون مغربي قيّمو الحذاء بـ 4.9/5 نجوم',
    '🎁 عرض خاص: عند شراء 2 أزواج كتاخد خصم إضافي ديال 100 درهم!'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TIKERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [TIKERS.length]);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-zinc-950/85 border-b border-zinc-800/80 transition-colors duration-500">
      {/* Top Ticker Bar */}
      <div 
        className="w-full py-1.5 px-4 text-center text-xs sm:text-sm font-medium transition-colors duration-500 overflow-hidden text-zinc-900 font-bold"
        style={{ backgroundColor: selectedVariant.theme.accentColor }}
      >
        <div className="flex items-center justify-center gap-2 animate-fade-in">
          <span>{TIKERS[tickerIndex]}</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-black text-xl sm:text-2xl text-zinc-950 shadow-lg transition-transform duration-300 hover:scale-105"
            style={{ backgroundColor: selectedVariant.theme.accentColor }}
          >
            S&S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight">SPEZIAL & SAMBA</span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-zinc-800 text-amber-400 border border-amber-500/30">
                المغرب MA
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-medium hidden sm:block">
              المتجر المغربي الرسمي للأحذية الكلاسيكية الفاخرة
            </p>
          </div>
        </div>

        {/* Center Trust Badges (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 text-xs text-zinc-300">
          <div className="flex items-center gap-2 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-zinc-800">
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>توصيل مجاني 24h-48h</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-zinc-800">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>الدفع عند الاستلام COD</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://wa.me/212600000000?text=%D8%B3%D9%84%D8%A7%D9%85%20%D8%A8%D8%BA%D9%8A%D8%AA%20%D9%86%D8%B3%D9%88%D9%84%20%D8%B9%D9%84%D9%89%20%D8%AD%D8%B0%D8%A7%D8%A1%20Spezial%20/%20Samba"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30 transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span className="hidden xs:inline">واتساب</span>
          </a>

          <button
            onClick={onOrderClick}
            className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 transform active:scale-95 shadow-lg ${selectedVariant.theme.primaryBtnClass}`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>اطلب الآن (399 د.م)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
