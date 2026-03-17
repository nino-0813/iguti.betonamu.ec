'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { PRODUCTS } from '@/lib/constants';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '@/components/ProductCard';

export function ProductDetail() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : undefined;
  const router = useRouter();
  const { addToCart } = useCart();
  const product = id ? PRODUCTS.find((p) => p.id === id) : undefined;
  const relatedProducts = product
    ? PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  const [currentImage, setCurrentImage] = useState(0);

  if (!product)
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">Product not found</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* パンくず */}
      <nav className="mb-8 text-sm text-brand-ink/60" aria-label="パンくず">
        <Link href="/" className="hover:text-brand-olive transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-brand-olive transition-colors"
        >
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-brand-ink line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={product.images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>

            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/50 backdrop-blur rounded-full hover:bg-white transition-colors"
                  type="button"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/50 backdrop-blur rounded-full hover:bg-white transition-colors"
                  type="button"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          <div className="flex gap-4">
            {product.images.map((img, idx) => (
              <button
                key={img}
                onClick={() => setCurrentImage(idx)}
                className={`w-20 aspect-square rounded-lg overflow-hidden border-2 transition-all ${currentImage === idx ? 'border-brand-olive' : 'border-transparent opacity-60'}`}
                type="button"
              >
                <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-ink/50 mb-2">
              {product.category}
            </p>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">{product.name}</h1>
            <p className="text-2xl font-medium">¥{product.price.toLocaleString()}（税込）</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-widest font-bold text-brand-ink/60 mb-3">
              この商品について
            </h3>
            <p className="text-brand-ink/80 leading-relaxed">{product.description}</p>
            <Link
              href="/story"
              className="inline-block mt-3 text-sm uppercase tracking-widest font-medium text-brand-olive hover:underline"
            >
              ストーリーをもっと読む →
            </Link>
          </div>

          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4 text-sm">
              <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold ${product.stock > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                {product.stock > 0 ? `在庫あり（${product.stock}点）` : '売り切れ'}
              </span>
            </div>

            <button
              disabled={product.stock === 0}
              onClick={() => {
                addToCart(product);
                router.push('/cart');
              }}
              className="w-full bg-brand-ink text-brand-cream py-5 rounded-full flex items-center justify-center gap-3 uppercase tracking-widest text-xs font-bold hover:bg-brand-olive transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={18} />
              カートに入れる
            </button>
          </div>

          <div className="border-t border-brand-ink/10 pt-8 space-y-6">
            <div className="flex gap-4">
              <div className="p-3 bg-white rounded-xl">
                <Truck size={20} className="text-brand-olive" />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest">ベトナム直送</h4>
                <p className="text-xs text-brand-ink/60 mt-1">通常7〜14営業日でお届け。追跡番号付き。</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 bg-white rounded-xl">
                <ShieldCheck size={20} className="text-brand-olive" />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest">品質</h4>
                <p className="text-xs text-brand-ink/60 mt-1">職人による手仕事。検品後に出荷いたします。</p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white/50 p-6 rounded-2xl">
            <h4 className="text-xs uppercase tracking-widest font-bold mb-4">仕様</h4>
            <pre className="text-xs font-sans whitespace-pre-wrap text-brand-ink/70 leading-relaxed">
              {product.details}
            </pre>
          </div>
        </div>
      </div>

      {/* よく一緒に買われる商品 */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-16 border-t border-brand-ink/10">
          <h2 className="text-xl font-serif mb-8">このカテゴリの他の商品</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
