export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: '雑貨' | 'アパレル' | 'バッグ';
  images: string[];
  stock: number;
  details: string;
}

export interface CartItem extends Product {
  quantity: number;
}
