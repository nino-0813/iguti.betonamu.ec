
import { Product, Category } from './types';

export const CATEGORIES = Object.values(Category);

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'set-1',
    name: '【空間提案】エステサロン向け ベトナム癒やしセット（4点）',
    category: Category.SET,
    price: 15800,
    originalPrice: 18500,
    rating: 4.9,
    reviewCount: 32,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=400&h=400',
    description: 'エステサロンの受付や施術室に。リラックスできる空間をトータルコーディネートします。',
    items: ['ラタン編みかご（タオル収納用）', 'バッチャン焼き アロマ皿', 'バッチャン焼き 一輪挿し', '手書きタイル壁掛け'],
    isPrime: true,
    stockCount: 5
  },
  {
    id: 'set-2',
    name: '【空間提案】ホテル・旅館向け プレミアム客室セット（4点）',
    category: Category.SET,
    price: 12800,
    originalPrice: 14000,
    rating: 4.7,
    reviewCount: 18,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400&h=400',
    description: '宿泊施設のアメニティ置きや装飾に。統一感のあるバッチャン焼きで高級感を演出。',
    items: ['アメニティ用かご', 'バッチャン焼き 小皿・石鹸置き', '客室用一輪挿し', '装飾用タイル'],
    isPrime: true,
    stockCount: 10
  },
  {
    id: '1',
    name: 'バチャン焼 茶器セット 急須 湯呑み6客 手書き 蓮の花',
    category: Category.KITCHEN,
    price: 5800,
    originalPrice: 7200,
    rating: 4.5,
    reviewCount: 128,
    image: 'https://picsum.photos/seed/batchang/400/400',
    description: 'ハノイ近郊のバチャン村で作られた伝統的な陶磁器。',
    isPrime: true,
    stockCount: 15
  },
  {
    id: '2',
    name: 'ベトナムコーヒー G7 インスタント 3in1 (16g x 50包)',
    category: Category.COFFEE,
    price: 1980,
    rating: 4.8,
    reviewCount: 2450,
    image: 'https://picsum.photos/seed/coffee/400/400',
    description: '中原（チュングエン）コーヒーの人気No.1インスタントコーヒー。',
    isPrime: true,
    stockCount: 100
  },
  {
    id: '3',
    name: 'アオザイ 既製品 刺繍デザイン シルク調 選べるカラー',
    category: Category.FASHION,
    price: 8900,
    originalPrice: 12000,
    rating: 4.2,
    reviewCount: 45,
    image: 'https://picsum.photos/seed/aodai/400/400',
    description: 'ベトナムの正装アオザイ。普段使いもしやすいモダンなデザイン。',
    isPrime: false,
    stockCount: 8
  },
  {
    id: '4',
    name: 'ホイアン 提灯 ランタン 無地/シルク生地 Mサイズ 30cm',
    category: Category.INTERIOR,
    price: 2400,
    rating: 4.6,
    reviewCount: 89,
    image: 'https://picsum.photos/seed/lantern/400/400',
    description: 'ホイアンの夜を彩る幻想的なランタン。折りたたみ可能。',
    isPrime: true,
    stockCount: 20
  },
  {
    id: '5',
    name: 'ベトナム産 ライスペーパー (直径22cm) 500g',
    category: Category.FOOD,
    price: 680,
    rating: 4.7,
    reviewCount: 320,
    image: 'https://picsum.photos/seed/ricepaper/400/400',
    description: '生春巻きの必須アイテム。破れにくく使いやすいプロ仕様。',
    isPrime: true,
    stockCount: 200
  },
  {
    id: '7',
    name: 'ベトナムコーヒーフィルター アルミ製 100ml',
    category: Category.KITCHEN,
    price: 850,
    rating: 4.5,
    reviewCount: 560,
    image: 'https://picsum.photos/seed/filter/400/400',
    description: 'ベトナム式コーヒーを楽しむための伝統的なフィルター。',
    isPrime: true,
    stockCount: 150
  }
];
