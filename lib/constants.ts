import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'ハンドメイド 刺繍バッグ',
    description: 'ベトナム北部の少数民族による伝統的な手刺繍が施された一点物のバッグ。',
    price: 8500,
    category: 'バッグ',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544816153-12ad5d714481?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 5,
    details: '素材: コットン、シルク刺繍\nサイズ: 30cm x 25cm\n原産国: ベトナム（サパ）'
  },
  {
    id: '2',
    name: '山岳民族の織物 — インテリアファブリック',
    description: '見本市で出会った、ベトナム山岳民族の手織り布。現地の職人さんから連絡先もいただいた、つながりのある一枚です。本来は頭に巻いたり、赤ちゃんを包んだりする伝統的な使い方がありますが、日本ではインテリアのファブリックとして、テーブルクロスや壁掛けにも。温もりのある暮らしに。',
    price: 12000,
    category: 'アパレル',
    images: [
      '/images/S__60989445.webp',
      '/images/S__60989447_0.webp',
      '/images/S__60989448_0.webp',
      '/images/S__60989449_0.webp',
      '/images/S__60989450_0.webp'
    ],
    stock: 12,
    details: '用途: ヘッドスカーフ、ベビー wrapping、インテリアファブリック\n原産: ベトナム山岳民族の手織り\nお手入れ: 冷水手洗い推奨'
  },
  {
    id: '3',
    name: 'バッチャン焼 ティーセット',
    description: 'ハノイ近郊のバッチャン村で作られた、蓮の花が描かれた伝統的な陶器。',
    price: 6800,
    category: '雑貨',
    images: [
      '/images/S__60956676.webp',
      '/images/S__60956677.webp',
      '/images/S__60956678.webp',
      '/images/S__60956679.webp',
      '/images/S__60956680.webp',
      '/images/S__60956681.webp',
      '/images/S__60956682.webp',
      '/images/S__60956683.webp',
      '/images/S__60956684.webp',
      '/images/S__60956685.webp'
    ],
    stock: 8,
    details: '内容: ポット x 1, カップ x 2\n素材: 陶器\n原産国: ベトナム（バッチャン村）'
  },
  {
    id: '4',
    name: '飼料袋リメイク ポーチ',
    description: '飼料袋をリメイクした、丈夫で味わいのあるポーチ。ペンケースやガジェットケースとして、男性にも使いやすいサイズ感です。一点一点プリントの風合いが違う、世界に一つのアイテム。',
    price: 4500,
    category: 'バッグ',
    images: [
      '/images/S__60964869_0.webp',
      '/images/S__60964870_0.webp',
      '/images/S__60964873_0.webp',
      '/images/S__60964874_0.webp',
      '/images/S__60964876_0.webp',
      '/images/S__60964877_0.webp',
      '/images/S__60964879_0.webp',
      '/images/S__60964880_0.webp',
      '/images/S__60964882_0.webp',
      '/images/S__60964883_0.webp'
    ],
    stock: 6,
    details: '素材: 飼料袋（リメイク）\n用途: ペンケース、ガジェットケース、小物入れ\n男性にも使いやすいサイズ'
  },
  {
    id: '5',
    name: 'シルク スカーフ (手染め)',
    description: 'ベトナム産の最高級シルクを使用し、天然染料で染め上げた贅沢なスカーフ。',
    price: 9800,
    category: 'アパレル',
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 3,
    details: '素材: シルク 100%\nサイズ: 90cm x 90cm\n原産国: ベトナム'
  }
];

/** トップページ「おすすめ商品」に表示する ID リスト（先頭から最大8点） */
export const FEATURED_PRODUCT_IDS: string[] = ['1', '2', '3', '4', '5'];
