import { ContactForm } from '@/components/ContactForm';

export const metadata = {
  title: 'お問い合わせ — XIN CHÀO',
  description: '商品・配送・その他ご質問はお気軽にどうぞ。',
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-serif mb-4">お問い合わせ</h1>
      <p className="text-sm uppercase tracking-[0.3em] text-brand-ink/60 mb-12">
        Contact
      </p>

      <p className="text-brand-ink/80 leading-relaxed mb-10">
        商品のご質問、配送について、その他お問い合わせは下記フォームよりお送りください。できるだけ早くご返信いたします。
      </p>

      <ContactForm />
    </div>
  );
}
