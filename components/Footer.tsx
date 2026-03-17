import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-brand-ink text-brand-cream pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif tracking-widest">XIN CHÀO</h3>
          <p className="text-sm opacity-70 leading-relaxed">
            ベトナムの伝統的な職人技と、現代的なミニマリズムが融合したライフスタイルブランド。
            高品質な手仕事の温もりを、日本へお届けします。
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Shop</h4>
          <ul className="space-y-3 text-sm opacity-70">
            <li><Link href="/category/雑貨" className="hover:opacity-100">雑貨</Link></li>
            <li><Link href="/category/アパレル" className="hover:opacity-100">アパレル</Link></li>
            <li><Link href="/category/バッグ" className="hover:opacity-100">バッグ</Link></li>
            <li><Link href="/story" className="hover:opacity-100">ストーリー</Link></li>
            <li><Link href="/blog" className="hover:opacity-100">ブログ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Support</h4>
          <ul className="space-y-3 text-sm opacity-70">
            <li><Link href="/faq" className="hover:opacity-100">よくある質問 (FAQ)</Link></li>
            <li><Link href="/about" className="hover:opacity-100">会社情報</Link></li>
            <li><Link href="/contact" className="hover:opacity-100">お問い合わせ</Link></li>
            <li><Link href="/tokushoho" className="hover:opacity-100">特定商取引法に基づく表記</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Newsletter</h4>
          <p className="text-sm opacity-70 mb-4">新作情報やイベントのご案内をメールでお届けします。</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent border-b border-brand-cream/30 py-2 text-sm flex-grow focus:outline-none focus:border-brand-cream"
            />
            <button type="button" className="ml-4 text-xs uppercase tracking-widest font-bold hover:text-brand-olive transition-colors">Join</button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-brand-cream/10 text-[10px] uppercase tracking-[0.2em] opacity-50 text-center">
        © 2024 XIN CHÀO. All rights reserved.
      </div>
    </footer>
  );
}
