import { PRODUCTS, FEATURED_PRODUCT_IDS } from '@/lib/constants';
import { ProductCard } from '@/components/ProductCard';

const featured = FEATURED_PRODUCT_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(
  Boolean
) as typeof PRODUCTS;

export function FeaturedProductsSection() {
  if (featured.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-serif mb-8 text-center">おすすめの商品</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {featured.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
