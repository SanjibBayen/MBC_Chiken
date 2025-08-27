export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  variants: {
    name: string; // "500g", "1kg"
    price: number;
    stock: number;
  }[];
  images: string[];
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface CartItem {
  productId: string;
  variantName: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
  slug: string;
}

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    status: 'Pending' | 'Processing' | 'Delivered' | 'Cancelled';
    deliveryAddress: {
        name: string;
        address: string;
        city: string;
        pincode: string;
        phone: string;
    };
    deliverySlot?: string;
}
