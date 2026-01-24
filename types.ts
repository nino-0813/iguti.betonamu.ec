
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  isPrime: boolean;
  stockCount: number;
  items?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum Category {
  ALL = 'すべて',
  SET = '空間提案セット',
  FASHION = 'ファッション・雑貨',
  FOOD = '食品・飲料',
  KITCHEN = 'キッチン用品',
  INTERIOR = 'インテリア',
  COFFEE = 'ベトナムコーヒー'
}
