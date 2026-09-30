import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, User, Mail, Phone, MapPin, Building, Globe, CheckCircle2 } from 'lucide-react';
import { ShippingAddress } from '../types';

interface ShippingPageProps {
  initialAddress: ShippingAddress;
  subtotal: number;
  total: number;
  onSaveAndContinue: (address: ShippingAddress) => void;
  onBackToCart: () => void;
}

export const ShippingPage: React.FC<ShippingPageProps> = ({
  initialAddress,
  subtotal,
  total,
  onSaveAndContinue,
  onBackToCart,
}) => {
  const [formData, setFormData] = useState<ShippingAddress>(initialAddress);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = 'Please provide a valid phone number';
    }

    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = 'Street Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State / Province is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal Code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof ShippingAddress, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSaveAndContinue(formData);
    } else {
      // Mark all touched to display errors
      const allTouched: Record<string, boolean> = {
        fullName: true,
        email: true,
        phone: true,
        streetAddress: true,
        city: true,
        state: true,
        country: true,
        postalCode: true,
      };
      setTouched(allTouched);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Navigation */}
      <button
        type="button"
        onClick={onBackToCart}
        className="inline-flex items-center gap-1.5 text-xs text-[#8C6D58] hover:text-[#1C140E] transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Cart</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl border border-[#EBE4D8] p-6 sm:p-8 shadow-xs">
            <div className="mb-6 pb-4 border-b border-[#F2ECE1]">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C140E]">
                Delivery & Contact Information
              </h1>
              <p className="text-xs sm:text-sm text-[#7D6453] mt-1">
                Please provide your recipient details so our dispatch team can safely deliver your order.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#5C4536] mb-1.5"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9E8675]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    placeholder="e.g. Eleanor Vance"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm text-[#1C140E] bg-[#FAF7F2] focus:bg-white focus:outline-hidden transition-all ${
                      touched.fullName && errors.fullName
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-[#E0D8CB] focus:border-[#1C140E]'
                    }`}
                  />
                </div>
                {touched.fullName && errors.fullName && (
                  <p className="mt-1 text-xs text-red-600 font-medium">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C4536] mb-1.5"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9E8675]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="name@example.com"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm text-[#1C140E] bg-[#FAF7F2] focus:bg-white focus:outline-hidden transition-all ${
                        touched.email && errors.email
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-[#E0D8CB] focus:border-[#1C140E]'
                      }`}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="mt-1 text-xs text-red-600 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C4536] mb-1.5"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9E8675]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      placeholder="+1 (555) 019-2834"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm text-[#1C140E] bg-[#FAF7F2] focus:bg-white focus:outline-hidden transition-all ${
                        touched.phone && errors.phone
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-[#E0D8CB] focus:border-[#1C140E]'
                      }`}
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="mt-1 text-xs text-red-600 font-medium">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label
                  htmlFor="streetAddress"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#5C4536] mb-1.5"
                >
                  Street Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9E8675]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    id="streetAddress"
                    type="text"
                    required
                    value={formData.streetAddress}
                    onChange={(e) => handleChange('streetAddress', e.target.value)}
                    onBlur={() => handleBlur('streetAddress')}
                    placeholder="124 Harvest Hill Road, Apt 4B"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm text-[#1C140E] bg-[#FAF7F2] focus:bg-white focus:outline-hidden transition-all ${
                      touched.streetAddress && errors.streetAddress
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-[#E0D8CB] focus:border-[#1C140E]'
                    }`}
                  />
                </div>
                {touched.streetAddress && errors.streetAddress && (
                  <p className="mt-1 text-xs text-red-600 font-medium">
                    {errors.streetAddress}
                  </p>
                )}
              </div>

              {/* City, State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C4536] mb-1.5"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9E8675]">
                      <Building className="w-4 h-4" />
                    </div>
                    <input
                      id="city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      onBlur={() => handleBlur('city')}
                      placeholder="San Francisco"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm text-[#1C140E] bg-[#FAF7F2] focus:bg-white focus:outline-hidden transition-all ${
                        touched.city && errors.city
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-[#E0D8CB] focus:border-[#1C140E]'
                      }`}
                    />
                  </div>
                  {touched.city && errors.city && (
                    <p className="mt-1 text-xs text-red-600 font-medium">
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C4536] mb-1.5"
                  >
                    State / Region <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="state"
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    onBlur={() => handleBlur('state')}
                    placeholder="California"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#1C140E] bg-[#FAF7F2] focus:bg-white focus:outline-hidden transition-all ${
                      touched.state && errors.state
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-[#E0D8CB] focus:border-[#1C140E]'
                    }`}
                  />
                  {touched.state && errors.state && (
                    <p className="mt-1 text-xs text-red-600 font-medium">
                      {errors.state}
                    </p>
                  )}
                </div>
              </div>

              {/* Country, Postal Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="country"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C4536] mb-1.5"
                  >
                    Country <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9E8675]">
                      <Globe className="w-4 h-4" />
                    </div>
                    <input
                      id="country"
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => handleChange('country', e.target.value)}
                      onBlur={() => handleBlur('country')}
                      placeholder="United States"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm text-[#1C140E] bg-[#FAF7F2] focus:bg-white focus:outline-hidden transition-all ${
                        touched.country && errors.country
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-[#E0D8CB] focus:border-[#1C140E]'
                      }`}
                    />
                  </div>
                  {touched.country && errors.country && (
                    <p className="mt-1 text-xs text-red-600 font-medium">
                      {errors.country}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C4536] mb-1.5"
                  >
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                    onBlur={() => handleBlur('postalCode')}
                    placeholder="94107"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#1C140E] bg-[#FAF7F2] focus:bg-white focus:outline-hidden transition-all font-mono ${
                      touched.postalCode && errors.postalCode
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-[#E0D8CB] focus:border-[#1C140E]'
                    }`}
                  />
                  {touched.postalCode && errors.postalCode && (
                    <p className="mt-1 text-xs text-red-600 font-medium">
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>

              {/* Special Delivery Instructions */}
              <div>
                <label
                  htmlFor="deliveryNotes"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#5C4536] mb-1.5"
                >
                  Delivery Notes / Gate Code <span className="text-[#8C6D58] lowercase font-normal">(optional)</span>
                </label>
                <textarea
                  id="deliveryNotes"
                  rows={2}
                  value={formData.deliveryNotes || ''}
                  onChange={(e) => handleChange('deliveryNotes', e.target.value)}
                  placeholder="e.g. Ring buzzer 4B, leave package on the porch"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E0D8CB] text-sm text-[#1C140E] bg-[#FAF7F2] focus:bg-white focus:border-[#1C140E] focus:outline-hidden transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg bg-[#1C140E] hover:bg-[#342216] text-[#FAF7F2] font-semibold text-sm tracking-wide transition-all shadow-md active:scale-[0.99] cursor-pointer"
                >
                  <span>CONTINUE TO PAYMENT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-4">
          <div className="bg-[#F7F2EA] rounded-xl border border-[#EBE4D8] p-6 sticky top-28">
            <h2 className="font-serif text-lg font-bold text-[#1C140E] mb-3">
              Order Total
            </h2>
            <div className="flex justify-between items-baseline py-2 border-b border-[#E8DFC0]">
              <span className="text-sm text-[#5C4536]">Subtotal</span>
              <span className="font-mono font-bold text-[#1C140E]">${subtotal}</span>
            </div>
            <div className="flex justify-between items-baseline py-3 border-b border-[#E8DFC0]">
              <span className="text-base font-serif font-bold text-[#1C140E]">Total Due</span>
              <span className="font-mono text-2xl font-bold text-[#D97706]">${total}</span>
            </div>

            <div className="mt-4 space-y-2 text-xs text-[#7D6453]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Encrypted recipient info</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Next step: review order & pay via Bank Transfer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
