import Link from 'next/link';

const GIFT_SETS: Record<
  string,
  { title: string; description: string }
> = {
  standard: {
    title: '定番セット',
    description:
      'いつも喜ばれる、ベトナムの定番アイテムを厳選したセット。贈り物に迷ったらこれ。',
  },
  excite: {
    title: 'ちょっとドキドキセット',
    description:
      'いつもと少し違う、ワクワクする組み合わせ。相手の「え、いい！」を引き出したい方へ。',
  },
  mystery: {
    title: '何が入ってるかわからないドキドキセット',
    description:
      '中身はおまかせ。開けるまでドキドキ。特別なひとに、特別な体験を。',
  },
};

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return [{ id: 'standard' }, { id: 'excite' }, { id: 'mystery' }];
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const set = GIFT_SETS[id];
  return {
    title: set ? `${set.title} — XIN CHÀO` : 'プレゼントセット — XIN CHÀO',
    description: set?.description ?? 'ベトナムの手仕事のプレゼントセット。',
  };
}

export default async function GiftSetPage({ params }: PageProps) {
  const { id } = await params;
  const set = GIFT_SETS[id];

  if (!set) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-serif mb-4">セットが見つかりません</h1>
        <Link href="/" className="text-brand-olive hover:underline">
          トップへ戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="text-sm uppercase tracking-widest text-brand-ink/60 hover:text-brand-olive mb-8 inline-block"
      >
        ← トップ
      </Link>
      <h1 className="text-4xl font-serif mb-4">{set.title}</h1>
      <p className="text-brand-ink/80 leading-relaxed mb-10">{set.description}</p>
      <p className="text-sm text-brand-ink/60 mb-8">
        内容・価格のご案内やご注文は、お問い合わせにて承ります。
      </p>
      <Link
        href="/contact"
        className="inline-block bg-brand-ink text-brand-cream px-8 py-4 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-brand-olive transition-colors"
      >
        このセットについて問い合わせる
      </Link>
    </div>
  );
}
