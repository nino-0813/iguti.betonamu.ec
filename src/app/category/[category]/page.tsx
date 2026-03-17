import { ProductList } from '@/components/ProductList';
import { CATEGORY_DESCRIPTIONS } from '@/lib/site-content';

type PageProps = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const meta = CATEGORY_DESCRIPTIONS[category];
  const title = meta?.title ?? category;
  return {
    title: `${title} — XIN CHÀO`,
    description: meta?.description ?? `ベトナムの手仕事。${title}の一覧。`,
  };
}

export default function CategoryPage() {
  return <ProductList />;
}
