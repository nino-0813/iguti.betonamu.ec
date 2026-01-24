
import React from 'react';
import { Search, ShoppingCart, MapPin, Menu, User } from 'lucide-react';
import { Category } from '../../types';

interface HeaderProps {
  cartCount: number;
  selectedCategory: string;
  onSearch: (query: string) => void;
  onOpenCart: () => void;
  onGoHome: () => void;
  onSelectCategory: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  selectedCategory,
  onSearch, 
  onOpenCart, 
  onGoHome,
  onSelectCategory 
}) => {
  const navItems = [
    { label: '新着商品', value: '新着' },
    { label: '空間提案セット', value: Category.SET },
    { label: 'ベトナムコーヒー', value: Category.COFFEE },
    { label: 'バチャン焼き', value: Category.KITCHEN },
    { label: 'アオザイ特集', value: Category.FASHION },
    { label: '食品・調味料', value: Category.FOOD },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      {/* Top Main Header */}
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 py-3 flex items-center gap-6">
        {/* Logo */}
        <div 
          onClick={onGoHome}
          className="flex items-center cursor-pointer transition-opacity hover:opacity-80"
        >
          <span className="text-2xl font-bold tracking-tight text-gray-900">Xin Chào</span>
          <span className="text-[#ffa41c] text-xs font-bold mt-1 ml-1 uppercase">Vietnam</span>
        </div>

        {/* Search Bar - Minimalist White Design */}
        <div className="flex-1 hidden md:flex h-11 items-center bg-gray-50 rounded-full px-4 border border-gray-200 focus-within:border-[#ffa41c] transition-all">
          <Search size={20} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="ベトナムの伝統と空間を検索"
            className="flex-1 bg-transparent text-sm text-gray-800 focus:outline-none"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Right Navigation Icons */}
        <div className="flex items-center gap-2 md:gap-5">
          <div className="hidden lg:flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors group">
            <MapPin size={20} className="text-gray-500 group-hover:text-[#ffa41c]" />
            <div className="ml-2 flex flex-col leading-tight">
              <span className="text-[10px] text-gray-400">お届け先</span>
              <span className="text-xs font-bold text-gray-700">日本</span>
            </div>
          </div>

          <div className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors group">
            <User size={20} className="text-gray-500 group-hover:text-[#ffa41c]" />
            <div className="ml-2 hidden lg:flex flex-col leading-tight">
              <span className="text-[10px] text-gray-400">ログイン</span>
              <span className="text-xs font-bold text-gray-700">マイページ</span>
            </div>
          </div>

          {/* Cart */}
          <div 
            className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors group relative"
            onClick={onOpenCart}
          >
            <div className="relative">
              <ShoppingCart size={24} className="text-gray-700 group-hover:text-[#ffa41c]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ffa41c] text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs font-bold text-gray-700 ml-2 hidden sm:inline">カート</span>
          </div>
        </div>
      </div>

      {/* Sub Navbar */}
      <div className="bg-gray-50/80 border-t border-gray-100">
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 py-2 flex items-center text-xs font-medium text-gray-600 gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <button 
            onClick={() => onSelectCategory(Category.ALL)}
            className={`flex items-center transition-colors hover:text-[#ffa41c] ${selectedCategory === Category.ALL ? 'font-bold text-gray-900 border-b-2 border-[#ffa41c] pb-0.5' : ''}`}
          >
            <Menu size={18} className="mr-1.5" /> すべての商品
          </button>
          
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => onSelectCategory(item.value)}
              className={`transition-colors hover:text-[#ffa41c] py-1 ${selectedCategory === item.value ? 'font-bold text-gray-900 border-b-2 border-[#ffa41c]' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
