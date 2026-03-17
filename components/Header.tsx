'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/" className="text-3xl font-serif tracking-widest ml-2 md:ml-0">
              XIN CHÀO
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-sm uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-brand-olive transition-colors">Home</Link>
            <Link href="/story" className="hover:text-brand-olive transition-colors">ストーリー</Link>
            <Link href="/blog" className="hover:text-brand-olive transition-colors">ブログ</Link>
            <Link href="/faq" className="hover:text-brand-olive transition-colors">FAQ</Link>
            <Link href="/about" className="hover:text-brand-olive transition-colors">会社情報</Link>
            <Link href="/contact" className="hover:text-brand-olive transition-colors">お問い合わせ</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 hover:text-brand-olive transition-colors">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-olive text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-brand-cream border-t border-brand-ink/10 py-4 px-4 space-y-4 flex flex-col uppercase tracking-widest text-sm font-medium">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/story" onClick={() => setIsMenuOpen(false)}>ストーリー</Link>
          <Link href="/blog" onClick={() => setIsMenuOpen(false)}>ブログ</Link>
          <Link href="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)}>会社情報</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)}>お問い合わせ</Link>
        </div>
      )}
    </header>
  );
}
