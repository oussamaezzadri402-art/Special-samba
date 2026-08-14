import React from 'react';
import { ShieldCheck, Truck, RotateCcw, MessageCircle, Phone, MapPin } from 'lucide-react';
import { ProductVariant } from '../types';

interface FooterSectionProps {
  selectedVariant: ProductVariant;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ selectedVariant }) => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 py-12 pb-24 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl font-black text-xl text-zinc-950 flex items-center justify-center shadow-lg"
                style={{ backgroundColor: selectedVariant.theme.accentColor }}
              >
                S&S
              </div>
              <span className="font-black text-lg text-white">SPEZIAL & SAMBA MA</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              المتجر المغربي المعتمد لبيع وتوصيل الأحذية الكلاسيكية الفاخرة بأعلى جودة وثمن مناسب مع خدمة التوصيل الفابور لجميع مدن المملكة.
            </p>
          </div>

          {/* Col 2: Guarantees */}
          <div className="space-y-2 text-xs">
            <span className="font-extrabold text-sm text-white block mb-2">ضماناتنا للزبناء:</span>
            <div className="flex items-center gap-2 text-zinc-300">
              <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>توصيل مجاني 0 د.م لجميع المدن</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>الدفع بعد المعاينة والتجريب</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <RotateCcw className="w-4 h-4 text-blue-400 shrink-0" />
              <span>تبديل المقاس مجاني خلال 7 أيام</span>
            </div>
          </div>

          {/* Col 3: Delivery Regions */}
          <div className="space-y-2 text-xs">
            <span className="font-extrabold text-sm text-white block mb-2">مناطق التوصيل السريع:</span>
            <p className="text-zinc-400 leading-relaxed">
              الدار البيضاء • الرباط • مراكش • طنجة • فاس • مكناس • أكادير • وجدة • الناظور • تطوان • العيون • جميع القرى والمدن.
            </p>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-2 text-xs">
            <span className="font-extrabold text-sm text-white block mb-2">خدمة العملاء والواتساب:</span>
            <div className="flex items-center gap-2 text-zinc-300">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>المقر والمستودع: الدار البيضاء، المغرب</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="dir-ltr">+212 6 00 00 00 00</span>
            </div>
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-600/30 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>تواصل مباشر عبر الواتساب</span>
            </a>
          </div>

        </div>

        <div className="pt-8 border-t border-zinc-800 text-center text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Spezial & Samba OG Store Morocco. جميع الحقوق محفوظة.</p>
          <p className="text-[11px] text-zinc-400">
            تصميم وتنفيذ منصة هبوط بريميوم مخصصة للتجارة الإلكترونية بالمغرب 🇲🇦
          </p>
        </div>

      </div>
    </footer>
  );
};
