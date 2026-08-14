import React from 'react';
import { MessageCircle } from 'lucide-react';
import { ProductVariant } from '../types';

interface WhatsAppFloatingButtonProps {
  selectedVariant: ProductVariant;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  selectedVariant
}) => {
  const whatsappUrl = `https://wa.me/212600000000?text=${encodeURIComponent(
    `السلام عليكم، بغيت نطلب حذاء ${selectedVariant.arabicName} العرض الخاص 399 درهم. واش متوفر فـ المقاس ديالي؟`
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border border-emerald-400/40"
      aria-label="تواصل عبر الواتساب"
    >
      <MessageCircle className="w-6 h-6 text-white animate-pulse" />
      <span className="hidden sm:inline font-bold text-xs sm:text-sm">
        طلب مباشر عبر الواتساب
      </span>
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-300"></span>
      </span>
    </a>
  );
};
