import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface MobileCartBarProps {
  cartCount: number;
  total: number;
  onOpenCart: () => void;
}

export const MobileCartBar: React.FC<MobileCartBarProps> = ({
  cartCount,
  total,
  onOpenCart,
}) => {
  if (cartCount === 0) return null;

  return (
    <aside
      aria-label="Mobile cart checkout bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-2.5 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#EBE4D8] shadow-lg"
    >
      <button
        onClick={onOpenCart}
        className="w-full h-12 flex items-center justify-between px-4 rounded-xl bg-[#1C140E] text-[#FAF7F2] font-semibold text-sm active:scale-[0.99] transition-transform cursor-pointer shadow-md"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#B45309] text-white flex items-center justify-center text-xs font-bold">
            {cartCount}
          </div>
          <span>View Cart</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-base font-bold text-[#F59E0B]">
            ${total}
          </span>
          <ArrowRight className="w-4 h-4 text-[#D5CABC]" />
        </div>
      </button>
    </aside>
  );
};
