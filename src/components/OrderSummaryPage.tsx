import React from 'react';
import { ArrowLeft, ArrowRight, User, MapPin, Mail, Phone, Edit2, ShieldCheck, Utensils } from 'lucide-react';
import { CartItem, ShippingAddress } from '../types';
import { SafeImage } from './SafeImage';

interface OrderSummaryPageProps {
  cart: CartItem[];
  shipping: ShippingAddress;
  subtotal: number;
  deliveryFee: number;
  total: number;
  onEditShipping: () => void;
  onOrderAndPay: () => void;
}

export const OrderSummaryPage: React.FC<OrderSummaryPageProps> = ({
  cart,
  shipping,
  subtotal,
  deliveryFee,
  total,
  onEditShipping,
  onOrderAndPay,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Breadcrumb */}
      <button
        type="button"
        onClick={onEditShipping}
        className="inline-flex items-center gap-1.5 text-xs text-[#8C6D58] hover:text-[#1C140E] transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Shipping Details</span>
      </button>

      <div className="mb-6 pb-4 border-b border-[#EBE4D8]">
        <h1 className="font-serif text-3xl font-bold text-[#1C140E]">
          Review Order Summary
        </h1>
        <p className="text-xs sm:text-sm text-[#7D6453] mt-1">
          Please verify your delivery address and selected gourmet items before proceeding to bank payment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content: Customer Info & Items */}
        <div className="lg:col-span-8 space-y-6">
          {/* Customer Information Card */}
          <div className="bg-white rounded-xl border border-[#EBE4D8] p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F2ECE1]">
              <h2 className="font-serif text-lg font-bold text-[#1C140E]">
                Customer & Delivery Information
              </h2>
              <button
                type="button"
                onClick={onEditShipping}
                className="inline-flex items-center gap-1 text-xs text-[#B45309] hover:text-[#8F3F00] font-semibold cursor-pointer"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5C4536]">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#9E8675]" />
                  <span className="font-semibold text-[#1C140E]">
                    {shipping.fullName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#9E8675]" />
                  <span>{shipping.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#9E8675]" />
                  <span>{shipping.phone}</span>
                </div>
              </div>

              <div className="space-y-1.5 border-t sm:border-t-0 sm:border-l border-[#F2ECE1] pt-3 sm:pt-0 sm:pl-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#9E8675] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#1C140E]">
                      {shipping.streetAddress}
                    </p>
                    <p>
                      {shipping.city}, {shipping.state} {shipping.postalCode}
                    </p>
                    <p className="text-[#8C6D58]">{shipping.country}</p>
                  </div>
                </div>
                {shipping.deliveryNotes && (
                  <p className="text-[11px] italic text-[#8C6D58] pt-1">
                    Note: "{shipping.deliveryNotes}"
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Selected Products List */}
          <div className="bg-white rounded-xl border border-[#EBE4D8] p-5 sm:p-6 shadow-xs">
            <h2 className="font-serif text-lg font-bold text-[#1C140E] pb-3 mb-4 border-b border-[#F2ECE1]">
              Selected Food Products ({cart.reduce((sum, i) => sum + i.quantity, 0)})
            </h2>

            <div className="divide-y divide-[#F2ECE1]">
              {cart.map(({ product, quantity }) => {
                const lineTotal = product.price * quantity;
                return (
                  <div
                    key={product.id}
                    className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#FAF7F2]">
                        <SafeImage
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-serif text-sm font-bold text-[#1C140E]">
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#8C6D58] mt-0.5">
                          Quantity: <strong className="font-mono text-[#1C140E]">{quantity}</strong> × ${product.price}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-base font-bold text-[#1C140E] tabular-nums">
                        ${lineTotal}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Price Breakdown & Action */}
        <div className="lg:col-span-4">
          <div className="bg-[#FAF7F2] rounded-xl border border-[#EBE4D8] p-6 shadow-xs sticky top-28">
            <h2 className="font-serif text-lg font-bold text-[#1C140E] pb-3 mb-3 border-b border-[#E8DFC0]">
              Payment Summary
            </h2>

            <div className="space-y-2.5 text-xs text-[#5C4536] pb-4 border-b border-[#E8DFC0]">
              <div className="flex justify-between items-center">
                <span>Subtotal ({cart.length} distinct dishes)</span>
                <span className="font-mono font-semibold text-[#1C140E] tabular-nums">
                  ${subtotal}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery & Care</span>
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
              <div>
                <div className="font-serif text-lg font-bold text-[#1C140E]">
                  Final Total Amount
                </div>
                <div className="text-[11px] text-[#8C6D58]">
                  Includes all food preparation & taxes
                </div>
              </div>
              <span className="font-mono text-3xl font-bold text-[#D97706] tabular-nums">
                ${total}
              </span>
            </div>

            <button
              type="button"
              onClick={onOrderAndPay}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg bg-[#1C140E] hover:bg-[#342216] text-[#FAF7F2] font-semibold text-sm tracking-wide transition-all shadow-md active:scale-[0.99] cursor-pointer"
            >
              <span>ORDER AND PAY</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-4 p-3 bg-white rounded-lg border border-[#EBE4D8] text-[11px] text-[#7D6453] space-y-1">
              <p className="font-semibold text-[#1C140E]">Payment Method: Direct Bank Transfer</p>
              <p>
                Clicking "ORDER AND PAY" will generate your official invoice and present our restaurant banking details for wire transfer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
