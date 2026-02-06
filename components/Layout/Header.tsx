import React from 'react';
import { ShoppingCart, User } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  selectedCategory: string;
  onSearch: (query: string) => void;
  onOpenCart: () => void;
  onOpenMyPage: () => void;
  onGoHome: () => void;
  onSelectCategory: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenMyPage,
  onGoHome,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full min-w-[320px] bg-white border-b border-gray-100 overflow-x-hidden">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 h-14 flex items-center justify-between gap-4 w-full">
        {/* Logo */}
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center flex-shrink-0 transition-opacity hover:opacity-70"
        >
          <span className="text-lg md:text-xl font-bold tracking-tight text-gray-900">Xin Chào</span>
          <span className="text-[#ffa41c] text-[10px] md:text-xs font-bold mt-0.5 ml-0.5 uppercase">Vietnam</span>
        </button>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* マイページ */}
          <button
            type="button"
            onClick={onOpenMyPage}
            className="flex items-center gap-1.5 p-2 rounded-full text-gray-700 hover:bg-gray-50 transition-colors flex-shrink-0"
          >
            <User size={22} className="text-gray-600" />
            <span className="text-sm font-medium hidden sm:inline">マイページ</span>
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={onOpenCart}
            className="flex items-center gap-1.5 p-2 -mr-2 rounded-full text-gray-700 hover:bg-gray-50 transition-colors flex-shrink-0"
          >
          <div className="relative">
            <ShoppingCart size={22} className="text-gray-600" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ffa41c] text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-0.5">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>
          <span className="text-sm font-medium hidden sm:inline">カート</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
