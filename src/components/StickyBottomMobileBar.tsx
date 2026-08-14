import React from 'react';
import { Zap } from 'lucide-react';
import { ProductVariant } from '../types';
import { PACK_OPTIONS } from '../data/products';

interface StickyBottomMobileBarProps {
  selectedVariant: ProductVariant;
  selectedPack?: 'single' | 'double' | 'triple';
  onOrderClick: () => void;
}

export const StickyBottomMobileBar: React.FC<StickyBottomMobileBarProps> = ({
  selectedVariant,
  selectedPack = 'single',
  onOrderClick
}) => {
  const currentPackOption = PACK_OPTIONS.find((p) => p.id === selectedPack) || PACK_OPTIONS[0];

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-zinc-950/95 border-t border-zinc-800 p-2.5 backdrop-blur-lg shadow-2xl">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        
        {/* Selected Variant Thumb & Price */}
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-11 h-11 rounded-lg bg-zinc-900 border border-zinc-800 p-0.5 shrink-0">
            <img src={selectedVariant.image} alt={selectedVariant.arabicName} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>

          <div className="overflow-hidden">
            <span className="text-xs font-black text-white truncate block">{selectedVariant.modelName}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-extrabold text-amber-400">{currentPackOption.price} د.م</span>
              <span className="text-[10px] text-zinc-500 line-through">{currentPackOption.originalPrice} د.م</span>
            </div>
          </div>
        </div>

        {/* Big Mobile Action CTA */}
        <button
          onClick={onOrderClick}
          className={`py-2.5 px-5 rounded-xl text-xs font-black shadow-lg flex items-center gap-1.5 shrink-0 animate-cta-pulse ${selectedVariant.theme.primaryBtnClass}`}
        >
          <Zap className="w-4 h-4 fill-current animate-bounce" />
          <span>طلب الآن (كاش)</span>
        </button>

      </div>
    </div>
  );
};
