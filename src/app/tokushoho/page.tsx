export default function TokushohoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 prose prose-sm">
      <h1 className="text-4xl font-serif mb-12">特定商取引法に基づく表記</h1>

      <section className="mb-8">
        <h2 className="text-lg font-bold uppercase tracking-widest mb-4">販売業者</h2>
        <p>XIN CHÀO Artisan Collective</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold uppercase tracking-widest mb-4">運営責任者</h2>
        <p>Nguyen Van A</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold uppercase tracking-widest mb-4">所在地</h2>
        <p>123 Le Loi Street, District 1, Ho Chi Minh City, Vietnam</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold uppercase tracking-widest mb-4">お問い合わせ先</h2>
        <p>Email: support@xinchao-artisan.com</p>
        <p>電話番号: +84 123 456 789 (ベトナム)</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold uppercase tracking-widest mb-4">商品代金以外の必要料金</h2>
        <ul>
          <li>配送料: 全国一律 1,200円 (15,000円以上のお買い上げで無料)</li>
          <li>関税: 個人輸入扱いとなります。課税対象となった場合はお客様のご負担となります。</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold uppercase tracking-widest mb-4">引き渡し時期</h2>
        <p>ご注文確定後、3営業日以内に発送いたします。お届けまでは発送後7〜14営業日程度かかります。</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold uppercase tracking-widest mb-4">返品・交換について</h2>
        <p>商品に欠陥がある場合を除き、基本的には返品には応じられません。万が一不良品が届いた場合は、到着後7日以内にご連絡ください。</p>
      </section>
    </div>
  );
}
