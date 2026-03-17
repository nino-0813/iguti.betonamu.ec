'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FAQ_CATEGORIES } from '@/lib/site-content';
import { ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">よくある質問</h1>
        <p className="text-sm uppercase tracking-[0.3em] text-brand-ink/60">
          注文・支払い・配送・返品について
        </p>
      </header>

      <div className="space-y-8">
        {FAQ_CATEGORIES.map((cat) => (
          <section key={cat.id} id={cat.id}>
            <h2 className="text-lg font-serif mb-4">{cat.title}</h2>
            <ul className="space-y-2">
              {cat.items.map((item, idx) => {
                const id = `${cat.id}-${idx}`;
                const isOpen = openId === id;
                return (
                  <li
                    key={id}
                    className="border border-brand-ink/10 rounded-xl overflow-hidden bg-white/50"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : id)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/50 transition-colors"
                    >
                      <span className="font-medium text-sm">{item.q}</span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-brand-ink/50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-0">
                        <p className="text-sm text-brand-ink/80 leading-relaxed whitespace-pre-line">
                          {item.a}
                        </p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-16 p-8 bg-white/60 rounded-2xl text-center">
        <p className="text-sm text-brand-ink/80 mb-4">
          解決しない場合は、お気軽にお問い合わせください。
        </p>
        <Link
          href="/contact"
          className="inline-block text-sm uppercase tracking-widest font-medium text-brand-olive hover:underline"
        >
          お問い合わせ →
        </Link>
      </div>
    </div>
  );
}
