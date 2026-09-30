import React, { useState } from 'react';
import {
  Building2,
  Copy,
  Check,
  UploadCloud,
  FileImage,
  X,
  ShieldCheck,
  ArrowLeft,
  AlertCircle,
  HelpCircle,
  Receipt,
} from 'lucide-react';
import { PaymentDetails, ShippingAddress } from '../types';

interface PaymentPageProps {
  total: number;
  shipping: ShippingAddress;
  onBackToSummary: () => void;
  onSubmitPayment: (payment: PaymentDetails) => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  total,
  shipping,
  onBackToSummary,
  onSubmitPayment,
}) => {
  // Configurable bank details (placeholder that can easily be changed)
  const [bankName, setBankName] = useState('First Reserve National Bank');
  const [isEditingBank, setIsEditingBank] = useState(false);

  const accountName = 'Taste Haven Restaurant';
  const accountNumber = '1234567890';
  const routingNumber = '021000089';

  // Form state
  const [customerName, setCustomerName] = useState(shipping.fullName || '');
  const [email, setEmail] = useState(shipping.email || '');
  const [amountPaid, setAmountPaid] = useState(total.toString());
  const [transactionReference, setTransactionReference] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({
        ...prev,
        screenshot: 'Please upload an image file (PNG, JPG, JPEG, WEBP)',
      }));
      return;
    }
    setScreenshotFile(file);
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.screenshot;
      return copy;
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      setScreenshotPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeScreenshot = () => {
    setScreenshotFile(null);
    setScreenshotPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!customerName.trim()) {
      newErrors.customerName = 'Customer Name is required';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Valid Email Address is required';
    }
    if (!amountPaid || isNaN(Number(amountPaid)) || Number(amountPaid) <= 0) {
      newErrors.amountPaid = 'Please enter a valid amount paid';
    }
    if (!transactionReference.trim()) {
      newErrors.transactionReference =
        'Transaction Reference Number is required';
    }
    if (!screenshotFile && !screenshotPreview) {
      newErrors.screenshot =
        'Please upload a payment screenshot or wire receipt';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitPayment({
        customerName: customerName.trim(),
        email: email.trim(),
        amountPaid: amountPaid.trim(),
        transactionReference: transactionReference.trim(),
        screenshotName: screenshotFile?.name || 'payment_receipt.png',
        screenshotDataUrl: screenshotPreview || undefined,
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBackToSummary}
        className="inline-flex items-center gap-1.5 text-xs text-[#8C6D58] hover:text-[#1C140E] transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Order Summary</span>
      </button>

      {/* Page Title */}
      <div className="mb-8 pb-4 border-b border-[#EBE4D8]">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C140E]">
          Complete Your Payment
        </h1>
        <p className="text-xs sm:text-sm text-[#7D6453] mt-1.5">
          Follow the bank instructions below to transfer your funds, then submit your transaction reference and screenshot for instant verification.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Bank Transfer Instructions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#1C140E] text-[#FAF7F2] rounded-xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
            {/* Subtle decorative gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#B45309]" />

            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#E6A15C]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#D5CABC] font-semibold block">
                    Payment Method
                  </span>
                  <span className="font-serif text-lg font-bold text-[#FAF7F2]">
                    Bank Transfer
                  </span>
                </div>
              </div>

              {/* Amount to pay badge */}
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-[#D5CABC] block">
                  Amount To Pay
                </span>
                <span className="font-mono text-2xl font-bold text-[#F59E0B] tabular-nums">
                  ${total}
                </span>
              </div>
            </div>

            <div className="space-y-4 text-xs bg-white/5 rounded-lg p-4 border border-white/10">
              {/* Bank Name */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-[#A89485] block text-[11px]">Bank Name</span>
                  {isEditingBank ? (
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      onBlur={() => setIsEditingBank(false)}
                      autoFocus
                      className="bg-black/50 text-white px-2 py-1 rounded text-xs border border-amber-500 font-semibold mt-1"
                    />
                  ) : (
                    <span className="font-semibold text-white text-sm">
                      {bankName}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingBank(!isEditingBank)}
                  className="text-[10px] text-[#E6A15C] hover:underline cursor-pointer"
                >
                  {isEditingBank ? 'Done' : 'Change Bank'}
                </button>
              </div>

              {/* Account Name */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-[#A89485] block text-[11px]">Account Name</span>
                  <span className="font-semibold text-white text-sm">
                    {accountName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(accountName, 'accountName')}
                  className="inline-flex items-center gap-1 text-[11px] text-[#FAF7F2] bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors cursor-pointer"
                  title="Copy Account Name"
                >
                  {copiedField === 'accountName' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Account Number */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-[#A89485] block text-[11px]">Account Number</span>
                  <span className="font-mono text-base font-bold text-[#F59E0B] tracking-wider">
                    {accountNumber}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(accountNumber, 'accountNumber')}
                  className="inline-flex items-center gap-1 text-[11px] text-[#FAF7F2] bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded transition-colors cursor-pointer"
                  title="Copy Account Number"
                >
                  {copiedField === 'accountNumber' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Swift / Routing */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[#A89485] block text-[11px]">Routing / Wire Code</span>
                  <span className="font-mono font-medium text-white/90">
                    {routingNumber}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(routingNumber, 'routing')}
                  className="inline-flex items-center gap-1 text-[11px] text-[#FAF7F2] bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors cursor-pointer"
                >
                  {copiedField === 'routing' ? (
                    <span className="text-emerald-400">Copied</span>
                  ) : (
                    <span>Copy</span>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#D5CABC]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E6A15C]" />
                Taste Haven Culinary Treasury
              </span>
              <span className="font-mono">Reference: TH-PAY</span>
            </div>
          </div>

          {/* Transfer Instructions Checklist */}
          <div className="bg-white rounded-xl border border-[#EBE4D8] p-5 text-xs text-[#5C4536] space-y-3">
            <h3 className="font-serif font-bold text-[#1C140E] text-sm">
              Quick Payment Steps:
            </h3>
            <ol className="list-decimal pl-4 space-y-2 leading-relaxed text-[#614E3F]">
              <li>
                Open your online banking app or visit your bank branch.
              </li>
              <li>
                Send exactly <strong className="font-mono text-[#1C140E]">${total}</strong> to the account details above.
              </li>
              <li>
                Take a screenshot of the completed transaction or save the reference receipt.
              </li>
              <li>
                Fill in the confirmation form on the right and click <strong>"SUBMIT PAYMENT CONFIRMATION"</strong>.
              </li>
            </ol>
          </div>
        </div>

        {/* Right Column: Payment Confirmation Form */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-xl border border-[#EBE4D8] p-6 sm:p-7 shadow-xs">
            <div className="mb-5 pb-3 border-b border-[#F2ECE1]">
              <h2 className="font-serif text-xl font-bold text-[#1C140E]">
                Payment Confirmation Form
              </h2>
              <p className="text-xs text-[#7D6453] mt-0.5">
                Submit your transaction details so our finance team can verify and approve your order.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Customer Name */}
              <div>
                <label
                  htmlFor="customerName"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#5C4536] mb-1.5"
                >
                  Customer Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="customerName"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter full name used in payment"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#1C140E] bg-[#FAF7F2] focus:bg-white focus:outline-hidden transition-all ${
                    errors.customerName
                      ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-[#E0D8CB] focus:border-[#1C140E]'
                  }`}
                />
                {errors.customerName && (
                  <p className="mt-1 text-xs text-red-600 font-medium">
                    {errors.customerName}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="payEmail"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#5C4536] mb-1.5"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="payEmail"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Where to send confirmation receipt"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#1C140E] bg-[#FAF7F2] focus:bg-white focus:outline-hidden transition-all ${
                    errors.email
                      ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-[#E0D8CB] focus:border-[#1C140E]'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Amount Paid & Transaction Reference Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="amountPaid"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C4536] mb-1.5"
                  >
                    Amount Paid ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-sm font-bold text-[#8C6D58]">
                      $
                    </span>
                    <input
                      id="amountPaid"
                      type="text"
                      required
                      value={amountPaid}
                      onChange={(e) => setAmountPaid(e.target.value)}
                      placeholder={total.toString()}
                      className={`w-full pl-7 pr-3.5 py-2.5 rounded-lg border text-sm font-mono font-semibold text-[#1C140E] bg-[#FAF7F2] focus:bg-white focus:outline-hidden transition-all ${
                        errors.amountPaid
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-[#E0D8CB] focus:border-[#1C140E]'
                      }`}
                    />
                  </div>
                  {errors.amountPaid && (
                    <p className="mt-1 text-xs text-red-600 font-medium">
                      {errors.amountPaid}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="transactionReference"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C4536] mb-1.5"
                  >
                    Transaction Reference <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="transactionReference"
                    type="text"
                    required
                    value={transactionReference}
                    onChange={(e) => setTransactionReference(e.target.value)}
                    placeholder="e.g. TXN-89410928"
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-mono text-[#1C140E] bg-[#FAF7F2] focus:bg-white focus:outline-hidden transition-all ${
                      errors.transactionReference
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-[#E0D8CB] focus:border-[#1C140E]'
                    }`}
                  />
                  {errors.transactionReference && (
                    <p className="mt-1 text-xs text-red-600 font-medium">
                      {errors.transactionReference}
                    </p>
                  )}
                </div>
              </div>

              {/* Upload Payment Screenshot */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4536] mb-1.5">
                  Upload Payment Screenshot <span className="text-red-500">*</span>
                </label>

                {!screenshotPreview ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className={`border-2 border-dashed rounded-xl p-5 text-center transition-all bg-[#FAF7F2] cursor-pointer hover:bg-[#F5EFE6] ${
                      errors.screenshot
                        ? 'border-red-400 bg-red-50/50'
                        : 'border-[#D5CABC]'
                    }`}
                    onClick={() =>
                      document.getElementById('screenshotFileInput')?.click()
                    }
                  >
                    <input
                      id="screenshotFileInput"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-full bg-[#EFEAE1] text-[#B45309] flex items-center justify-center mx-auto mb-2">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-[#1C140E]">
                      Click to upload receipt screenshot or drag & drop
                    </p>
                    <p className="text-[11px] text-[#8C6D58] mt-1">
                      PNG, JPG, or WEBP (Max 10MB)
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-[#D5CABC] p-3 bg-[#FAF7F2] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#E0D8CB]">
                        <img
                          src={screenshotPreview}
                          alt="Payment screenshot receipt preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-semibold text-[#1C140E] truncate">
                          {screenshotFile?.name || 'payment_confirmation.png'}
                        </p>
                        <p className="text-[11px] text-emerald-700 font-medium">
                          Receipt attached & ready
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeScreenshot}
                      className="p-1.5 text-[#8C6D58] hover:text-red-700 rounded-lg hover:bg-white transition-colors cursor-pointer"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {errors.screenshot && (
                  <p className="mt-1 text-xs text-red-600 font-medium">
                    {errors.screenshot}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-4 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-sm uppercase tracking-wider transition-all shadow-md active:scale-[0.99] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Verifying Transfer Details...</span>
                  ) : (
                    <span>SUBMIT PAYMENT CONFIRMATION</span>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-[#8C6D58] pt-2">
                🔒 Verification queue is monitored by our kitchen and dispatch staff 7 days a week.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
