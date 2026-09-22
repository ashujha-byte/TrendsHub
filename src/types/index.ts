export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price: number | null;
  description: string;
  sizes: string[];
  images: string[];
  trending: boolean;
  rating: number;
  review_count: number;
  badge: string | null;
  stock: number;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Address {
  id: string;
  label: string;
  full_name: string;
  phone: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

export interface OrderRecord {
  id: string;
  status: string;
  total: number;
  payment_method: string;
  coupon_code: string | null;
  discount: number;
  created_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  product_name: string;
  product_image: string;
  size: string;
  quantity: number;
  price: number;
}

export type Page = 'home' | 'shop' | 'profile';
export type Category = 'All' | 'Daily Wear Kurtis' | 'Festive Kurti Sets' | 'Dupatta Sets';
export type SortOption = 'trending' | 'price-low' | 'price-high';
