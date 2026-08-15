import { OrderData, ProductVariant, PackOption } from '../types';
import { PACK_OPTIONS, PRODUCT_VARIANTS } from '../data/products';

declare global {
  interface Window {
    fbq?: {
      (...args: unknown[]): void;
      loaded?: boolean;
      version?: string;
      queue?: unknown[];
      callMethod?: (...args: unknown[]) => void;
      push?: (...args: unknown[]) => void;
    };
    _fbq?: unknown;
  }
}

// Memory set to prevent duplicate Purchase events on React re-renders or hot reloads
const processedPurchaseKeys = new Set<string>();

/**
 * Reads the Meta Pixel ID from environment variables safely.
 */
export function getMetaPixelId(): string {
  const envId = import.meta.env.VITE_META_PIXEL_ID;
  if (typeof envId === 'string' && envId.trim() !== '') {
    return envId.trim();
  }
  return '';
}

/**
 * Initializes Meta Pixel script once in the browser.
 * Safe fallback if no Pixel ID is present or if script loading fails.
 */
export function initMetaPixel(customId?: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const pixelId = customId || getMetaPixelId();
  if (!pixelId) {
    // Pixel is not configured yet - silently continue
    return false;
  }

  // Prevent multiple script insertions
  if (window.fbq && window.fbq.loaded) {
    return true;
  }

  try {
    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      if (s && s.parentNode) {
        s.parentNode.insertBefore(t, s);
      } else {
        b.head.appendChild(t);
      }
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    );
    /* eslint-enable */

    if (window.fbq) {
      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
    }
    return true;
  } catch (err) {
    console.debug('[Meta Pixel] Initialization notice:', err);
    return false;
  }
}

/**
 * Safe helper to trigger standard Facebook Pixel events
 */
function sendPixelEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  const pixelId = getMetaPixelId();
  if (!pixelId) return;

  try {
    if (window.fbq) {
      if (params) {
        window.fbq('track', eventName, params);
      } else {
        window.fbq('track', eventName);
      }
    }
  } catch (error) {
    // Non-blocking error handling to ensure checkout is never interrupted
    console.debug(`[Meta Pixel] Event ${eventName} warning:`, error);
  }
}

/**
 * Standard PageView event
 */
export function trackPageView(): void {
  sendPixelEvent('PageView');
}

/**
 * Standard ViewContent event when viewing a shoe variant
 */
export function trackViewContent(
  variant: ProductVariant,
  pack?: PackOption | 'single' | 'double'
): void {
  const packObj =
    typeof pack === 'string'
      ? PACK_OPTIONS.find((p) => p.id === pack)
      : pack || PACK_OPTIONS[0];

  const price = packObj ? packObj.price : variant.price || 399;

  sendPixelEvent('ViewContent', {
    content_name: `${variant.modelName} - ${variant.arabicName}`,
    content_category: 'Footwear',
    content_ids: [variant.id],
    content_type: 'product',
    value: price,
    currency: 'MAD'
  });
}

/**
 * Standard InitiateCheckout event when opening or scrolling to checkout section
 */
export function trackInitiateCheckout(
  variant: ProductVariant,
  pack?: PackOption | 'single' | 'double'
): void {
  const packObj =
    typeof pack === 'string'
      ? PACK_OPTIONS.find((p) => p.id === pack)
      : pack || PACK_OPTIONS[0];

  const price = packObj ? packObj.price : variant.price || 399;
  const numItems = packObj && packObj.id === 'double' ? 2 : 1;

  sendPixelEvent('InitiateCheckout', {
    content_name: `${variant.modelName} - ${variant.arabicName} (${packObj?.title || 'زوج واحد'})`,
    content_category: 'Footwear',
    content_ids: [variant.id],
    content_type: 'product',
    value: price,
    currency: 'MAD',
    num_items: numItems
  });
}

/**
 * Standard AddToCart event when selecting/changing a pack or shoe option
 */
export function trackAddToCart(
  variant: ProductVariant,
  pack?: PackOption | 'single' | 'double',
  secondVariantId?: string
): void {
  const packObj =
    typeof pack === 'string'
      ? PACK_OPTIONS.find((p) => p.id === pack)
      : pack || PACK_OPTIONS[0];

  const price = packObj ? packObj.price : variant.price || 399;
  const numItems = packObj && packObj.id === 'double' ? 2 : 1;

  const contentIds = [variant.id];
  if (packObj && packObj.id === 'double' && secondVariantId) {
    contentIds.push(secondVariantId);
  }

  sendPixelEvent('AddToCart', {
    content_name: `${variant.modelName} - ${variant.arabicName} (${packObj?.title || 'زوج واحد'})`,
    content_category: 'Footwear',
    content_ids: contentIds,
    content_type: 'product',
    value: price,
    currency: 'MAD',
    num_items: numItems
  });
}

/**
 * Standard Purchase event triggered only after order submission with deduplication
 */
export function trackPurchase(
  order: OrderData,
  selectedVariant: ProductVariant
): void {
  // Deduplicate by combining created timestamp, phone number and pack type
  const deduplicationKey = `${order.createdAt}_${order.phone}_${order.variantId}_${order.packType}`;

  if (processedPurchaseKeys.has(deduplicationKey)) {
    return;
  }
  processedPurchaseKeys.add(deduplicationKey);

  const packObj = PACK_OPTIONS.find((p) => p.id === order.packType) || PACK_OPTIONS[0];
  const totalPrice = packObj ? packObj.price : 399;
  const numItems = order.packType === 'double' ? 2 : 1;

  const item1Variant =
    PRODUCT_VARIANTS.find((v) => v.id === order.variantId) || selectedVariant;

  const contentIds = [item1Variant.id];
  if (order.packType === 'double' && order.secondVariantId) {
    contentIds.push(order.secondVariantId);
  }

  sendPixelEvent('Purchase', {
    content_name: `${item1Variant.modelName} - ${item1Variant.arabicName} (${packObj.title})`,
    content_category: 'Footwear',
    content_ids: contentIds,
    content_type: 'product',
    value: totalPrice,
    currency: 'MAD',
    num_items: numItems
  });
}
