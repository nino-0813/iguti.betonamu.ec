'use client';

import Link from 'next/link';

const HERO_VIDEO = '/images/hero.mp4';
const HERO_IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200';

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-end pb-12 md:pb-16 overflow-hidden">
      {/* フォールバック画像（動画の下に表示） */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE_FALLBACK})` }}
        aria-hidden
      />
      {/* 背景動画 */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={HERO_IMAGE_FALLBACK}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/30 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-3 tracking-tight">
          ベトナムの手仕事を、
          <br />
          日本の暮らしへ
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-xl mb-8">
          誰かが手をかけたもので、囲まれた毎日を。
        </p>
        <Link
          href="/category/雑貨"
          className="inline-block text-sm uppercase tracking-widest font-bold text-white border border-white/60 px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
        >
          商品を見る
        </Link>
      </div>
    </section>
  );
}
