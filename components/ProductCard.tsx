'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link
        href={`/product/${product.id}`}
        className="block rounded-xl overflow-hidden bg-white border border-brand-ink/5 hover:border-brand-ink/15 transition-colors"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* ホバー時の「詳しく見る」オーバーレイ */}
          <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/20 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium uppercase tracking-widest bg-brand-ink/80 px-4 py-2 rounded-full">
              詳しく見る
            </span>
          </div>
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <span className="bg-white text-brand-ink px-4 py-2 text-xs font-bold uppercase tracking-widest">
                Sold Out
              </span>
            </div>
          )}
        </div>
        <div className="p-4 space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-brand-ink/50">{product.category}</p>
          <h3 className="text-lg font-serif group-hover:text-brand-olive transition-colors">{product.name}</h3>
          <p className="text-sm font-medium">¥{product.price.toLocaleString()}</p>
          <span className="inline-flex items-center gap-1 text-xs text-brand-olive font-medium uppercase tracking-widest">
            商品ページへ
            <ChevronRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
