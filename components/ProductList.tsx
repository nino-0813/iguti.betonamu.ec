'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PRODUCTS } from '@/lib/constants';
import { CATEGORY_DESCRIPTIONS } from '@/lib/site-content';
import { ProductCard } from '@/components/ProductCard';
import { motion } from 'motion/react';

export function ProductList() {
  const params = useParams();
  const category = typeof params?.category === 'string' ? params.category : undefined;

  const filteredProducts = category
    ? PRODUCTS.filter((p) => p.category === category)
    : PRODUCTS;
  const categoryMeta = category ? CATEGORY_DESCRIPTIONS[category] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* パンくず（カテゴリページのみ） */}
      {category && (
        <nav className="mb-8 text-sm text-brand-ink/60" aria-label="パンくず">
          <Link href="/" className="hover:text-brand-olive transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-brand-ink">{categoryMeta?.title ?? category}</span>
        </nav>
      )}

      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-serif mb-4">
          {categoryMeta?.title ?? category ?? 'Collection'}
        </h1>
        {categoryMeta?.description && (
          <p className="max-w-2xl mx-auto text-brand-ink/70 leading-relaxed">
            {categoryMeta.description}
          </p>
        )}
        {!category && (
          <p className="text-sm uppercase tracking-[0.3em] text-brand-ink/60 mt-4">
            Handcrafted in Vietnam, Delivered to Japan
          </p>
        )}
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* カテゴリのストーリー（カテゴリページのみ） */}
      {category && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 bg-white/70 rounded-2xl text-center space-y-4"
        >
          <h2 className="text-xl font-serif">このカテゴリのつくり手</h2>
          <p className="max-w-xl mx-auto text-sm text-brand-ink/70 leading-relaxed">
            雑貨・アパレル・バッグの背景には、ベトナムの職人や工房の物語があります。
          </p>
          <Link
            href="/story"
            className="inline-block text-sm uppercase tracking-widest font-medium text-brand-olive hover:underline"
          >
            ストーリーを見る →
          </Link>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 p-8 md:p-12 bg-white rounded-2xl text-center space-y-6"
      >
        <h2 className="text-2xl font-serif">ベトナムからの配送について</h2>
        <p className="max-w-2xl mx-auto text-sm leading-relaxed text-brand-ink/70">
          商品はすべてベトナムの工房から直送されます。
          国際郵便またはEMSにて発送し、通常7〜14営業日ほどでお手元に届きます。
          丁寧な梱包を心がけておりますので、安心してお買い物をお楽しみください。
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-widest font-bold text-brand-ink/50">
          <span>15,000円以上で送料無料</span>
          <span>Secure Payments</span>
          <span>Authentic Artisans</span>
        </div>
      </motion.div>
    </div>
  );
}
