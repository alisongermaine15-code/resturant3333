import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
  cartQuantity?: number;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cartQuantity = 0,
  onAddToCart,
}) => {
  const [selectedQty, setSelectedQty] = useState(1);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const handleIncrement = () => {
    setSelectedQty((prev) => Math.min(prev + 1, 99));
  };

  const handleDecrement = () => {
    setSelectedQty((prev) => Math.max(prev - 1, 1));
  };

  const handleAdd = () => {
    onAddToCart(product, selectedQty);
    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
      setSelectedQty(1);
    }, 1500);
  };

  return (
    <div className="group bg-white rounded-xl border border-[#EBE4D8] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-[#D5CABC]">
      {/* Visual Top Zone */}
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF7F2]">
          <SafeImage
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Discreet Unboxed Tag on Card */}
          {product.badge && (
            <div className="absolute top-3 left-3 bg-[#1C140E]/85 backdrop-blur-xs text-[#FAF7F2] text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-sm shadow-xs">
              {product.badge}
            </div>
          )}

          {cartQuantity > 0 && (
            <div className="absolute top-3 right-3 bg-[#D97706] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {cartQuantity} in cart
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-4 sm:p-5">
          {/* Metadata clean unboxed with separator */}
          <div className="flex items-center gap-2 text-xs text-[#8C6D58] mb-1.5">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.prepTime}</span>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C140E] group-hover:text-[#B45309] transition-colors leading-snug mb-2">
            {product.name}
          </h3>

          <p className="text-xs sm:text-sm text-[#614E3F] leading-relaxed line-clamp-2 mb-4">
            {product.description}
          </p>
        </div>
      </div>

      {/* Pricing & Interactive Action Area */}
      <div className="p-4 sm:p-5 pt-0 border-t border-[#F2ECE1]/80 mt-auto">
        <div className="flex items-baseline justify-between pt-3 mb-3">
          <span className="text-xs uppercase tracking-wider text-[#8C6D58] font-medium">
            Price
          </span>
          <span className="font-mono text-xl sm:text-2xl font-bold text-[#1C140E] tabular-nums">
            ${product.price}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quantity Selector (+ and -) */}
          <div className="flex items-center border border-[#E0D8CB] rounded-lg bg-[#FAF7F2] p-1 shrink-0">
            <button
              type="button"
              onClick={handleDecrement}
              aria-label={`Decrease quantity of ${product.name}`}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white text-[#5C4536] hover:text-[#1C140E] active:scale-95 transition-all cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-mono text-sm font-semibold text-[#1C140E] tabular-nums select-none">
              {selectedQty}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              aria-label={`Increase quantity of ${product.name}`}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white text-[#5C4536] hover:text-[#1C140E] active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add To Cart button */}
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${selectedQty} ${product.name} to cart`}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              isAddedFeedback
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-[#1C140E] hover:bg-[#342216] text-[#FAF7F2] active:scale-[0.98]'
            }`}
          >
            {isAddedFeedback ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" />
                <span>Added ({selectedQty})</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-[#E6A15C]" />
                <span className="whitespace-nowrap">Add To Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
