import React from 'react';
import { Product } from '../../types';
import { ArrowRight, ShoppingCart } from 'lucide-react';

interface FeaturedStoryBlockProps {
  product: Product;
  order: number;
  layout: 'imageLeft' | 'imageRight';
  onSelect: () => void;
  onAddToCart: (product: Product) => void;
}

const FeaturedStoryBlock: React.FC<FeaturedStoryBlockProps> = ({
  product,
  order,
  layout,
  onSelect,
  onAddToCart,
}) => {
  const hasStory = product.storyTitle != null && product.story != null;

  const content = (
    <>
      <div className={`relative flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-14 items-center w-full max-w-5xl mx-auto ${layout === 'imageRight' ? 'md:flex-row-reverse' : ''}`}>
        {/* 画像 */}
        <div className="w-full md:w-[45%] lg:w-[42%] flex-shrink-0">
          <div
            onClick={onSelect}
            className="relative aspect-[4/3] md:aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer group"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[#ffa41c] text-white text-sm font-bold flex items-center justify-center shadow">
              {order}
            </span>
          </div>
        </div>

        {/* ストーリー + 商品情報 */}
        <div className="w-full md:flex-1 flex flex-col justify-center px-0 py-2">
          {hasStory && (
            <>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
                {product.storyTitle}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 md:mb-8">
                {product.story}
              </p>
            </>
          )}
          <div className="border-t border-gray-100 pt-4 md:pt-5">
            <p className="text-xs text-[#ffa41c] font-bold tracking-wider uppercase mb-1">{product.category}</p>
            <h4
              onClick={onSelect}
              className="text-base sm:text-lg font-bold text-gray-900 mb-2 cursor-pointer hover:text-[#ffa41c] transition-colors line-clamp-2"
            >
              {product.name}
            </h4>
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-3">
              <span className="text-xl md:text-2xl font-bold text-gray-900">
                ¥{product.price.toLocaleString()}
              </span>
              {product.originalPrice != null && (
                <span className="text-sm text-gray-400 line-through">¥{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-4 md:mt-5">
              <button
                onClick={onSelect}
                className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
              >
                詳しく見る <ArrowRight size={14} />
              </button>
              <button
                onClick={() => onAddToCart(product)}
                className="inline-flex items-center gap-1.5 bg-[#ffd814] text-gray-900 text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#f7ca00] transition-colors border border-[#fcd200]"
              >
                <ShoppingCart size={14} /> カートに追加
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <section className="py-10 sm:py-14 md:py-20 scroll-mt-20">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {content}
      </div>
    </section>
  );
};

export default FeaturedStoryBlock;
