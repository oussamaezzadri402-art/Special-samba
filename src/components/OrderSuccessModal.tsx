import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Truck, MessageCircle, X, ShieldCheck, Clock } from 'lucide-react';
import { OrderData, ProductVariant } from '../types';

interface OrderSuccessModalProps {
  orderData: OrderData;
  selectedVariant: ProductVariant;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  orderData,
  selectedVariant,
  onClose
}) => {
  // Trigger confetti celebration on modal open
  useEffect(() => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback if canvas-confetti fails
    }
  }, []);

  const orderCode = `MA-${Math.floor(10000 + Math.random() * 90000)}`;

  const whatsappMessage = `سلام عليكم، أنا صيفطت طلبي رقم ${orderCode} لحذاء ${selectedVariant.arabicName} مقاس ${orderData.size}. الاسم: ${orderData.fullName}، المدينة: ${orderData.city}.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-zinc-900 border border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center relative shadow-2xl overflow-hidden dir-rtl">
        
        {/* Top Glow Accent */}
        <div 
          className="absolute top-0 inset-x-0 h-2"
          style={{ backgroundColor: selectedVariant.theme.accentColor }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-zinc-400 hover:text-white p-1 rounded-full bg-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Success Title in Darija */}
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
          تهانينا! تم تسجيل طلبك بنجاح 🎉
        </h2>

        <p className="text-xs sm:text-sm text-zinc-300 mb-6">
          شكراً لتقتك فـ المتجر ديالنا. سيتصل بك فريق التوصيل على الرقم <span className="font-bold text-amber-400 dir-ltr inline-block">{orderData.phone}</span> لتأكيد وقت الوصول.
        </p>

        {/* Order Details Card */}
        <div className="bg-zinc-950 p-4 sm:p-5 rounded-2xl border border-zinc-800 text-xs sm:text-sm text-zinc-300 text-right space-y-2 mb-6">
          <div className="flex justify-between border-b border-zinc-800/80 pb-2">
            <span>رقم الطلب الخاص بك:</span>
            <span className="font-mono font-bold text-amber-400">{orderCode}</span>
          </div>

          <div className="flex justify-between">
            <span>المنتج:</span>
            <span className="font-bold text-white">{selectedVariant.arabicName}</span>
          </div>

          <div className="flex justify-between">
            <span>المقاس المختارات:</span>
            <span className="font-bold text-white">مقاس {orderData.size}</span>
          </div>

          <div className="flex justify-between">
            <span>المدينة والوجهة:</span>
            <span className="font-bold text-white">{orderData.city}</span>
          </div>

          <div className="flex justify-between border-t border-zinc-800/80 pt-2 text-sm font-extrabold text-white">
            <span>طريقة الدفع والتأكيد:</span>
            <span className="text-emerald-400">الدفع نقداً عند الاستلام والمعاينة</span>
          </div>
        </div>

        {/* Estimated Delivery Banner */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-2 mb-6">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>التوصيل المتوقع لـ {orderData.city}: خلال 24 - 48 ساعة أقصى حد</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href={`https://wa.me/212679998628?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>تتبع الطلب مباشرة عبر الواتساب</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-colors"
          >
            العودة للصفحة الرئيسية
          </button>
        </div>

      </div>
    </div>
  );
};
