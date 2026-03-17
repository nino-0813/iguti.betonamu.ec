export const metadata = {
  title: 'About — XIN CHÀO',
  description: 'なぜベトナムの商品を届けるのか。私たちの想いと、日本のお客様へ。',
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-serif mb-4">About</h1>
      <p className="text-sm uppercase tracking-[0.3em] text-brand-ink/60 mb-12">
        なぜベトナムの商品を、日本へ届けているのか
      </p>

      <div className="space-y-12 text-brand-ink/90 leading-relaxed">
        <section>
          <h2 className="text-xl font-serif mb-4">「XIN CHÀO」のはじまり</h2>
          <p className="mb-4">
            XIN CHÀO（シンチャオ）は、ベトナム語で「こんにちは」という意味です。現地で何度もかけてもらったこの言葉が、私たちの出発点になりました。
          </p>
          <p>
            ベトナムを訪れるたびに、「この手仕事を、もっと多くの人に届けたい」と思うようになりました。でも理由は「ベトナムが好きだから」だけではありません。日本で暮らす私たち自身が、「誰かが手をかけたもの」で囲まれた生活をもう一度見直したかった。その想いが、このお店につながっています。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-serif mb-4">なぜベトナムの商品を売るのか</h2>
          <p className="mb-4">
            ベトナムには、昔ながらの道具と手の感覚だけでつくる職人や、見本市で出会った山岳民族の織物作家、飼料袋をリメイクしてポーチにする工房など、多様な「つくり手」がいます。彼らは「安く大量に」ではなく、「この一枚を、この人に」という感覚でものづくりをしています。
          </p>
          <p className="mb-4">
            日本でも、手仕事や一点物への関心は高まっています。それでも「どこで・誰が・どんな想いで作ったか」が伝わらないと、価格だけが目について、「高い」と感じられがちです。私たちは、つくり手の顔と背景が少しでも見えるようにしたい。だから、ブログで職人さんの話や、梱包・配送の裏側も書いています。
          </p>
          <p>
            ベトナムの商品を売るのは、「ベトナムものを置きたい人」のためだけでなく、「まだベトナムは知らないけれど、丁寧な雑貨が好きな人」に届けたいから。国名より先に、「この人のが欲しい」と思ってもらえるように。そんな橋渡しができたらと思っています。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-serif mb-4">私たちが大事にしていること</h2>
          <ul className="space-y-3 list-none">
            <li className="flex gap-3">
              <span className="text-brand-olive font-serif">—</span>
              <span><strong>つくり手とのつながり</strong> — 見本市で連絡先を教えてもらったり、工房を訪ねたり。顔の見える関係を大切にしています。</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-olive font-serif">—</span>
              <span><strong>ストーリーを伝える</strong> — どんな人が、どんな想いで作ったか。商品ページやブログで、できるだけ言葉にしています。</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-olive font-serif">—</span>
              <span><strong>届けるまでをオープンに</strong> — 海外発送への不安を減らすため、梱包や配送の流れもブログでお伝えしています。</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-serif mb-4">日本のお客様へ</h2>
          <p className="mb-4">
            「ベトナム」と聞くと、旅行や料理を思い浮かべる方も多いかもしれません。私たちが届けたいのは、それに加えて、「誰かの手と時間が込められたもの」です。刺繍の一針、織物の一枚、陶器の一つ。どれも、同じものは二つとありません。
          </p>
          <p>
            日常のテーブルにベトナムのティーセットを置く。山岳民族の織物をインテリアに取り入れる。飼料袋のポーチをペンケースにする。そうした小さな選択の積み重ねが、「丁寧に暮らしたい」という気持ちとつながればうれしいです。XIN CHÀOが、そのきっかけのひとつになれたら幸いです。
          </p>
        </section>
      </div>
    </div>
  );
}
