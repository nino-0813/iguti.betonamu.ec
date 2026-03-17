'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';
import { motion } from 'motion/react';

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
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <span className="bg-white text-brand-ink px-4 py-2 text-xs font-bold uppercase tracking-widest">Sold Out</span>
            </div>
          )}
        </div>
        <div className="mt-4 space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-brand-ink/50">{product.category}</p>
          <h3 className="text-lg font-serif">{product.name}</h3>
          <p className="text-sm font-medium">¥{product.price.toLocaleString()}</p>
        </div>
      </Link>
    </motion.div>
  );
}
