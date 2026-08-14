import React, { useState } from 'react';
import { PRODUCT_VARIANTS } from './data/products';
import { ProductVariant, OrderData } from './types';
import { HeaderNavbar } from './components/HeaderNavbar';
import { HeroSection } from './components/HeroSection';
import { ColorAtmosphereShowcase } from './components/ColorAtmosphereShowcase';
import { ProductFeaturesAndQuality } from './components/ProductFeaturesAndQuality';
import { ExpressOrderForm } from './components/ExpressOrderForm';
import { SocialProofAndReviews } from './components/SocialProofAndReviews';
import { FaqAccordion } from './components/FaqAccordion';
import { FooterSection } from './components/FooterSection';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { StickyBottomMobileBar } from './components/StickyBottomMobileBar';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ProductLaunchReveal } from './components/ProductLaunchReveal';

export default function App() {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(PRODUCT_VARIANTS[0]);
  const [selectedSize, setSelectedSize] = useState<number>(42);
  const [selectedPack, setSelectedPack] = useState<'single' | 'double'>('single');
  const [completedOrder, setCompletedOrder] = useState<OrderData | null>(null);

  const scrollToOrderForm = () => {
    const el = document.getElementById('order-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderSubmit = (data: OrderData) => {
    setCompletedOrder(data);
  };

  return (
    <div 
      className="min-h-screen bg-zinc-950 text-zinc-100 font-['Readex_Pro',sans-serif] selection:bg-amber-500 selection:text-zinc-950 transition-colors duration-700 relative overflow-x-hidden"
      dir="rtl"
    >
      {/* Premium Cinematic Product Launch Reveal Overlay */}
      <ProductLaunchReveal selectedVariant={selectedVariant} />

      {/* Header Bar */}
      <HeaderNavbar
        selectedVariant={selectedVariant}
        onOrderClick={scrollToOrderForm}
      />

      {/* Main Hero Section with Dynamic Atmospheric Glow */}
      <HeroSection
        variants={PRODUCT_VARIANTS}
        selectedVariant={selectedVariant}
        onSelectVariant={setSelectedVariant}
        onOrderClick={scrollToOrderForm}
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
      />

      {/* Color Atmosphere & Variation Showcase (Special Requirement) */}
      <ColorAtmosphereShowcase
        variants={PRODUCT_VARIANTS}
        selectedVariant={selectedVariant}
        onSelectVariant={setSelectedVariant}
      />

      {/* Features & Quality Assurance in Moroccan Darija */}
      <ProductFeaturesAndQuality
        selectedVariant={selectedVariant}
      />

      {/* High-Converting Express Moroccan Checkout Order Form */}
      <ExpressOrderForm
        variants={PRODUCT_VARIANTS}
        selectedVariant={selectedVariant}
        onSelectVariant={setSelectedVariant}
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
        selectedPack={selectedPack}
        onSelectPack={setSelectedPack}
        onSubmitOrder={handleOrderSubmit}
      />

      {/* Verified Moroccan Customer Reviews */}
      <SocialProofAndReviews
        selectedVariant={selectedVariant}
      />

      {/* FAQ Accordion */}
      <FaqAccordion />

      {/* Footer */}
      <FooterSection selectedVariant={selectedVariant} />

      {/* Floating WhatsApp CTA */}
      <WhatsAppFloatingButton selectedVariant={selectedVariant} />

      {/* Sticky Bottom Bar for Mobile Conversions */}
      <StickyBottomMobileBar
        selectedVariant={selectedVariant}
        selectedPack={selectedPack}
        onOrderClick={scrollToOrderForm}
      />

      {/* Celebration Success Order Modal */}
      {completedOrder && (
        <OrderSuccessModal
          orderData={completedOrder}
          selectedVariant={selectedVariant}
          onClose={() => setCompletedOrder(null)}
        />
      )}
    </div>
  );
}

