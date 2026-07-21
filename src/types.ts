export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  badgeType?: 'save' | 'any2' | 'spend' | 'hot' | 'buy2' | 'exclusive';
  rating?: number;
  reviewsCount?: number;
  category: 'Groceries' | 'Everything Else' | 'Pharmacy' | 'Wholesale' | 'Store Finder';
  subCategory?: string;
  description: string;
  unit?: string;
  isOnlineExclusive?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
