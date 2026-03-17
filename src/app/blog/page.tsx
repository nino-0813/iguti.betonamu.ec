import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-posts';

export const metadata = {
  title: 'Blog — XIN CHÀO',
  description: 'ベトナムの職人、雑貨の使い方、現地のいま。XIN CHÀOのブログ。',
};

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-2">Blog</h1>
        <p className="text-sm uppercase tracking-[0.3em] text-brand-ink/60">
          商品の背景、使い方のヒント、ベトナムのいま
        </p>
      </header>

      <ul className="space-y-10">
        {BLOG_POSTS.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <span className="text-xs uppercase tracking-widest text-brand-olive font-medium">
                {post.category}
              </span>
              <h2 className="text-2xl font-serif mt-1 mb-2 group-hover:text-brand-olive transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-brand-ink/70 leading-relaxed">
                {post.excerpt}
              </p>
              <time
                dateTime={post.date}
                className="text-xs text-brand-ink/50 mt-2 block"
              >
                {post.date.replace(/-/g, '/')}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
