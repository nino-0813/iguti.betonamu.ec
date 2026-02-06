
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
    stockCount: 5,
    featuredOrder: 1,
    storyTitle: '空間に、ベトナムの「息づかい」を。',
    story: 'エステサロンの方から「お客様がもっとリラックスできる空間にしたい」というご相談をいただきました。ラタンのかご、バッチャン焼きのアロマ皿と一輪挿し、手書きタイル。どれも現地の職人が一つずつ手がけたものです。置いたその日から、施術室の空気が変わったとおっしゃっていました。'
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
    stockCount: 10,
    featuredOrder: 2,
    storyTitle: '一室ごとに、物語を。',
    story: 'ホテルや旅館の客室は、お客様が最も長く過ごす場所。そこで「どこか遠くに来た」と感じてもらえるように、ベトナムの職人仕事をまとめたセットをご用意しました。アメニティ置きから装飾まで、統一感のあるバッチャン焼きで、滞在の記憶を残します。'
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
    stockCount: 15,
    featuredOrder: 3,
    storyTitle: '1000年続く窯元の、一客一客。',
    story: 'ハノイ近郊・バチャン村の陶芸は、千年以上の歴史があります。この茶器セットは、蓮の花を手書きで描いた一点ものに近い仕上がり。急須と湯呑み6客で、日常のお茶が少しだけ特別な時間に変わります。'
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
    stockCount: 20,
    featuredOrder: 5,
    storyTitle: 'ホイアンの灯りを、おうちに。',
    story: '世界遺産の古い街・ホイアンは、夜になると無数のランタンが灯ります。このランタンは、現地で使われているのと同じシルク生地を使ったMサイズ。折りたたみ可能なので、インテリアはもちろん、イベントや写真撮影にも。一灯で空間が変わります。'
  }
];

/** トップで紹介する厳選商品（3〜5点）。featuredOrder の昇順 */
export function getFeaturedProducts(products: Product[]): Product[] {
  return products
    .filter((p): p is Product & { featuredOrder: number } => p.featuredOrder != null)
    .sort((a, b) => a.featuredOrder - b.featuredOrder);
}
