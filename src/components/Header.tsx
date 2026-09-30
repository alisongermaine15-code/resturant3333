import React from 'react';
import { ShoppingBag, ChevronRight, ArrowLeft } from 'lucide-react';
import { AppStep } from '../types';

interface HeaderProps {
  currentStep: AppStep;
  cartCount: number;
  cartTotal: number;
  onNavigate: (step: AppStep) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  cartCount,
  cartTotal,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBE4D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => onNavigate('menu')}
            className="text-left group cursor-pointer focus:outline-hidden"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1C140E] group-hover:text-[#B45309] transition-colors">
              Taste Haven
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs uppercase tracking-widest text-[#8C6D58] font-semibold">
              Restaurant
            </span>
          </button>

          {/* Zone 2: Navigation Links or Checkout Breadcrumb */}
          {currentStep === 'menu' ? (
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5C4536]">
              <a
                href="#menu-section"
                className="hover:text-[#B45309] transition-colors"
              >
                Our Menu
              </a>
              <a
                href="#signature-dishes"
                className="hover:text-[#B45309] transition-colors"
              >
                Signatures
              </a>
              <a
                href="#quality-promise"
                className="hover:text-[#B45309] transition-colors"
              >
                Our Quality
              </a>
              <a
                href="#payment-details-info"
                className="hover:text-[#B45309] transition-colors"
              >
                Bank Transfer Info
              </a>
            </nav>
          ) : (
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-[#7D6453]">
              <button
                onClick={() => onNavigate('menu')}
                className="hover:text-[#1C140E] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Menu
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#B8A698]" />
              <button
                onClick={() => onNavigate('cart')}
                className={`transition-colors cursor-pointer ${
                  currentStep === 'cart'
                    ? 'text-[#B45309] font-semibold'
                    : 'hover:text-[#1C140E]'
                }`}
              >
                Cart
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#B8A698]" />
              <span
                className={
                  currentStep === 'shipping'
                    ? 'text-[#B45309] font-semibold'
                    : ''
                }
              >
                Shipping
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#B8A698]" />
              <span
                className={
                  currentStep === 'summary'
                    ? 'text-[#B45309] font-semibold'
                    : ''
                }
              >
                Summary
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#B8A698]" />
              <span
                className={
                  currentStep === 'payment'
                    ? 'text-[#B45309] font-semibold'
                    : ''
                }
              >
                Payment
              </span>
            </div>
          )}

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="flex items-center gap-3">
            {currentStep !== 'menu' && (
              <button
                onClick={() => onNavigate('menu')}
                className="sm:hidden text-xs text-[#5C4536] hover:text-[#1C140E] underline px-2 py-1 cursor-pointer"
              >
                Back to Menu
              </button>
            )}

            <button
              onClick={() => onNavigate('cart')}
              className={`relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                cartCount > 0
                  ? 'bg-[#1C140E] text-[#FAF7F2] hover:bg-[#2F2117] shadow-sm'
                  : 'bg-[#EFEAE1] text-[#5C4536] hover:bg-[#E4DDD0]'
              }`}
              aria-label={`Shopping Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#E6A15C]" />
              <span className="hidden xs:inline">Cart</span>
              {cartCount > 0 ? (
                <div className="flex items-center gap-1.5 pl-1 border-l border-white/20">
                  <span className="bg-[#B45309] text-white text-xs px-1.5 py-0.5 rounded-md font-bold">
                    {cartCount}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#F3E7D3]">
                    ${cartTotal}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-[#7D6453]">0</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
