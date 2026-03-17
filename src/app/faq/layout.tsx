import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'よくある質問 — XIN CHÀO',
  description: '注文・支払い・送料・配送・返品について。ご不明な点はお問い合わせください。',
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
