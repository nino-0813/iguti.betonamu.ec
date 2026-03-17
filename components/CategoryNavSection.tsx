import Link from 'next/link';
import { CATEGORY_DESCRIPTIONS } from '@/lib/site-content';

const CATEGORIES = ['雑貨', 'アパレル', 'バッグ'] as const;

const PLACEHOLDERS: Record<string, string> = {
  雑貨:
    'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=600',
  アパレル:
    'https://images.unsplash.com/photo-1544816153-12ad5d714481?auto=format&fit=crop&q=80&w=600',
  バッグ:
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600',
};

export function CategoryNavSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-serif mb-8 text-center">カテゴリから探す</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
        {CATEGORIES.map((key) => {
          const meta = CATEGORY_DESCRIPTIONS[key];
          const img = PLACEHOLDERS[key];
          return (
            <Link
              key={key}
              href={`/category/${key}`}
              className="group block rounded-2xl overflow-hidden bg-gray-100"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={img}
                  alt={meta?.title ?? key}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5 bg-white">
                <h3 className="font-serif text-xl mb-1">{meta?.title ?? key}</h3>
                <p className="text-sm text-brand-ink/60 line-clamp-2">{meta?.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
