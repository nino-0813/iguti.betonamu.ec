import Link from 'next/link';
import { PICKUP_STORY } from '@/lib/site-content';

export function PickupStorySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href={PICKUP_STORY.href}
        className="block bg-white/70 rounded-2xl p-8 md:p-10 hover:bg-white/90 transition-colors group"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-brand-olive font-medium mb-2">
          {PICKUP_STORY.label}
        </p>
        <h2 className="text-2xl md:text-3xl font-serif mb-3 group-hover:text-brand-olive transition-colors">
          {PICKUP_STORY.title}
        </h2>
        <p className="text-brand-ink/70 leading-relaxed mb-4">{PICKUP_STORY.excerpt}</p>
        <span className="text-sm uppercase tracking-widest font-medium text-brand-olive group-hover:underline">
          読む →
        </span>
      </Link>
    </section>
  );
}
