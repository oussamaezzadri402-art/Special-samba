import { ProductVariant, PackOption, Review } from '../types';

import spezialSandImage from '../assets/images/spezial_sand_beige_1786555677004.jpg';
import sambaBlackImage from '../assets/images/samba_royal_black_1786555689951.jpg';
import spezialCreamImage from '../assets/images/spezial_cream_white_1786555706000.jpg';
import spezialBlueImage from '../assets/images/spezial_royal_blue_1786555736781.jpg';
import sambaWhiteImage from '../assets/images/samba_classic_white_1786555757604.jpg';

export const PRODUCT_VARIANTS: ProductVariant[] = [
  {
    id: 'spezial-sand',
    modelName: 'Handball Spezial',
    arabicName: 'سبسيال - بيج صحراوي',
    colorNameDarija: 'بيج صحراوي / Sand Beige',
    tagline: 'اللون الأكثر طلباً لموسم 2026 - الجلد الشمواه الأصلي الدافئ',
    price: 399,
    originalPrice: 699,
    discountPercentage: 43,
    image: spezialSandImage,
    secondaryImages: [spezialSandImage, spezialCreamImage],
    badge: 'الأكثر مبيعاً 🔥',
    isBestSeller: true,
    descriptionDarija: 'سبيسيال بيج صحراوي مصنوع من جودة عالية، شمواه فاخر ونعل مطاطي أصلي للراحة طوال اليوم. كايعطي هيبة وأناقة فريدة لأي ستيل.',
    stylingTipDarija: '💡 نصيحة الستيل: كيجي واعر بزاف مع السراويل الجينز الفاتحة والسراويل الترابية والبيج.',
    featuresDarija: [
      'جلد شمواه حر ممتاز (Suede High Quality)',
      'نعل مطاطي خفيف ومريح كيمتص الصدمات',
      'تطريز ذهبي فخم لعلامة Spezial',
      'مناسب للخروج اليومي والرياضة والأناقة'
    ],
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    stockLeft: 7,
    theme: {
      id: 'sand',
      accentColor: '#D4A359',
      accentGlow: 'rgba(212, 163, 89, 0.35)',
      bgGradient: 'from-amber-950/40 via-zinc-950 to-zinc-950',
      primaryBtnClass: 'bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold shadow-amber-500/25',
      badgeBg: 'bg-amber-500/20 border-amber-500/40',
      badgeText: 'text-amber-300',
      borderHighlight: 'border-amber-500/50',
      ringColor: 'ring-amber-500',
      textColor: 'text-amber-400',
      heroBgOverlay: 'radial-gradient(circle at 50% 30%, rgba(212, 163, 89, 0.22) 0%, rgba(9, 9, 11, 0.98) 70%)'
    }
  },
  {
    id: 'samba-black',
    modelName: 'Samba OG',
    arabicName: 'سامبا - أسود ملكي',
    colorNameDarija: 'أسود ملكي / Royal Black',
    tagline: 'الكلاسيك الملكي الأسود مع خطوط بيضاء ناصعة - أيقونة الشارع',
    price: 399,
    originalPrice: 699,
    discountPercentage: 43,
    image: sambaBlackImage,
    secondaryImages: [sambaBlackImage, sambaWhiteImage],
    badge: 'الكلاسيك الملكي ⚡',
    descriptionDarija: 'سامبا بلون أسود جلد حر ممتازة، مريحة للرجل وخفيفة، تصميم كلاسيكي أسطوري كايتماشى مع أي لبسة كيفما كانت.',
    stylingTipDarija: '💡 نصيحة الستيل: الملك فـ اللبس! كيجيك مع الجينز الكحل، السروال الكاجوال والجاكيت الشتوية.',
    featuresDarija: [
      'جلد ناعم أملس حر مقاوم للخدش',
      'مقدمة الشمواه المضلعة الأصلية (T-Toe)',
      'شعار Samba باللون الذهبي البارز',
      'نعل صلب ومريح للمشي الطويل'
    ],
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    stockLeft: 4,
    theme: {
      id: 'black',
      accentColor: '#3B82F6',
      accentGlow: 'rgba(59, 130, 246, 0.35)',
      bgGradient: 'from-blue-950/40 via-zinc-950 to-zinc-950',
      primaryBtnClass: 'bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-blue-600/25',
      badgeBg: 'bg-blue-500/20 border-blue-500/40',
      badgeText: 'text-blue-300',
      borderHighlight: 'border-blue-500/50',
      ringColor: 'ring-blue-500',
      textColor: 'text-blue-400',
      heroBgOverlay: 'radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.22) 0%, rgba(9, 9, 11, 0.98) 70%)'
    }
  },
  {
    id: 'spezial-cream',
    modelName: 'Handball Spezial',
    arabicName: 'سبسيال - أبيض كريمي',
    colorNameDarija: 'أبيض كريمي / Off-White Cream',
    tagline: 'اللمسة العصرية الفاخرة - أوف وايت هادئ وأنيق جداً',
    price: 399,
    originalPrice: 699,
    discountPercentage: 43,
    image: spezialCreamImage,
    secondaryImages: [spezialCreamImage, spezialSandImage],
    badge: 'إصدار محدود ✨',
    descriptionDarija: 'سبسيال أوف وايت كريمي، خفة وأناقة للناس اللي كايقلبو على شي حاجة نقية وراقية بزاف فـ اللبسة.',
    stylingTipDarija: '💡 نصيحة الستيل: رائع جداً مع الملابسة الصيفية، الشورتات والسراويل الكتان والجينز الأزرق.',
    featuresDarija: [
      'شمواه كريمي فاخر ناعم الملمس',
      'خطوط ثلاثية باللون البيج الفاتح الهادئ',
      'بطانة داخلية مريحة تمنع التعرق',
      'نعل صلب ومتين بخامة أصلية'
    ],
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    stockLeft: 9,
    theme: {
      id: 'cream',
      accentColor: '#EAB308',
      accentGlow: 'rgba(234, 179, 8, 0.35)',
      bgGradient: 'from-amber-950/30 via-zinc-950 to-zinc-950',
      primaryBtnClass: 'bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-bold shadow-yellow-500/25',
      badgeBg: 'bg-yellow-500/20 border-yellow-500/40',
      badgeText: 'text-yellow-300',
      borderHighlight: 'border-yellow-500/50',
      ringColor: 'ring-yellow-500',
      textColor: 'text-yellow-400',
      heroBgOverlay: 'radial-gradient(circle at 50% 30%, rgba(234, 179, 8, 0.20) 0%, rgba(9, 9, 11, 0.98) 70%)'
    }
  },
  {
    id: 'spezial-blue',
    modelName: 'Handball Spezial',
    arabicName: 'سبسيال - أزرق نيلي',
    colorNameDarija: 'أزرق نيلي / Royal Blue',
    tagline: 'ترند شبكات التواصل - الأزرق النيلي النادر والجذاب',
    price: 399,
    originalPrice: 699,
    discountPercentage: 43,
    image: spezialBlueImage,
    secondaryImages: [spezialBlueImage, sambaBlackImage],
    badge: 'ترند التيكتوك 🚀',
    descriptionDarija: 'سبيسيال بلون أزرق نيلي ملكي جذاب، تصميم فريد كايعطيك حضور قوي وتأنق مختلف فـ الشارع.',
    stylingTipDarija: '💡 نصيحة الستيل: كيخرج اللبسة المظلمة! ببان خطير مع التيشرت الأبيض أو الكحل والجينز.',
    featuresDarija: [
      'شمواه أزرق ملكي بلون ناصع ومقاوم للبهتان',
      'خطوط باللون الأزرق السماوي المتباين',
      'نعل طبي مريح للمشي اليومي',
      'حواف مبطنة لحماية الكاحل'
    ],
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    stockLeft: 3,
    theme: {
      id: 'blue',
      accentColor: '#2563EB',
      accentGlow: 'rgba(37, 99, 235, 0.4)',
      bgGradient: 'from-indigo-950/50 via-zinc-950 to-zinc-950',
      primaryBtnClass: 'bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-indigo-600/25',
      badgeBg: 'bg-indigo-500/20 border-indigo-500/40',
      badgeText: 'text-indigo-300',
      borderHighlight: 'border-indigo-500/50',
      ringColor: 'ring-indigo-500',
      textColor: 'text-indigo-400',
      heroBgOverlay: 'radial-gradient(circle at 50% 30%, rgba(37, 99, 235, 0.25) 0%, rgba(9, 9, 11, 0.98) 70%)'
    }
  },
  {
    id: 'samba-white',
    modelName: 'Samba OG',
    arabicName: 'سامبا - أبيض كلاسيك',
    colorNameDarija: 'أبيض كلاسيك / Classic White',
    tagline: 'الحذاء الأكثر شهرة واستعمالاً في العالم - بساطة وأناقة مطلق',
    price: 399,
    originalPrice: 699,
    discountPercentage: 43,
    image: sambaWhiteImage,
    secondaryImages: [sambaWhiteImage, sambaBlackImage],
    badge: 'الأكثر طلباً 💥',
    descriptionDarija: 'سامبا أبيض كلاسيكي بخطوط سوداء ومقدمة شمواه رمادي. السبت والأحد واليوم كامل وأنت لابسو مرتاح.',
    stylingTipDarija: '💡 نصيحة الستيل: هاد الحذاء كيمشي مع كلشي بدون استثناء! من السروال الرياضي حتى البدلة الكاجوال.',
    featuresDarija: [
      'جلد أبيض نقي مع شمواه رمادي ممتازة',
      'تصميم مريح وخفيف الوزن',
      'شعار السامبا الذهبي الأصلي',
      'سهل التنظيف ومقاوم للاتساخ'
    ],
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    stockLeft: 6,
    theme: {
      id: 'white',
      accentColor: '#10B981',
      accentGlow: 'rgba(16, 185, 129, 0.35)',
      bgGradient: 'from-emerald-950/40 via-zinc-950 to-zinc-950',
      primaryBtnClass: 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold shadow-emerald-500/25',
      badgeBg: 'bg-emerald-500/20 border-emerald-500/40',
      badgeText: 'text-emerald-300',
      borderHighlight: 'border-emerald-500/50',
      ringColor: 'ring-emerald-500',
      textColor: 'text-emerald-400',
      heroBgOverlay: 'radial-gradient(circle at 50% 30%, rgba(16, 185, 129, 0.22) 0%, rgba(9, 9, 11, 0.98) 70%)'
    }
  }
];

export const PACK_OPTIONS: PackOption[] = [
  {
    id: 'single',
    title: 'زوج واحد (1 Pair)',
    subtitle: 'توصيل مجاني + الدفع عند الاستلام',
    price: 399,
    originalPrice: 699,
    savings: 'وفّر 300 درهم'
  },
  {
    id: 'double',
    title: 'عرض الزوجين (2 Pairs) 🔥',
    subtitle: 'اختر أي لونين مختلفين لك ولصديقك أو خطيبتك',
    price: 699,
    originalPrice: 1398,
    savings: 'وفّر 699 درهم (خصم هائل!)',
    popular: true
  },
  {
    id: 'triple',
    title: 'عرض العائلة (3 Pairs) 🎁',
    subtitle: '3 أزواج بأحسن ثمن فالمغرب + هدايا مجانية',
    price: 999,
    originalPrice: 2097,
    savings: 'وفّر 1098 درهم'
  }
];

export const MOROCCAN_CITIES = [
  'الدار البيضاء - Casablanca',
  'الرباط - Rabat',
  'مراكش - Marrakech',
  'طنجة - Tangier',
  'أكادير - Agadir',
  'فاس - Fez',
  'مكناس - Meknes',
  'وجدة - Oujda',
  'الناظور - Nador',
  'تطوان - Tetouan',
  'العيون - Laayoune',
  'الجديدة - El Jadida',
  'المحمدية - Mohammedia',
  'القنيطرة - Kenitra',
  'آسفي - Safi',
  'تمارة - Temara',
  'خريبكة - Khouribga',
  'بني ملال - Beni Mellal',
  'تارودانت - Taroudant',
  'تازة - Taza',
  'الداخلة - Dakhla',
  'مدينة أخرى - Other Moroccan City'
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'r1',
    authorName: 'أيمن المرابط',
    city: 'الدار البيضاء',
    rating: 5,
    date: 'منذ يومين',
    commentDarija: 'صراحة السلعة جات متطابقة 100% مع الصورة، الشمواه سخون ورطب والنعل مريح بزاف فالمشي. التوصيل وصلني فـ 24 ساعة للدار البيضاء بعد ما جربت الصباط ولقيت المقاس ديالي عاد خلصت. شكراً ليكم بزااف!',
    verifiedPurchase: true,
    variantName: 'Handball Spezial - بيج صحراوي',
    size: 42,
    likes: 18
  },
  {
    id: 'r2',
    authorName: 'سكينة الفاسي',
    city: 'الرباط',
    rating: 5,
    date: 'منذ 3 أيام',
    commentDarija: 'اخترت عرض الزوجين (2 pairs) ليا ولخويا، خدينا الأوف وايت والكحل. بصراحة كاليتي واعرة بزاف مقارنة مع الثمن فالمحلات. والتوصيل فابور حتال الباب. تنصحكم بيهم!',
    verifiedPurchase: true,
    variantName: 'Samba OG - أسود ملكي',
    size: 38,
    likes: 24
  },
  {
    id: 'r3',
    authorName: 'حمزة الناصري',
    city: 'مراكش',
    rating: 5,
    date: 'منذ 4 أيام',
    commentDarija: 'تبارك الله عليكم خدمة ناضية! الصباط جاني مقاس 43 سوا سوا، والشمواه كاليتي عالية مشي من داك العادي. الساط ديال التوصيل ظريف اتصل بيا وقبل ما نخلص فتحت الكارتونة وقلبت مزيان.',
    verifiedPurchase: true,
    variantName: 'Handball Spezial - أزرق نيلي',
    size: 43,
    likes: 12
  },
  {
    id: 'r4',
    authorName: 'مهدي بلمقدم',
    city: 'طنجة',
    rating: 5,
    date: 'منذ أسبوع',
    commentDarija: 'أحسن سبيسيال خديتو لحد الآن بالمغرب! اللون البيج الصحراوي خطير بزاف فـ اللبسة مع الجينز. تعامل ممتااااز وتواصل عبر الواتساب سريع.',
    verifiedPurchase: true,
    variantName: 'Handball Spezial - بيج صحراوي',
    size: 41,
    likes: 31
  }
];
