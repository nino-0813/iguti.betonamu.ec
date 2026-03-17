import { HeroSection } from '@/components/HeroSection';
import { PickupStorySection } from '@/components/PickupStorySection';
import { CategoryNavSection } from '@/components/CategoryNavSection';
import { FeaturedProductsSection } from '@/components/FeaturedProductsSection';
import { MiniAboutSection } from '@/components/MiniAboutSection';
import { LatestBlogSection } from '@/components/LatestBlogSection';

export const metadata = {
  title: 'XIN CHÀO — ベトナムの手仕事を、日本の暮らしへ',
  description:
    'Handcrafted in Vietnam, Delivered to Japan. ベトナムの職人技と現代的なミニマリズムが融合したライフスタイルブランド。',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PickupStorySection />
      <CategoryNavSection />
      <FeaturedProductsSection />
      <MiniAboutSection />
      <LatestBlogSection />
    </>
  );
}
