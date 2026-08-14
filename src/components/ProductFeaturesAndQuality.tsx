import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  ThumbsUp, 
  CheckCircle2, 
  PackageCheck,
  Heart,
  Footprints
} from 'lucide-react';
import { ProductVariant } from '../types';

interface ProductFeaturesAndQualityProps {
  selectedVariant: ProductVariant;
}

export const ProductFeaturesAndQuality: React.FC<ProductFeaturesAndQualityProps> = ({
  selectedVariant
}) => {
  const TRUST_POINTS = [
    {
      icon: <Footprints className="w-6 h-6 text-amber-400" />,
      title: 'جلد وشمواه حر ممتاز 100%',
      desc: 'تمت صناعة الحذاء بأجود أنواع الجلد والشمواه الطبيعي الناعم المقاوم للخدش والاتساخ مع لمسة فاخرة تتناسب مع أرقى الملابس.'
    },
    {
      icon: <PackageCheck className="w-6 h-6 text-emerald-400" />,
      title: 'الدفع بعد المعاينة والتجريب',
      desc: 'عندك الحق الكامل تفتح الكارتونة وتجرب الصباط وتقلب الخياطة والجلد بيديك قبل ما تخلص الموزع بأي درهم. ثقة وأمان 100%.'
    },
    {
      icon: <Truck className="w-6 h-6 text-blue-400" />,
      title: 'توصيل مجاني وسريع حتال باب الدار',
      desc: 'فريق التوصيل ديالنا متواجد فجميع مدن وقرى المغرب (24 إلى 48 ساعة أقصى حد). اتصل بك الموزع قبل الوصول للدار.'
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-indigo-400" />,
      title: 'ضمان التبديل المجاني للمقاس',
      desc: 'جاك المقاس كبر أو صغر؟ ما كاين حتى شي مشكل! كاين فريق خدمة العملاء كايصيفط ليك المقاس المناسب كايوصلك حتال الدار يبدلو ليك مجاناً.'
    }
  ];

  return (
    <section className="py-12 sm:py-20 relative bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span 
            className="inline-block px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 border"
            style={{
              backgroundColor: selectedVariant.theme.accentColor + '15',
              borderColor: selectedVariant.theme.accentColor + '40',
              color: selectedVariant.theme.accentColor
            }}
          >
            ضمان الجودة والثقة بالمغرب
          </span>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
            علاش كلشي كايختار Spezial و Samba OG من المتجر ديالنا؟
          </h2>

          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            نضمن لك تجربة تسوق آمنة، وممتعة بدون أي مخاطرة من لحظة طلبك حتى وصول المنتج لباب دارك.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_POINTS.map((pt, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between group hover:bg-zinc-900 shadow-xl"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {pt.icon}
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {pt.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {pt.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>مضمون 100% بالمغرب</span>
              </div>
            </div>
          ))}
        </div>

        {/* Unboxing & Guarantee Highlight Box */}
        <div className="mt-12 p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-right">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>تسوق وبادئ الأمر بدون أي خوف</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              عند وصول الموزع: افتح الكارتونة، جرب الحذاء، وقلب الخياطة!
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl">
              لا تدفع أي درهم حتى تتأكد بنفسك من جودة الحذاء ومطابقته التامة للصور والمقاس الذي اخترته.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => {
                const formEl = document.getElementById('order-form-section');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm shadow-xl transition-all transform active:scale-95"
            >
              اطلب الآن كاش والدفع بعد المعاينة 🚚
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
