import React, { useRef } from 'react';
import { CheckCircle2, Clock, Printer, ArrowRight, Utensils, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { PlacedOrder } from '../types';

interface OrderSuccessViewProps {
  order: PlacedOrder;
  onOrderAgain: () => void;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({
  order,
  onOrderAgain,
}) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Success Hero Card */}
      <div className="bg-white rounded-2xl border border-[#EBE4D8] p-6 sm:p-10 shadow-sm text-center mb-8">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-emerald-50/50">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        {/* Mandatory exact wording specified in the prompt */}
        <div className="max-w-xl mx-auto space-y-3">
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C140E]">
            Thank You for Your Order!
          </h1>

          <div className="p-4 sm:p-5 rounded-xl bg-[#FAF7F2] border border-[#EBE4D8] text-sm sm:text-base text-[#453327] leading-relaxed">
            <p className="font-medium text-[#1C140E]">
              "Thank you for your order. Your payment confirmation has been received. Please wait for our team to verify your payment. A confirmation email will be sent once your order is approved."
            </p>
          </div>
        </div>

        {/* Order Identifier & Status */}
        <div className="mt-6 pt-6 border-t border-[#F2ECE1] flex flex-wrap items-center justify-center gap-4 text-xs">
          <div>
            <span className="text-[#8C6D58] block">Order Reference:</span>
            <span className="font-mono text-base font-bold text-[#1C140E]">
              {order.orderId}
            </span>
          </div>
          <span className="text-[#D5CABC] hidden sm:inline">|</span>
          <div>
            <span className="text-[#8C6D58] block">Order Placed:</span>
            <span className="font-medium text-[#1C140E]">
              {new Date(order.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <span className="text-[#D5CABC] hidden sm:inline">|</span>
          <div>
            <span className="text-[#8C6D58] block">Current Status:</span>
            <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
              <Clock className="w-3.5 h-3.5" />
              {order.status}
            </span>
          </div>
        </div>
      </div>

      {/* Printable Receipt Section */}
      <div
        ref={receiptRef}
        className="bg-white rounded-xl border border-[#EBE4D8] p-6 sm:p-8 shadow-xs mb-8 print:border-none print:shadow-none"
      >
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#F2ECE1]">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1C140E]">
              Official Receipt & Order Summary
            </h2>
            <p className="text-xs text-[#8C6D58]">
              Taste Haven Restaurant · Artisanal Kitchen
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E0D8CB] text-xs font-semibold text-[#5C4536] hover:bg-[#FAF7F2] transition-colors cursor-pointer print:hidden"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Customer & Payment Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 mb-6 border-b border-[#F2ECE1] text-xs text-[#5C4536]">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-[#8C6D58] font-bold block mb-1">
              Customer Details
            </span>
            <p className="font-semibold text-[#1C140E]">{order.shipping.fullName}</p>
            <p className="flex items-center gap-1 text-[#614E3F]">
              <Mail className="w-3 h-3 text-[#9E8675]" />
              {order.shipping.email}
            </p>
            <p className="flex items-center gap-1 text-[#614E3F]">
              <MapPin className="w-3 h-3 text-[#9E8675]" />
              {order.shipping.streetAddress}, {order.shipping.city},{' '}
              {order.shipping.state} {order.shipping.postalCode}
            </p>
          </div>

          <div className="space-y-1 sm:border-l border-[#F2ECE1] sm:pl-4">
            <span className="text-[11px] uppercase tracking-wider text-[#8C6D58] font-bold block mb-1">
              Payment Verification Details
            </span>
            <p>
              Method: <strong>Bank Transfer</strong>
            </p>
            <p>
              Reference No:{' '}
              <strong className="font-mono text-[#1C140E]">
                {order.payment.transactionReference}
              </strong>
            </p>
            <p>
              Amount Paid:{' '}
              <strong className="font-mono text-emerald-700">
                ${order.payment.amountPaid}
              </strong>
            </p>
            {order.payment.screenshotName && (
              <p className="text-[#8C6D58]">
                Screenshot Attached: {order.payment.screenshotName}
              </p>
            )}
          </div>
        </div>

        {/* Itemized Order List */}
        <div className="space-y-3 mb-6">
          <span className="text-[11px] uppercase tracking-wider text-[#8C6D58] font-bold block mb-2">
            Dishes Ordered
          </span>
          <div className="divide-y divide-[#F5EFE6]">
            {order.items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="py-2.5 flex items-center justify-between text-xs text-[#5C4536]"
              >
                <div>
                  <span className="font-semibold text-[#1C140E]">
                    {product.name}
                  </span>
                  <span className="text-[#8C6D58] ml-2">
                    Item: {product.name} x{quantity}
                  </span>
                </div>
                <div className="font-mono font-medium text-[#1C140E]">
                  ${product.price * quantity}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="pt-4 border-t border-[#F2ECE1] space-y-1.5 text-xs text-[#5C4536]">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-mono">${order.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span className="font-mono">
              {order.deliveryFee === 0 ? 'FREE' : `$${order.deliveryFee}`}
            </span>
          </div>
          <div className="flex justify-between items-baseline pt-2 border-t border-[#E8DFC0] text-sm">
            <span className="font-bold text-[#1C140E]">Final Total Amount</span>
            <span className="font-mono text-xl font-bold text-[#D97706]">
              ${order.total}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onOrderAgain}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-[#1C140E] hover:bg-[#342216] text-[#FAF7F2] font-semibold text-sm transition-all shadow-md cursor-pointer"
        >
          <Utensils className="w-4 h-4 text-[#E6A15C]" />
          <span>Place Another Order</span>
        </button>
      </div>
    </div>
  );
};
