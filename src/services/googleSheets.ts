import { OrderData, ProductVariant } from '../types';
import { PRODUCT_VARIANTS, PACK_OPTIONS } from '../data/products';

export interface FormattedGoogleSheetOrder {
  orderId: string;
  timestamp: string;
  fullName: string;
  phone: string;
  city: string;
  address: string;
  packType: string;
  packTitle: string;
  item1Color: string;
  item1Size: string | number;
  item2Color: string;
  item2Size: string | number;
  item3Color: string;
  item3Size: string | number;
  totalPrice: number;
  currency: string;
  notes: string;
}

/**
 * Transforms raw OrderData into a clean, structured object ready for Google Sheets
 */
export function formatOrderForSheet(
  order: OrderData,
  selectedVariant: ProductVariant
): FormattedGoogleSheetOrder {
  const pack = PACK_OPTIONS.find((p) => p.id === order.packType);
  const totalPrice = pack ? pack.price : 399;

  const item1Variant = PRODUCT_VARIANTS.find((v) => v.id === order.variantId) || selectedVariant;
  const item1Color = `${item1Variant.arabicName} (${item1Variant.colorNameDarija})`;

  let item2Color = '';
  let item2Size: string | number = '';
  if (order.packType === 'double' && order.secondVariantId) {
    const item2Variant = PRODUCT_VARIANTS.find((v) => v.id === order.secondVariantId);
    item2Color = item2Variant ? `${item2Variant.arabicName} (${item2Variant.colorNameDarija})` : order.secondVariantId;
    item2Size = order.secondSize || '';
  }

  const generatedId = `ORD-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

  return {
    orderId: generatedId,
    timestamp: new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' }),
    fullName: order.fullName,
    phone: order.phone,
    city: order.city,
    address: order.address,
    packType: order.packType,
    packTitle: pack ? pack.title : 'زوج واحد (1 Pair)',
    item1Color,
    item1Size: order.size,
    item2Color,
    item2Size,
    item3Color: '',
    item3Size: '',
    totalPrice,
    currency: 'د.م',
    notes: order.notes || ''
  };
}

/**
 * Submits the order asynchronously to the configured Google Apps Script Web App endpoint.
 * This function handles missing endpoint configurations and network errors gracefully,
 * ensuring the customer order UX never breaks even if Google Sheets is unreachable.
 */
export async function submitOrderToGoogleSheets(
  order: OrderData,
  selectedVariant: ProductVariant
): Promise<boolean> {
  const endpoint = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

  if (!endpoint || endpoint.trim() === '') {
    console.warn(
      '[Google Sheets Integration] VITE_GOOGLE_APPS_SCRIPT_URL is not set. Order collected locally.'
    );
    return false;
  }

  const payload = formatOrderForSheet(order, selectedVariant);

  try {
    // text/plain with no-cors bypasses browser CORS restrictions with Google Apps Script Web Apps
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload),
      mode: 'no-cors'
    });
    return true;
  } catch (error) {
    console.error('[Google Sheets Integration] Order submission error:', error);
    return false;
  }
}
