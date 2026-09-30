import React, { useState, useEffect, useMemo } from 'react';
import {
  Product,
  CartItem,
  ShippingAddress,
  PaymentDetails,
  PlacedOrder,
  AppStep,
} from './types';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CartPage } from './components/CartPage';
import { ShippingPage } from './components/ShippingPage';
import { OrderSummaryPage } from './components/OrderSummaryPage';
import { PaymentPage } from './components/PaymentPage';
import { OrderSuccessView } from './components/OrderSuccessView';
import { Footer } from './components/Footer';
import { MobileCartBar } from './components/MobileCartBar';
import {
  Search,
  Sparkles,
  Flame,
  Award,
  Truck,
  HeartHandshake,
  CheckCircle,
} from 'lucide-react';

const LOCAL_STORAGE_CART_KEY = 'taste_haven_cart_v1';
const LOCAL_STORAGE_SHIPPING_KEY = 'taste_haven_shipping_v1';
const LOCAL_STORAGE_ORDERS_KEY = 'taste_haven_orders_v1';

export default function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('menu');

  // Search & Category Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Cart State with Local Storage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Shipping Address State with Local Storage persistence
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SHIPPING_KEY);
      return saved
        ? JSON.parse(saved)
        : {
            fullName: '',
            email: '',
            phone: '',
            streetAddress: '',
            city: '',
            state: '',
            country: 'United States',
            postalCode: '',
            deliveryNotes: '',
          };
    } catch {
      return {
        fullName: '',
        email: '',
        phone: '',
        streetAddress: '',
        city: '',
        state: '',
        country: 'United States',
        postalCode: '',
        deliveryNotes: '',
      };
    }
  });

  // Latest Placed Order
  const [currentOrder, setCurrentOrder] = useState<PlacedOrder | null>(null);

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  // Persist shipping address
  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_SHIPPING_KEY,
        JSON.stringify(shippingAddress)
      );
    } catch {
      // storage unavailable
    }
  }, [shippingAddress]);

  // Calculations
  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  const deliveryFee = useMemo(() => {
    if (cart.length === 0) return 0;
    return subtotal >= 150 ? 0 : 5;
  }, [subtotal, cart.length]);

  const total = useMemo(() => {
    return subtotal + deliveryFee;
  }, [subtotal, deliveryFee]);

  const cartCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  // Cart operations
  const handleAddToCart = (product: Product, quantityToAdd: number) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantityToAdd,
        };
        return updated;
      } else {
        return [...prevCart, { product, quantity: quantityToAdd }];
      }
    });

    showToast(`Added ${quantityToAdd} × ${product.name} to cart`);
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCart([]);
      showToast('Cart cleared');
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2800);
  };

  // Navigation handlers
  const handleProceedToShipping = () => {
    if (cart.length === 0) return;
    setCurrentStep('shipping');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveShippingAndContinue = (address: ShippingAddress) => {
    setShippingAddress(address);
    setCurrentStep('summary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderAndPay = () => {
    setCurrentStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitPaymentConfirmation = (payment: PaymentDetails) => {
    const newOrderId = `TH-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: PlacedOrder = {
      orderId: newOrderId,
      createdAt: new Date().toISOString(),
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
      shipping: shippingAddress,
      payment,
      status: 'Pending Verification',
    };

    setCurrentOrder(newOrder);

    // Save to orders history in local storage
    try {
      const existing = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      const orders = existing ? JSON.parse(existing) : [];
      orders.unshift(newOrder);
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
    } catch {
      // storage unavailable
    }

    // Clear cart after placing order
    setCart([]);
    setCurrentStep('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderAgain = () => {
    setCurrentOrder(null);
    setCurrentStep('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C140E]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#1C140E] text-[#FAF7F2] px-4 py-2.5 rounded-lg shadow-lg border border-white/10 text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle className="w-4 h-4 text-[#E6A15C]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Header */}
      <Header
        currentStep={currentStep}
        cartCount={cartCount}
        cartTotal={total}
        onNavigate={(step) => {
          setCurrentStep(step);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Page Routing */}
      <main className="flex-1 pb-16">
        {/* Step 1: Products / Menu Page */}
        {currentStep === 'menu' && (
          <div>
            <Hero
              onScrollToMenu={() => {
                document
                  .getElementById('menu-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Menu Section Container */}
            <section
              id="menu-section"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
            >
              {/* Menu Title & Search / Filter Controls */}
              <div className="mb-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-[#B45309] mb-1">
                      Artisanal Catalog · 18 Fresh Dishes
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C140E]">
                      Our Kitchen Menu
                    </h2>
                  </div>

                  {/* Search Bar */}
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-[#8C6D58] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search dishes, burgers, desserts..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E0D8CB] bg-white text-xs sm:text-sm text-[#1C140E] placeholder-[#9E8675] focus:outline-hidden focus:border-[#1C140E] shadow-2xs"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C6D58] hover:text-[#1C140E]"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Category Filter Tabs (Clean segmented functional buttons) */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                  {[
                    { id: 'all', label: 'All Items (18)' },
                    { id: 'mains', label: 'Signature Mains' },
                    { id: 'comfort', label: 'Comfort Classics' },
                    { id: 'soups', label: 'Soups & Savory' },
                    { id: 'breakfast', label: 'Breakfast & Sweets' },
                    { id: 'celebration', label: 'Cellar & Celebration' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-[#1C140E] text-[#FAF7F2] shadow-xs'
                          : 'bg-white border border-[#EBE4D8] text-[#5C4536] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-xl border border-[#EBE4D8] p-12 text-center max-w-md mx-auto my-8">
                  <p className="font-serif text-lg font-bold text-[#1C140E] mb-2">
                    No dishes found
                  </p>
                  <p className="text-xs text-[#614E3F] mb-4">
                    No items match "{searchQuery}". Try searching for burgers, wings, or ribs.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="text-xs font-semibold text-[#B45309] hover:underline"
                  >
                    Reset Menu Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredProducts.map((product) => {
                    const inCartItem = cart.find(
                      (item) => item.product.id === product.id
                    );
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        cartQuantity={inCartItem ? inCartItem.quantity : 0}
                        onAddToCart={handleAddToCart}
                      />
                    );
                  })}
                </div>
              )}

              {/* Quality & Craftsmanship Section */}
              <div
                id="quality-promise"
                className="mt-20 pt-12 border-t border-[#EBE4D8]"
              >
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#B45309] block mb-2">
                    Our Culinary Standards
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C140E]">
                    The Taste Haven Difference
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7D6453] mt-2">
                    Every order is freshly prepared on demand with uncompromising standards for freshness, warmth, and flavor.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl border border-[#EBE4D8] p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF3EA] text-[#B45309] flex items-center justify-center mx-auto mb-4">
                      <Flame className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif font-bold text-[#1C140E] text-base mb-2">
                      Fire-Grilled & Hickory Smoked
                    </h4>
                    <p className="text-xs text-[#614E3F] leading-relaxed">
                      Our BBQ ribs are slow-cooked for 12 hours and beef patties are flame-grilled over natural charcoal for unbeatable aroma.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl border border-[#EBE4D8] p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF3EA] text-[#B45309] flex items-center justify-center mx-auto mb-4">
                      <Truck className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif font-bold text-[#1C140E] text-base mb-2">
                      Insulated Thermal Delivery
                    </h4>
                    <p className="text-xs text-[#614E3F] leading-relaxed">
                      Dishes are packed in moisture-resistant thermal containers so crispy fries stay crisp and clam chowder arrives steaming hot.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl border border-[#EBE4D8] p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF3EA] text-[#B45309] flex items-center justify-center mx-auto mb-4">
                      <Award className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif font-bold text-[#1C140E] text-base mb-2">
                      Fresh Farm Ingredients
                    </h4>
                    <p className="text-xs text-[#614E3F] leading-relaxed">
                      We partner with local organic farms for dairy, farm-fresh eggs, crisp produce, and premium choice cut steaks.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Step 2: Cart Page */}
        {currentStep === 'cart' && (
          <CartPage
            cart={cart}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onProceedToCheckout={handleProceedToShipping}
            onContinueShopping={() => {
              setCurrentStep('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Step 3: Shipping Address Page */}
        {currentStep === 'shipping' && (
          <ShippingPage
            initialAddress={shippingAddress}
            subtotal={subtotal}
            total={total}
            onSaveAndContinue={handleSaveShippingAndContinue}
            onBackToCart={() => {
              setCurrentStep('cart');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Step 4: Order Summary Page */}
        {currentStep === 'summary' && (
          <OrderSummaryPage
            cart={cart}
            shipping={shippingAddress}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            onEditShipping={() => {
              setCurrentStep('shipping');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOrderAndPay={handleOrderAndPay}
          />
        )}

        {/* Step 5: Payment Page */}
        {currentStep === 'payment' && (
          <PaymentPage
            total={total}
            shipping={shippingAddress}
            onBackToSummary={() => {
              setCurrentStep('summary');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSubmitPayment={handleSubmitPaymentConfirmation}
          />
        )}

        {/* Step 6: Confirmation Screen */}
        {currentStep === 'confirmation' && currentOrder && (
          <OrderSuccessView
            order={currentOrder}
            onOrderAgain={handleOrderAgain}
          />
        )}
      </main>

      {/* Mobile Sticky Cart Bar (15% height rule compliant) */}
      {currentStep === 'menu' && (
        <MobileCartBar
          cartCount={cartCount}
          total={total}
          onOpenCart={() => {
            setCurrentStep('cart');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Restaurant Footer */}
      <Footer
        onNavigateToMenu={() => {
          setCurrentStep('menu');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
