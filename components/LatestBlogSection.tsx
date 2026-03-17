import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-posts';

const posts = BLOG_POSTS.slice(0, 3);

export function LatestBlogSection() {
  if (posts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-serif mb-8 text-center">新着・ブログ</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="block group">
              <span className="text-xs uppercase tracking-widest text-brand-olive font-medium">
                {post.category}
              </span>
              <h3 className="text-lg font-serif mt-1 mb-2 group-hover:text-brand-olive transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-brand-ink/70 line-clamp-2">{post.excerpt}</p>
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
      <div className="text-center mt-8">
        <Link
          href="/blog"
          className="text-sm uppercase tracking-widest font-medium text-brand-olive hover:underline"
        >
          ブログ一覧 →
        </Link>
      </div>
    </section>
  );
}
