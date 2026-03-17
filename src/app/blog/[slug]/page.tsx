import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs } from '@/lib/blog-posts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: `${post.title} — XIN CHÀO Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/blog"
        className="text-xs uppercase tracking-widest text-brand-ink/60 hover:text-brand-olive transition-colors mb-8 inline-block"
      >
        ← Blog
      </Link>

      <header className="mb-10">
        <span className="text-xs uppercase tracking-widest text-brand-olive font-medium">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-serif mt-2 mb-4">
          {post.title}
        </h1>
        <p className="text-brand-ink/70 leading-relaxed">
          {post.excerpt}
        </p>
        <time
          dateTime={post.date}
          className="text-sm text-brand-ink/50 mt-4 block"
        >
          {post.date.replace(/-/g, '/')}
        </time>
      </header>

      <div className="prose prose-sm max-w-none text-brand-ink/90">
        {post.content.map((paragraph, i) => (
          <p key={i} className="mb-6 leading-relaxed whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-brand-ink/10">
        <Link
          href="/blog"
          className="text-sm uppercase tracking-widest font-medium text-brand-olive hover:underline"
        >
          ← 一覧に戻る
        </Link>
      </div>
    </article>
  );
}
