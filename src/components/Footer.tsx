import React from 'react';
import { Phone, Mail, MapPin, Clock, Building2, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateToMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToMenu }) => {
  return (
    <footer className="bg-[#1C140E] text-[#D5CABC] border-t border-[#342216] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#FAF7F2] tracking-tight">
              Taste Haven
            </h3>
            <p className="text-xs text-[#B8A698] leading-relaxed">
              Crafting premium comfort food, dry-aged burgers, slow-cooked ribs, and celebratory confections with love and artisanal culinary pride.
            </p>
            <div className="pt-2 text-xs text-[#E6A15C] flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Ready for Immediate Deployment</span>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#FAF7F2]">
              Kitchen Hours
            </h4>
            <div className="space-y-2 text-xs text-[#B8A698]">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#E6A15C]" />
                <span>Monday – Thursday: 11am – 10pm</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#E6A15C]" />
                <span>Friday – Saturday: 11am – 11pm</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#E6A15C]" />
                <span>Sunday Brunch: 10am – 9:30pm</span>
              </div>
            </div>
          </div>

          {/* Contact & Location */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#FAF7F2]">
              Restaurant & Dispatch
            </h4>
            <div className="space-y-2 text-xs text-[#B8A698]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E6A15C] shrink-0 mt-0.5" />
                <span>742 Gourmet Promenade, San Francisco, CA 94107</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E6A15C]" />
                <span>+1 (415) 890-3420</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E6A15C]" />
                <span>orders@tastehavenrestaurant.com</span>
              </div>
            </div>
          </div>

          {/* Payment Terms & Bank Info */}
          <div id="payment-details-info" className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#FAF7F2]">
              Bank Transfer Details
            </h4>
            <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-xs text-[#D5CABC] space-y-1 font-mono">
              <div>Bank: <span className="text-white font-sans">[YOUR BANK NAME]</span></div>
              <div>Account: <span className="text-white font-sans">Taste Haven Restaurant</span></div>
              <div>Number: <span className="text-[#F59E0B] font-bold">1234567890</span></div>
            </div>
            <p className="text-[11px] text-[#A89485] leading-tight">
              Direct bank transfer supported with quick receipt verification.
            </p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C6D58] gap-4">
          <p>© {new Date().getFullYear()} Taste Haven Restaurant. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onNavigateToMenu}
              className="hover:text-[#FAF7F2] transition-colors cursor-pointer"
            >
              Menu
            </button>
            <span>·</span>
            <span>Netlify & Vercel Ready</span>
            <span>·</span>
            <span>Responsive Mobile Design</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
