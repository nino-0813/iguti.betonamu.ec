
import React from 'react';
import { Product, Category } from '../../types';
import { Star, ChevronRight, MapPin, ShieldCheck, Package, ShoppingCart, Heart } from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBackToHome: () => void;
  relatedProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ 
  product, 
  onAddToCart, 
  onBackToHome,
  relatedProducts,
  onSelectProduct
}) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            fill={i < Math.floor(rating) ? "#ffa41c" : "none"} 
            className={i < Math.floor(rating) ? "text-[#ffa41c]" : "text-gray-200"} 
          />
        ))}
        <span className="text-xs text-[#007185] ml-2 hover:underline cursor-pointer">
          {product.reviewCount.toLocaleString()}件のレビュー
        </span>
      </div>
    );
  };

  return (
    <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <span className="hover:text-[#ffa41c] cursor-pointer transition-colors" onClick={onBackToHome}>Home</span>
        <ChevronRight size={12} className="mx-2" />
        <span className="hover:text-[#ffa41c] cursor-pointer transition-colors">{product.category}</span>
        <ChevronRight size={12} className="mx-2" />
        <span className="text-gray-900 truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 aspect-square flex items-center justify-center overflow-hidden">
             <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-700 cursor-zoom-in"
            />
          </div>
          <div className="flex gap-4">
            {[product.image, product.image, product.image].map((img, n) => (
              <div key={n} className="w-20 h-20 bg-white border border-gray-100 rounded-xl p-2 hover:border-[#ffa41c] transition-all cursor-pointer shadow-sm">
                <img src={img} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Middle & Right: Product Info and Purchase */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-7 gap-8">
          <div className="md:col-span-4 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-[#ffa41c] uppercase tracking-widest bg-orange-50 px-2 py-1 rounded">
                Vietnamese Selection
              </span>
              <button className="text-gray-300 hover:text-red-500 transition-colors">
                <Heart size={20} />
              </button>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
              {product.name}
            </h1>
            
            <div className="mb-6">
              {renderStars(product.rating)}
            </div>

            <div className="prose prose-sm text-gray-600 mb-8">
              <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide border-b border-gray-100 pb-2">商品説明</h3>
              <p className="leading-relaxed">
                {product.description}
                ベトナム現地の工房と提携し、職人の手仕事によって生み出される「Xin Chào」こだわりの逸品です。素材の持つ風合いと、伝統的な美学が日常の空間を豊かに彩ります。
              </p>
            </div>

            {product.items && (
              <div className="mb-8 p-5 bg-orange-50/50 border border-orange-100/50 rounded-2xl">
                <p className="text-xs font-bold text-[#ffa41c] mb-3 flex items-center gap-2 uppercase tracking-widest">
                  <Package size={14} /> パッケージ同梱内容
                </p>
                <ul className="space-y-2">
                  {product.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ffa41c]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center gap-6 py-6 border-t border-gray-100">
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck size={20} className="text-gray-400" />
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Quality Guaranteed</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                 <Package size={20} className="text-gray-400" />
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Secure Packing</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                 <MapPin size={20} className="text-gray-400" />
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Local Sourcing</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl sticky top-28">
              <div className="mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-sm font-medium text-gray-400">￥</span>
                  <span className="text-3xl font-bold text-gray-900">{product.price.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-teal-600 font-bold uppercase tracking-widest">通常配送料無料</p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-teal-600">在庫あり</span>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 py-3 rounded-xl shadow-sm border border-[#fcd200] font-bold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} /> カートに入れる
                  </button>
                  <button className="w-full bg-[#ffa41c] hover:bg-[#fa8900] text-white py-3 rounded-xl border border-[#ee8b00] font-bold text-sm transition-all shadow-md">
                    今すぐ買う
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 text-[10px] text-gray-400 space-y-2">
                 <div className="flex justify-between border-b border-gray-50 pb-1">
                  <span>出荷元</span>
                  <span className="text-gray-600">Xin Chào Vietnam</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-1">
                  <span>販売元</span>
                  <span className="text-gray-600">Xin Chào Vietnam</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-12 border-t border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-8 uppercase tracking-widest border-l-4 border-[#ffa41c] pl-4">おすすめの関連商品</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {relatedProducts.slice(0, 6).map(p => (
              <div 
                key={p.id} 
                className="group cursor-pointer flex flex-col h-full"
                onClick={() => onSelectProduct(p)}
              >
                <div className="aspect-square bg-white rounded-xl mb-3 flex items-center justify-center overflow-hidden border border-gray-100 transition-all group-hover:shadow-md p-2">
                  <img src={p.image} className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110" alt={p.name} />
                </div>
                <h4 className="text-xs font-bold text-gray-700 line-clamp-2 h-8 mb-2 group-hover:text-[#ffa41c] transition-colors">{p.name}</h4>
                <div className="mt-auto">
                  <span className="text-sm font-bold text-gray-900">￥{p.price.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
