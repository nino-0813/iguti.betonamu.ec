
import React from 'react';
import { Product } from '../../types';
import { Star, Package, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onSelect: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onSelect }) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-2 h-2 sm:w-3 sm:h-3">
            <Star 
              size={12} 
              className={`w-full h-full ${i < Math.floor(rating) ? "text-[#ffa41c] fill-[#ffa41c]" : "text-gray-200"}`}
            />
          </div>
        ))}
        <span className="text-[8px] sm:text-[10px] text-gray-400 ml-0.5 sm:ml-1">
          ({product.reviewCount.toLocaleString()})
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white group flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-xl overflow-hidden border border-gray-100">
      <div 
        onClick={onSelect}
        className="relative aspect-square overflow-hidden bg-white flex items-center justify-center cursor-pointer p-1 sm:p-4"
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        {product.items && (
          <div className="absolute top-1 left-1 sm:top-3 sm:left-3 bg-[#ffa41c] text-white text-[6px] sm:text-[9px] font-bold px-1 sm:px-2 py-0.5 rounded shadow-sm flex items-center gap-0.5 sm:gap-1">
            <Package size={6} className="sm:w-[10px] sm:h-[10px]" /> <span className="hidden sm:inline">PACKAGE</span>
          </div>
        )}
      </div>
      
      <div className="p-1.5 sm:p-4 flex flex-col flex-1">
        <div className="mb-1">
          {renderStars(product.rating)}
        </div>
        
        <h3 
          onClick={onSelect}
          className="text-[9px] sm:text-sm font-bold text-gray-800 line-clamp-2 mb-1 sm:mb-2 hover:text-[#ffa41c] cursor-pointer h-6 sm:h-10 transition-colors leading-tight"
        >
          {product.name}
        </h3>
        
        {product.items && (
          <div className="mb-2 sm:mb-3 bg-gray-50/80 p-1 sm:p-2 rounded-lg">
            <p className="text-[7px] sm:text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5 sm:mb-1">Items Included:</p>
            <ul className="text-[8px] sm:text-[10px] text-gray-500 leading-tight space-y-0.5">
              {product.items.slice(0, 2).map((item, idx) => (
                <li key={idx} className="truncate flex items-center gap-0.5 sm:gap-1">
                  <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-gray-300 rounded-full" /> {item}
                </li>
              ))}
              {product.items.length > 2 && <li className="pl-1 sm:pl-2">...ほか</li>}
            </ul>
          </div>
        )}

        <div className="flex items-baseline gap-0.5 sm:gap-1 mt-auto">
          <span className="text-[8px] sm:text-xs font-medium text-gray-400">￥</span>
          <span className="text-sm sm:text-xl font-bold text-gray-900">{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-[8px] sm:text-[10px] text-gray-300 line-through ml-0.5 sm:ml-1">￥{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        <div className="flex items-center justify-between mt-1.5 sm:mt-3 gap-1">
          {product.isPrime ? (
            <span className="text-[7px] sm:text-[10px] font-bold text-teal-600 bg-teal-50 px-1 sm:px-2 py-0.5 rounded">翌日配送可</span>
          ) : (
            <span className="text-[7px] sm:text-[10px] text-gray-400">在庫あり</span>
          )}
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="flex-1 sm:w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 text-[8px] sm:text-xs font-bold py-1 sm:py-1.5 rounded-full shadow-sm border border-[#fcd200] transition-all flex items-center justify-center gap-0.5 sm:gap-1"
          >
            <ShoppingCart size={10} className="sm:w-[14px] sm:h-[14px]" /> <span className="hidden sm:inline">カート</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
