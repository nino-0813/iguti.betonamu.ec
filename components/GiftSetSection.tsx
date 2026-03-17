'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Gift, Sparkles } from 'lucide-react';

const GIFT_SETS = [
  {
    id: 'standard',
    title: '定番セット',
    description: 'いつも喜ばれる、ベトナムの定番アイテムを厳選したセット。贈り物に迷ったらこれ。',
    image:
      'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=600',
    href: '/gift/standard',
    badge: '定番',
  },
  {
    id: 'excite',
    title: 'ちょっとドキドキセット',
    description: 'いつもと少し違う、ワクワクする組み合わせ。相手の「え、いい！」を引き出したい方へ。',
    image:
      'https://images.unsplash.com/photo-1544816153-12ad5d714481?auto=format&fit=crop&q=80&w=600',
    href: '/gift/excite',
    badge: 'ドキドキ',
  },
  {
    id: 'mystery',
    title: '何が入ってるかわからないドキドキセット',
    description: '中身はおまかせ。開けるまでドキドキ。特別なひとに、特別な体験を。',
    image:
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600',
    href: '/gift/mystery',
    badge: 'おまかせ',
  },
] as const;

export function GiftSetSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-center gap-3 mb-10">
        <Gift className="text-brand-olive w-7 h-7" />
        <h2 className="text-2xl md:text-3xl font-serif text-center">プレゼントセット</h2>
        <Sparkles className="text-brand-olive w-6 h-6" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
        {GIFT_SETS.map((set, i) => (
          <motion.div
            key={set.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link
              href={set.href}
              className="group block h-full rounded-2xl overflow-hidden bg-white border border-brand-ink/10 shadow-lg shadow-brand-ink/5 hover:shadow-xl hover:shadow-brand-olive/15 hover:border-brand-olive/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={set.image}
                  alt={set.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-brand-ink/0 to-transparent opacity-80" />
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/95 text-xs font-bold uppercase tracking-widest text-brand-ink shadow-sm">
                  {set.badge}
                </span>
                <span className="absolute bottom-4 left-4 right-4 text-white text-lg font-serif font-medium drop-shadow-md">
                  {set.title}
                </span>
                <span className="absolute bottom-4 right-4 text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  見てみる →
                </span>
              </div>
              <div className="p-5 bg-white">
                <p className="text-sm text-brand-ink/70 leading-relaxed line-clamp-3 group-hover:text-brand-ink/90 transition-colors">
                  {set.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
