import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <h1 className="text-5xl font-serif mb-6">Cảm ơn!</h1>
      <p className="opacity-60 mb-8">ご注文ありがとうございます。発送準備が整い次第、メールにてご連絡いたします。</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-brand-ink text-brand-cream px-8 py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-brand-olive transition-colors"
      >
        Back to Shop
      </Link>
    </div>
  );
}
