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
  category: 'dairy, chilled & eggs' | 'food cupboard' | 'drinks' | 'frozen' | 'fruits & vegetables' | 'health & wellness';
  subCategory?: string;
  description: string;
  unit?: string;
  isOnlineExclusive?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
