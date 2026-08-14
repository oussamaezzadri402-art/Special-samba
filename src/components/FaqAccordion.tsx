import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export const FaqAccordion: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const FAQS = [
    {
      q: 'كيفاش كايتم التوصيل والدفع؟',
      a: 'التوصيل مجاني 100% لجميع مدن المغرب. كاتعمر معلوماتك فالموقع، كايتصل بك الموزع على رقم تليفونك، وكايوصلك الحذاء حتال باب الدار فـ 24 إلى 48 ساعة. والدفع كايتم نقداً (كاش) بعد ما تتسلم طلبك وتجربو.'
    },
    {
      q: 'واش نقدر نفتح الكارتونة ونقلب الصباط قبل ما نخلص؟',
      a: 'نعم بكل تأكيد! هاد الحق كايضمنو لك المتجر ديالنا 100%. كاتفتَح الكارتونة مع الموزع، كتقلب الجلد، الخياطة والمقاس بيدك وتجربو فـ رجلك، عاد كاتخلص الموزع بأمان تام.'
    },
    {
      q: 'شنو ندير إذا جاني المقاس كبر أو صغر فـ رجلي؟',
      a: 'كاين ضمان التبديل المجاني خلال 7 أيام! إذا لقيتي المقاس ماشي هداك، اتصل بينا مباشر عبر الواتساب، وغادي يصيفط ليك الموزع المقاس المناسب يبدلو ليك حتال باب الدار بدون ما تخلص حتى درهم إضافي.'
    },
    {
      q: 'شحال كاياخد الوقت باش توصلني السلعة؟',
      a: 'بالنسبة للمدن الكبرى (الدار البيضاء، الرباط، مراكش، طنجة، فاس، مكناس، أكادير): التوصيل فـ 24 ساعة. بالنسبة لباقي المدن والجهات: فـ 48 ساعة أقصى حد.'
    },
    {
      q: 'كيفاش نعرف المقاس المناسب ليا؟',
      a: 'المقاسات ديالنا هي المقاسات المغربية العادية المعتمدة (Standard Sizing). خذ المقاس العادي اللي كتلبسو فجميع أحذيتك اليومية (من 36 حتى لـ 45).'
    }
  ];

  return (
    <section className="py-12 sm:py-20 relative bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-300 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>الأسئلة الشائعة والمعلومات</span>
          </span>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            كل ما تحتاجه لمعرفته قبل طلب الحذاء
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-zinc-900/80 border border-zinc-800/80 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-right font-extrabold text-sm sm:text-base text-white flex items-center justify-between gap-4 hover:bg-zinc-800/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/50 bg-zinc-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
