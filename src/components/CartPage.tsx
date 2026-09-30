import React from 'react';
import { Plus, Minus, Trash2, ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { SafeImage } from './SafeImage';

interface CartPageProps {
  cart: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  subtotal,
  deliveryFee,
  total,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-[#EFEAE1] text-[#8C6D58] flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C140E] mb-3">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-sm text-[#614E3F] max-w-md mx-auto mb-8 leading-relaxed">
          Looks like you haven't added any of our delicious dishes yet. Explore our handcrafted menu to build your feast.
        </p>
        <button
          onClick={onContinueShopping}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#1C140E] hover:bg-[#342216] text-[#FAF7F2] font-semibold text-sm transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Our Menu</span>
        </button>
      </div>
    );
  }

  const freeDeliveryThreshold = 150;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#EBE4D8] gap-4">
        <div>
          <button
            onClick={onContinueShopping}
            className="inline-flex items-center gap-1.5 text-xs text-[#8C6D58] hover:text-[#1C140E] transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Browsing Menu</span>
          </button>
          <h1 className="font-serif text-3xl font-bold text-[#1C140E]">
            Your Shopping Cart
          </h1>
        </div>

        <button
          onClick={onClearCart}
          className="text-xs text-[#8C6D58] hover:text-red-700 transition-colors self-start sm:self-auto cursor-pointer flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Free Delivery Bar */}
      <div className="mb-6 p-3.5 rounded-lg bg-[#FAF3EA] border border-[#E9D9C3] text-xs text-[#7A4E2D]">
        {remainingForFreeDelivery === 0 ? (
          <span className="font-semibold text-emerald-800">
            🎉 You have qualified for Complimentary Restaurant Delivery!
          </span>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>
              Add <strong className="font-mono font-bold">${remainingForFreeDelivery}</strong> more to qualify for Free Delivery!
            </span>
            <div className="w-full sm:w-48 bg-[#E2D2BC] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#D97706] h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-3">
            {cart.map(({ product, quantity }) => {
              const itemTotal = product.price * quantity;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-[#EBE4D8] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-[#D5CABC]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#FAF7F2]">
                      <SafeImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#1C140E]">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-[#8C6D58] mt-0.5 mb-1.5">
                        <span>Unit: ${product.price}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono font-semibold text-[#1C140E]">
                          Item: {product.name} x{quantity}
                        </span>
                      </div>
                      <div className="text-xs text-[#5C4536]">
                        Price: <span className="font-mono font-bold">${itemTotal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Removal */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F5EFE6]">
                    <div className="flex items-center border border-[#E0D8CB] rounded-lg bg-[#FAF7F2] p-1">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white text-[#5C4536] hover:text-[#1C140E] transition-all cursor-pointer"
                        aria-label={`Decrease quantity of ${product.name}`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-mono text-xs font-bold text-[#1C140E] tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white text-[#5C4536] hover:text-[#1C140E] transition-all cursor-pointer"
                        aria-label={`Increase quantity of ${product.name}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <div className="text-[11px] text-[#8C6D58] uppercase">Total</div>
                      <div className="font-mono text-base font-bold text-[#1C140E] tabular-nums">
                        ${itemTotal}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(product.id)}
                      className="p-2 text-[#9E8675] hover:text-red-700 transition-colors cursor-pointer rounded-lg hover:bg-red-50"
                      aria-label={`Remove ${product.name} from cart`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary & Checkout Card */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-xl border border-[#EBE4D8] p-6 shadow-xs sticky top-28">
            <h2 className="font-serif text-xl font-bold text-[#1C140E] pb-4 mb-4 border-b border-[#F2ECE1]">
              Order Breakdown
            </h2>

            {/* Prompt exact display format specification showcase */}
            <div className="mb-4 p-3.5 rounded-lg bg-[#FAF7F2] border border-[#EBE4D8] text-xs space-y-1">
              <div className="text-[11px] font-semibold text-[#8C6D58] uppercase tracking-wider mb-1">
                Cart Items Selected
              </div>
              {cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center text-[#5C4536] py-0.5"
                >
                  <span>
                    Item: <strong>{product.name} x{quantity}</strong>
                  </span>
                  <span className="font-mono font-medium">
                    ${product.price * quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm text-[#5C4536] pb-4 border-b border-[#F2ECE1]">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span className="font-mono font-semibold text-[#1C140E] tabular-nums">
                  ${subtotal}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery & Handling</span>
                <span className="font-mono font-semibold text-[#1C140E] tabular-nums">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `$${deliveryFee}`
                  )}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline py-4 mb-6">
              <span className="font-serif text-lg font-bold text-[#1C140E]">
                Total Amount
              </span>
              <span className="font-mono text-2xl font-bold text-[#D97706] tabular-nums">
                ${total}
              </span>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg bg-[#1C140E] hover:bg-[#342216] text-[#FAF7F2] font-semibold text-sm tracking-wide transition-all shadow-md active:scale-[0.99] cursor-pointer"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#8C6D58]">
              <ShieldCheck className="w-4 h-4 text-[#C68A36]" />
              <span>Direct Bank Wire Verification · Order Safe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
