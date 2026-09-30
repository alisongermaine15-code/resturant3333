import React from 'react';
import { ArrowDown, Clock, ShieldCheck, Truck } from 'lucide-react';
import heroBanner from '../assets/images/hero_restaurant_dining_1790788941991.jpg';

interface HeroProps {
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToMenu }) => {
  return (
    <section className="relative overflow-hidden border-b border-[#EBE4D8] bg-[#F7F2EA]">
      {/* Background Ambience with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBanner}
          alt="Taste Haven Restaurant dining room with plated gourmet cuisine"
          className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C140E] via-[#1C140E]/80 to-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="max-w-2xl text-left">
          {/* Subtle text kicker without pill enclosure */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E8C29D] mb-4">
            <span>Artisanal Kitchen</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2018</span>
            <span aria-hidden="true">·</span>
            <span>Made To Order</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF7F2] tracking-tight leading-[1.12] mb-6 text-balance">
            Taste Haven Restaurant
          </h1>

          <p className="text-base sm:text-lg text-[#D5CABC] leading-relaxed mb-8 max-w-xl">
            Experience handcrafted gourmet burgers, slow-cooked hickory BBQ ribs,
            crisp comforting sides, and celebratory desserts made fresh in our kitchen
            and delivered directly to your doorstep.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            <button
              onClick={onScrollToMenu}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap"
            >
              <span>Explore The Menu</span>
              <ArrowDown className="w-4 h-4" />
            </button>
            <a
              href="#payment-details-info"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FAF7F2] border border-white/20 font-medium text-sm transition-all backdrop-blur-xs cursor-pointer whitespace-nowrap"
            >
              <span>Payment Details</span>
            </a>
          </div>

          {/* Clean Unboxed Trust Markers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/15 text-xs text-[#FAF7F2]/90">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#E6A15C] shrink-0" />
              <span>Prep Time 15–30 Mins</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#E6A15C] shrink-0" />
              <span>Complimentary Delivery &gt; $150</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#E6A15C] shrink-0" />
              <span>100% Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
