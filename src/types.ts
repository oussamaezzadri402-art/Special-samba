export interface ColorTheme {
  id: string;
  accentColor: string; // Hex color e.g. #D4A359
  accentGlow: string; // rgba string
  bgGradient: string; // Tailwind class
  primaryBtnClass: string;
  badgeBg: string;
  badgeText: string;
  borderHighlight: string;
  ringColor: string;
  textColor: string;
  heroBgOverlay: string;
}

export interface ProductVariant {
  id: string;
  modelName: string;
  arabicName: string;
  colorNameDarija: string;
  tagline: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  image: string;
  secondaryImages: string[];
  badge: string;
  descriptionDarija: string;
  stylingTipDarija: string;
  featuresDarija: string[];
  availableSizes: number[];
  stockLeft: number;
  isBestSeller?: boolean;
  theme: ColorTheme;
}

export interface PackOption {
  id: 'single' | 'double';
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  savings: string;
  popular?: boolean;
}

export interface OrderData {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  variantId: string;
  size: number;
  packType: 'single' | 'double';
  secondVariantId?: string;
  secondSize?: number;
  notes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  authorName: string;
  city: string;
  rating: number;
  date: string;
  commentDarija: string;
  verifiedPurchase: boolean;
  variantName: string;
  size: number;
  userAvatar?: string;
  reviewImage?: string;
  likes: number;
}
