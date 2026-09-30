export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'mains' | 'comfort' | 'soups' | 'breakfast' | 'celebration';
  categoryLabel: string;
  prepTime: string;
  calories?: string;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  deliveryNotes?: string;
}

export interface PaymentDetails {
  customerName: string;
  email: string;
  amountPaid: string;
  transactionReference: string;
  screenshotName?: string;
  screenshotDataUrl?: string;
  notes?: string;
}

export interface PlacedOrder {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  shipping: ShippingAddress;
  payment: PaymentDetails;
  status: 'Pending Verification' | 'Payment Verified' | 'Preparing in Kitchen' | 'Out for Delivery';
}

export type AppStep = 'menu' | 'cart' | 'shipping' | 'summary' | 'payment' | 'confirmation';
