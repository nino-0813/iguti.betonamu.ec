import Link from 'next/link';
import { ARTISANS } from '@/lib/site-content';
import { PRODUCTS } from '@/lib/constants';

export const metadata = {
  title: 'ストーリー — XIN CHÀO',
  description: 'つくり手と、私たちの想い。ベトナムの手仕事を日本へ届ける理由。',
};

export default function StoryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">ストーリー</h1>
        <p className="text-sm uppercase tracking-[0.3em] text-brand-ink/60">
          つくり手と、私たちの想い
        </p>
      </header>

      {/* ブランドストーリー（要約 + About へ） */}
      <section className="mb-20">
        <div className="bg-white/60 rounded-2xl p-8 md:p-12 space-y-6 text-brand-ink/90 leading-relaxed">
          <h2 className="text-2xl font-serif">なぜベトナムの手仕事を届けるのか</h2>
          <p>
            XIN CHÀO（シンチャオ）は、ベトナム語で「こんにちは」。現地で何度もかけてもらったこの言葉が、私たちの出発点です。ベトナムには、昔ながらの手の感覚でつくる職人や、山岳民族の織物、飼料袋をリメイクする工房など、多様な「つくり手」がいます。私たちは、その顔と背景が少しでも見えるように、商品ページやブログでストーリーを伝えています。
          </p>
          <p>
            「ベトナムものを置きたい人」だけでなく、「丁寧な雑貨が好きな人」に、「この人のが欲しい」と思ってもらえる橋渡しができたら。そんな想いで、日本へ届けています。
          </p>
          <Link
            href="/about"
            className="inline-block text-sm uppercase tracking-widest font-medium text-brand-olive hover:underline mt-4"
          >
            私たちについて、もっと読む →
          </Link>
        </div>
      </section>

      {/* 職人・工房紹介 */}
      <section>
        <h2 className="text-2xl font-serif mb-8">つくり手をご紹介</h2>
        <ul className="space-y-12">
          {ARTISANS.map((artisan) => {
            const products = artisan.productIds
              .map((id) => PRODUCTS.find((p) => p.id === id))
              .filter(Boolean);
            return (
              <li key={artisan.id} className="border-b border-brand-ink/10 pb-12 last:border-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="aspect-[4/3] md:aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={artisan.image}
                      alt={artisan.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-serif mb-3">{artisan.name}</h3>
                    <p className="text-brand-ink/80 leading-relaxed mb-6">{artisan.short}</p>
                    {products.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-brand-ink/50 mb-2">
                          この職人の商品
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {products.map((p) => (
                            <li key={p!.id}>
                              <Link
                                href={`/product/${p!.id}`}
                                className="text-sm font-medium text-brand-olive hover:underline"
                              >
                                {p!.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="mt-16 text-center">
        <Link
          href="/blog"
          className="text-sm uppercase tracking-widest font-medium text-brand-olive hover:underline"
        >
          ブログでもっと知る →
        </Link>
      </div>
    </div>
  );
}
