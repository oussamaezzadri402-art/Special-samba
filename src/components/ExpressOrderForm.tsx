import React, { useState } from 'react';
import { 
  ShoppingBag, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  User, 
  Phone, 
  MapPin, 
  Check, 
  Sparkles, 
  Gift, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { ProductVariant, PackOption, OrderData } from '../types';
import { PACK_OPTIONS, MOROCCAN_CITIES } from '../data/products';

interface ExpressOrderFormProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
  selectedSize: number;
  onSelectSize: (size: number) => void;
  selectedPack?: 'single' | 'double';
  onSelectPack?: (pack: 'single' | 'double') => void;
  onSubmitOrder: (data: OrderData) => void;
}

export const ExpressOrderForm: React.FC<ExpressOrderFormProps> = ({
  variants,
  selectedVariant,
  onSelectVariant,
  selectedSize,
  onSelectSize,
  selectedPack: propSelectedPack,
  onSelectPack,
  onSubmitOrder
}) => {
  // Form State
  const [internalPack, setInternalPack] = useState<'single' | 'double'>('single');
  const selectedPack = propSelectedPack !== undefined ? propSelectedPack : internalPack;

  const handlePackSelect = (packId: 'single' | 'double') => {
    setInternalPack(packId);
    if (onSelectPack) {
      onSelectPack(packId);
    }
  };

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(MOROCCAN_CITIES[0]);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Secondary pair selections for packs
  const [secondVariantId, setSecondVariantId] = useState<string>(variants[1]?.id || variants[0].id);
  const [secondSize, setSecondSize] = useState<number>(41);

  const secondVariant = variants.find((v) => v.id === secondVariantId) || variants[1] || variants[0];

  // Validation state
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; city?: string }>({});

  const currentPackOption = PACK_OPTIONS.find((p) => p.id === selectedPack) || PACK_OPTIONS[0];

  const handleValidationAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { fullName?: string; phone?: string; city?: string } = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'يرجى كتابة الاسم الكامل الصحيح';
    }

    // Moroccan phone check (starts with 06, 07, or 05, or +212, at least 9-10 digits)
    const phoneClean = phone.replace(/\s+/g, '');
    if (!phoneClean || phoneClean.length < 9) {
      newErrors.phone = 'يرجى كتابة رقم هاتف مغربي صحيح (مثال: 0612345678)';
    }

    if (!city) {
      newErrors.city = 'يرجى اختيار المدينة';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const orderData: OrderData = {
      fullName,
      phone: phoneClean,
      city,
      address,
      variantId: selectedVariant.id,
      size: selectedSize,
      packType: selectedPack,
      secondVariantId: selectedPack !== 'single' ? secondVariantId : undefined,
      secondSize: selectedPack !== 'single' ? secondSize : undefined,
      notes,
      createdAt: new Date().toISOString()
    };

    onSubmitOrder(orderData);
  };

  return (
    <section id="order-form-section" className="py-12 sm:py-20 relative bg-zinc-950 border-t border-zinc-800">
      
      {/* Dynamic Ambient Background Light */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${selectedVariant.theme.accentColor} 0%, transparent 70%)`
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-8 sm:mb-12">
          <span 
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 border"
            style={{
              backgroundColor: selectedVariant.theme.accentColor + '20',
              borderColor: selectedVariant.theme.accentColor + '50',
              color: selectedVariant.theme.accentColor
            }}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>استمارة الطلب السريع بالمغرب</span>
          </span>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            أمر الطلب أسهل مما تتوقع - الدفع كاش عند الاستلام!
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            عَبّئ معلوماتك أدناه، وسيتصل بك موزعنا لتأكيد الطلب وتوصيله حتال باب الدار.
          </p>
        </div>

        {/* Main Form Container */}
        <form onSubmit={handleValidationAndSubmit} className="space-y-8">
          
          {/* STEP 1: PACK SELECTION (1 Pair vs 2 Pairs Pack) */}
          <div className="bg-zinc-900/90 p-5 sm:p-7 rounded-3xl border border-zinc-800/80 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center font-black text-xs">1</span>
                <span>اختر عرض العبوة (Pack):</span>
              </span>
              <span className="text-xs text-amber-400 font-bold">توصيل مجاني لجميع العروض 🚚</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {PACK_OPTIONS.map((pack) => {
                const isSelected = selectedPack === pack.id;
                return (
                  <div
                    key={pack.id}
                    onClick={() => handlePackSelect(pack.id)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-zinc-800 border-2 shadow-xl scale-102'
                        : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-800/40'
                    }`}
                    style={{
                      borderColor: isSelected ? selectedVariant.theme.accentColor : undefined
                    }}
                  >
                    {pack.popular && (
                      <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-zinc-950 font-black text-[10px] shadow-lg">
                        الأكثر طلباً 🔥
                      </span>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-sm text-white">{pack.title}</span>
                        {isSelected && (
                          <div 
                            className="w-4 h-4 rounded-full flex items-center justify-center text-zinc-950 font-bold"
                            style={{ backgroundColor: selectedVariant.theme.accentColor }}
                          >
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-zinc-400 leading-snug mb-3">
                        {pack.subtitle}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-zinc-800 flex items-baseline justify-between">
                      <span className="text-lg font-black text-white" style={{ color: pack.id === selectedPack ? selectedVariant.theme.accentColor : undefined }}>
                        {pack.price} د.م
                      </span>
                      <span className="text-xs text-emerald-400 font-bold">
                        {pack.savings}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2: COLOR & SIZE SELECTION FOR FIRST PAIR */}
          <div className="bg-zinc-900/90 p-5 sm:p-7 rounded-3xl border border-zinc-800/80 backdrop-blur-md shadow-2xl">
            <span className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center font-black text-xs">2</span>
              <span>
                {selectedPack === 'single'
                  ? 'اختر لون ومقاس الحذاء:'
                  : 'اختر لون ومقاس الحذاء الأول والثاني:'}
              </span>
            </span>

            {/* Selected Color Visual Card for First Shoe */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-800 p-1 shrink-0">
                  <img src={selectedVariant.image} alt={selectedVariant.arabicName} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <span className="font-extrabold text-sm text-white block">{selectedVariant.arabicName}</span>
                  <span className="text-xs text-zinc-400 block">{selectedVariant.colorNameDarija}</span>
                  <span className="text-xs font-bold text-amber-400 mt-0.5 block">
                    {selectedPack === 'single' ? `${selectedVariant.price} درهم` : 'الحذاء الأول فـ العرض'}
                  </span>
                </div>
              </div>

              {/* Color Switcher Dropdown */}
              <div>
                <label className="text-xs text-zinc-400 block mb-1.5 font-bold">تغيير لون الحذاء الأول:</label>
                <select
                  value={selectedVariant.id}
                  onChange={(e) => {
                    const found = variants.find((v) => v.id === e.target.value);
                    if (found) onSelectVariant(found);
                  }}
                  className="w-full bg-zinc-900 text-white text-xs sm:text-sm font-bold p-3 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.arabicName} - ({v.colorNameDarija})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Size Selector Grid for First Shoe */}
            <div>
              <label className="text-xs sm:text-sm font-bold text-zinc-300 block mb-2">
                اختر مقاس الحذاء الأول (36 - 45):
              </label>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2.5">
                {selectedVariant.availableSizes.map((sz) => (
                  <button
                    type="button"
                    key={sz}
                    onClick={() => onSelectSize(sz)}
                    className={`py-2.5 px-1 sm:px-2 rounded-xl text-xs sm:text-sm font-black border transition-all active:scale-95 ${
                      selectedSize === sz
                        ? 'bg-amber-500 text-zinc-950 border-amber-400 scale-105 shadow-lg'
                        : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* SECOND PAIR OPTIONS IF PACK IS DOUBLE OR TRIPLE */}
            {selectedPack !== 'single' && (
              <div className="mt-6 pt-6 border-t border-zinc-800/80 space-y-4">
                <span className="text-sm sm:text-base font-extrabold text-amber-400 flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  <span>اختر لون ومقاس الحذاء الثاني (العرض المزدوج):</span>
                </span>

                {/* Selected Color Visual Card for Second Shoe */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-800 p-1 shrink-0">
                      <img src={secondVariant.image} alt={secondVariant.arabicName} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <span className="font-extrabold text-sm text-white block">{secondVariant.arabicName}</span>
                      <span className="text-xs text-zinc-400 block">{secondVariant.colorNameDarija}</span>
                      <span className="text-xs font-bold text-amber-400 mt-0.5 block">ضمن العرض المزدوج</span>
                    </div>
                  </div>

                  {/* Color Switcher Dropdown */}
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1.5 font-bold">تغيير لون الحذاء الثاني:</label>
                    <select
                      value={secondVariant.id}
                      onChange={(e) => setSecondVariantId(e.target.value)}
                      className="w-full bg-zinc-900 text-white text-xs sm:text-sm font-bold p-3 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {variants.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.arabicName} - ({v.colorNameDarija})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Size Selector Grid for Second Shoe */}
                <div>
                  <label className="text-xs sm:text-sm font-bold text-zinc-300 block mb-2">
                    اختر مقاس الحذاء الثاني (36 - 45):
                  </label>
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2.5">
                    {secondVariant.availableSizes.map((sz) => (
                      <button
                        type="button"
                        key={sz}
                        onClick={() => setSecondSize(sz)}
                        className={`py-2.5 px-1 sm:px-2 rounded-xl text-xs sm:text-sm font-black border transition-all active:scale-95 ${
                          secondSize === sz
                            ? 'bg-amber-500 text-zinc-950 border-amber-400 scale-105 shadow-lg'
                            : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STEP 3: MOROCCAN CUSTOMER DELIVERY DETAILS */}
          <div className="bg-zinc-900/90 p-5 sm:p-7 rounded-3xl border border-zinc-800/80 backdrop-blur-md shadow-2xl space-y-4">
            <span className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center font-black text-xs">3</span>
              <span>معلومات التوصيل العادية:</span>
            </span>

            {/* Full Name */}
            <div>
              <label className="text-xs sm:text-sm font-bold text-zinc-200 block mb-1.5 flex items-center gap-1.5">
                <User className="w-4 h-4 text-amber-400" />
                <span>الاسم الكامل (Nom Complet):</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="مثال: محمد براهيمي"
                className={`w-full bg-zinc-950 text-white text-sm p-3.5 rounded-xl border ${
                  errors.fullName ? 'border-red-500 bg-red-950/10' : 'border-zinc-800 focus:border-amber-500'
                } focus:outline-none transition-colors`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-xs sm:text-sm font-bold text-zinc-200 block mb-1.5 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>رقم الهاتف (Numéro Téléphone):</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="مثال: 0661234567"
                className={`w-full bg-zinc-950 text-white text-sm p-3.5 rounded-xl border ${
                  errors.phone ? 'border-red-500 bg-red-950/10' : 'border-zinc-800 focus:border-amber-500'
                } focus:outline-none transition-colors dir-ltr text-right`}
              />
              {errors.phone && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                </p>
              )}
              <span className="text-[11px] text-zinc-500 block mt-1">
                سيتصل بك الموزع على هذا الرقم قبل الوصول لعنوانك.
              </span>
            </div>

            {/* City Selection */}
            <div>
              <label className="text-xs sm:text-sm font-bold text-zinc-200 block mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>المدينة (Ville):</span>
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-zinc-950 text-white text-sm p-3.5 rounded-xl border border-zinc-800 focus:border-amber-500 focus:outline-none"
              >
                {MOROCCAN_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Detailed Address */}
            <div>
              <label className="text-xs sm:text-sm font-bold text-zinc-200 block mb-1.5">
                العنوان الكامل / الحي والزنقة (Adresse):
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="مثال: حي السلام زنقة 14 الدار البيضاء"
                className="w-full bg-zinc-950 text-white text-sm p-3.5 rounded-xl border border-zinc-800 focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Extra Notes */}
            <div>
              <label className="text-xs text-zinc-400 block mb-1">
                ملاحظات إضافية للموزع (اختياري):
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="مثال: الاتصال بعد الساعة 2 زوالاً"
                className="w-full bg-zinc-950 text-white text-xs p-3 rounded-xl border border-zinc-800/80 focus:border-amber-500 focus:outline-none"
              />
            </div>

          </div>

          {/* STEP 4: ORDER SUMMARY & SUBMIT BUTTON */}
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl space-y-4">
            <h3 className="text-lg font-extrabold text-white border-b border-zinc-800 pb-3 flex items-center justify-between">
              <span>ملخص الطلبية:</span>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                100% الدفع عند الاستلام
              </span>
            </h3>

            <div className="space-y-2 text-xs sm:text-sm text-zinc-300">
              <div className="flex justify-between">
                <span>المنتج المختارات:</span>
                <span className="font-bold text-white">{selectedVariant.arabicName} (مقاس {selectedSize})</span>
              </div>

              {selectedPack !== 'single' && (
                <div className="flex justify-between text-amber-400">
                  <span>الحذاء الثاني فـ العرض:</span>
                  <span className="font-bold">
                    {variants.find((v) => v.id === secondVariantId)?.arabicName} (مقاس {secondSize})
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>مصاريف التوصيل:</span>
                <span className="font-bold text-emerald-400">مجاني 0 درهم (فابور)</span>
              </div>

              <div className="flex justify-between pt-3 border-t border-zinc-800 text-base sm:text-lg font-black text-white">
                <span>المبلغ الإجمالي للدفع عند المعاينة:</span>
                <span className="text-2xl font-black text-amber-400 dir-ltr">
                  {currentPackOption.price} MAD
                </span>
              </div>
            </div>

            {/* Premium Inspection & Fitting Guarantee Badge */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center gap-2 text-amber-300 text-xs sm:text-sm font-extrabold shadow-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
              <span>المعاينة والقياس عند الاستلام قبل دفع أي درهم 100%</span>
            </div>

            {/* High Conversion Submit Button */}
            <button
              type="submit"
              className={`w-full py-4 sm:py-5 rounded-2xl text-base sm:text-xl font-black shadow-2xl transition-all duration-300 transform active:scale-98 flex items-center justify-center gap-3 animate-cta-pulse ${selectedVariant.theme.primaryBtnClass}`}
            >
              <Truck className="w-6 h-6" />
              <span>تأكيد الطلب الآن - الدفع عند الاستلام ({currentPackOption.price} د.م)</span>
            </button>

            {/* Trust Reassurance */}
            <p className="text-center text-xs text-zinc-400 pt-2 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>لا نحتاج أي معلومات بنكية - تدفع فقط بعد معاينة وتجريب طلبك مع الموزع.</span>
            </p>
          </div>

        </form>

      </div>
    </section>
  );
};
