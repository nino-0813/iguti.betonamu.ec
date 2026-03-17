import Link from 'next/link';

export function MiniAboutSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-serif mb-4">なぜ私たちか</h2>
        <p className="text-brand-ink/80 leading-relaxed mb-6">
          ベトナムには、昔ながらの手の感覚でつくる職人や、山岳民族の織物、一点物の工房がいます。私たちは、つくり手の顔と背景が少しでも見えるように、ストーリーを伝えながら日本へ届けています。
        </p>
        <Link
          href="/story"
          className="inline-block text-sm uppercase tracking-widest font-medium text-brand-olive hover:underline"
        >
          ストーリーを見る →
        </Link>
      </div>
    </section>
  );
}
