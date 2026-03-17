'use client';

import { useState } from 'react';
import Link from 'next/link';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || '送信に失敗しました。');
        return;
      }
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setErrorMessage('送信に失敗しました。しばらく経ってからお試しください。');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white/70 p-8 rounded-2xl border border-brand-ink/5 text-center">
        <p className="text-lg font-serif mb-2">送信いただきありがとうございます。</p>
        <p className="text-sm text-brand-ink/70">
          内容を確認のうえ、ご登録のメールアドレスへご返信いたします。
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm uppercase tracking-widest font-medium text-brand-olive hover:underline"
        >
          もう一度送信する
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="contact-name" className="block text-xs uppercase tracking-widest font-bold text-brand-ink/70 mb-2">
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className="w-full px-4 py-3 rounded-xl border border-brand-ink/20 bg-white focus:outline-none focus:border-brand-olive"
          placeholder="山田 太郎"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-xs uppercase tracking-widest font-bold text-brand-ink/70 mb-2">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 rounded-xl border border-brand-ink/20 bg-white focus:outline-none focus:border-brand-olive"
          placeholder="example@email.com"
        />
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-xs uppercase tracking-widest font-bold text-brand-ink/70 mb-2">
          お問い合わせ種別
        </label>
        <select
          id="contact-subject"
          name="subject"
          className="w-full px-4 py-3 rounded-xl border border-brand-ink/20 bg-white focus:outline-none focus:border-brand-olive text-brand-ink/90"
        >
          <option value="">選択してください</option>
          <option value="商品について">商品について</option>
          <option value="配送について">配送について</option>
          <option value="ご注文について">ご注文について</option>
          <option value="その他">その他</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs uppercase tracking-widest font-bold text-brand-ink/70 mb-2">
          お問い合わせ内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          className="w-full px-4 py-3 rounded-xl border border-brand-ink/20 bg-white focus:outline-none focus:border-brand-olive resize-y"
          placeholder="ご質問やご要望をご記入ください。"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-brand-ink text-brand-cream py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-brand-olive transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? '送信中...' : '送信する'}
      </button>

      <p className="text-xs text-brand-ink/50">
        特定商取引法に基づく表記は
        <Link href="/tokushoho" className="text-brand-olive hover:underline ml-1">こちら</Link>からご確認いただけます。
      </p>
    </form>
  );
}
