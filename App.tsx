
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Layout/Header';
import ProductCard from './components/Product/ProductCard';
import CartPage from './components/Cart/CartPage';
import ProductDetailPage from './components/Product/ProductDetailPage';
import ChatComponent from './components/AI/ChatComponent';
import AdminPage from './components/Admin/AdminPage';
import { Product, CartItem, Category } from './types';
import { MOCK_PRODUCTS as INITIAL_PRODUCTS } from './constants';
import { geminiService } from './services/geminiService';
import { ArrowRight, CheckCircle2, Settings } from 'lucide-react';

type ViewType = 'home' | 'cart' | 'product-detail' | 'admin';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('home');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(Category.ALL);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showAddSuccess, setShowAddSuccess] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== Category.ALL) {
      if (selectedCategory === '新着') {
        result = [...result].reverse();
      } else {
        result = result.filter(p => p.category === selectedCategory);
      }
    }

    return result;
  }, [searchQuery, selectedCategory, products]);

  const handleAddToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    setShowAddSuccess(product.name);
    setTimeout(() => setShowAddSuccess(null), 3000);
  }, []);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setSelectedProduct(null);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return [];
    return products.filter(p => 
      p.category === selectedProduct.category && p.id !== selectedProduct.id
    );
  }, [selectedProduct, products]);

  const pageTitle = useMemo(() => {
    if (searchQuery) return `"${searchQuery}" の検索結果`;
    if (selectedCategory !== Category.ALL) return selectedCategory;
    return 'おすすめ商品一覧';
  }, [searchQuery, selectedCategory]);

  const isPureHome = !searchQuery && selectedCategory === Category.ALL;

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {view !== 'admin' && (
        <Header 
          cartCount={totalCartCount} 
          selectedCategory={selectedCategory}
          onSearch={(q) => {
            setSearchQuery(q);
            setSelectedCategory(Category.ALL);
            if (view !== 'home') setView('home');
          }}
          onOpenCart={() => setView('cart')}
          onGoHome={() => {
            setView('home');
            setSelectedProduct(null);
            setSelectedCategory(Category.ALL);
            setSearchQuery('');
          }}
          onSelectCategory={handleSelectCategory}
        />
      )}

      {showAddSuccess && (
        <div className="fixed top-24 right-6 z-[100] bg-white border-l-4 border-[#ffa41c] shadow-2xl p-5 max-w-sm rounded-xl animate-in fade-in slide-in-from-right-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="text-teal-600 mt-0.5" size={20} />
            <div>
              <p className="font-bold text-sm text-gray-900">カートに追加されました</p>
              <p className="text-[11px] text-gray-500 line-clamp-1 mb-3">{showAddSuccess}</p>
              <button 
                onClick={() => setView('cart')}
                className="bg-[#ffd814] text-gray-900 text-[10px] font-bold px-4 py-2 rounded-lg hover:bg-[#f7ca00] transition-colors border border-[#fcd200]"
              >
                カートを表示して進む
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">
        {view === 'admin' ? (
          <AdminPage 
            products={products} 
            onUpdateProducts={handleUpdateProducts}
            onBackToStore={() => setView('home')} 
          />
        ) : view === 'cart' ? (
          <CartPage 
            items={cart} 
            onUpdateQuantity={updateCartQuantity} 
            onRemove={removeFromCart}
            onBackToHome={() => setView('home')}
          />
        ) : view === 'product-detail' && selectedProduct ? (
          <ProductDetailPage 
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBackToHome={() => {
              setView('home');
              setSelectedProduct(null);
            }}
            relatedProducts={relatedProducts}
            onSelectProduct={handleProductSelect}
          />
        ) : (
          <>
            {isPureHome && (
              <>
                <div className="relative h-[300px] sm:h-[400px] md:h-[550px] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=1600&h=800" 
                    alt="Vietnam Boutique" 
                    className="w-full h-full object-cover brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent" />
                  
                  <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-20">
                    <div className="max-w-2xl">
                      <span className="inline-block text-[8px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase bg-[#ffa41c] text-white px-2 sm:px-3 py-0.5 sm:py-1 mb-3 sm:mb-4 md:mb-6 rounded">Selected Collections</span>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold mb-3 sm:mb-4 md:mb-6 leading-tight text-gray-900">
                        ベトナムを、<br />もっと身近に.
                      </h1>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-lg">
                        現地職人の温もりを感じるバチャン焼きから、空間を劇的に変えるセット商品まで。Xin Chào Vietnamが贈る、至福のセレクト。
                      </p>
                      <div className="flex gap-3 sm:gap-4">
                        <button 
                          onClick={() => {
                            handleSelectCategory(Category.SET);
                          }}
                          className="bg-[#ffd814] text-gray-900 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 hover:bg-[#f7ca00] transition-all shadow-lg border border-[#fcd200]"
                        >
                          空間提案セットを見る <ArrowRight size={14} className="sm:w-[18px] sm:h-[18px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="max-w-[1000px] mx-auto -mt-12 sm:-mt-16 px-3 sm:px-4 mb-12 sm:mb-16 relative z-10">
                  <ChatComponent products={products} />
                </div>
              </>
            )}

            <div className={`max-w-[1500px] mx-auto px-3 sm:px-4 md:px-8 pb-12 sm:pb-16 md:pb-20 ${!isPureHome ? 'mt-8 sm:mt-12' : ''}`}>
              {isPureHome && (
                <div className="mb-12 sm:mb-16 md:mb-20">
                  <div className="flex items-end justify-between mb-6 sm:mb-8 md:mb-10 border-b border-gray-100 pb-4 sm:pb-5 md:pb-6">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-bold text-[#ffa41c] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-1 sm:mb-2 block">Special Package</span>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">空間提案セット</h2>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
                    {products.filter(p => p.category === Category.SET).map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAddToCart={handleAddToCart}
                        onSelect={() => handleProductSelect(product)}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-12 sm:mb-16 md:mb-20">
                <div className="flex items-end justify-between mb-6 sm:mb-8 md:mb-10 border-b border-gray-100 pb-4 sm:pb-5 md:pb-6">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-[#ffa41c] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-1 sm:mb-2 block">Catalog</span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{pageTitle}</h2>
                  </div>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
                    {filteredProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAddToCart={handleAddToCart}
                        onSelect={() => handleProductSelect(product)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-12 sm:py-16 md:py-20 text-center">
                    <p className="text-sm sm:text-base text-gray-500">該当する商品は見つかりませんでした。</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {view !== 'admin' && (
        <footer className="bg-white border-t border-gray-100 text-gray-900 py-8 sm:py-12 md:py-16">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 md:gap-12">
            <div className="col-span-2 sm:col-span-3 md:col-span-2">
               <div className="flex items-center mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-bold tracking-tight">Xin Chào</span>
                <span className="text-[#ffa41c] text-[10px] sm:text-xs font-bold mt-0.5 sm:mt-1 ml-0.5 sm:ml-1 uppercase">Vietnam</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-sm mb-4 sm:mb-0">
                Xin Chào Vietnamは、ベトナム各地の伝統的な職人技を現代の暮らしに届けるセレクトショップです。
              </p>
              <button 
                onClick={() => setView('admin')}
                className="mt-4 sm:mt-8 flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-bold text-gray-300 hover:text-gray-500 transition-colors uppercase tracking-widest"
              >
                <Settings size={11} className="sm:w-3 sm:h-3" /> <span className="hidden sm:inline">管理者用メニュー</span>
              </button>
            </div>
            
            <div>
              <h4 className="font-bold text-xs sm:text-sm mb-4 sm:mb-6 uppercase tracking-widest text-gray-400">Curations</h4>
              <ul className="text-[11px] sm:text-xs space-y-3 sm:space-y-4 text-gray-600">
                <li onClick={() => handleSelectCategory(Category.SET)} className="hover:text-[#ffa41c] cursor-pointer">空間提案セット</li>
                <li className="hover:text-[#ffa41c] cursor-pointer">B2B 大口注文</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs sm:text-sm mb-4 sm:mb-6 uppercase tracking-widest text-gray-400">Information</h4>
              <ul className="text-[11px] sm:text-xs space-y-3 sm:space-y-4 text-gray-600">
                <li className="hover:text-[#ffa41c] cursor-pointer">配送・送料について</li>
                <li className="hover:text-[#ffa41c] cursor-pointer">利用規約</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs sm:text-sm mb-4 sm:mb-6 uppercase tracking-widest text-gray-400">Contact</h4>
              <ul className="text-[11px] sm:text-xs space-y-3 sm:space-y-4 text-gray-600">
                <li className="hover:text-[#ffa41c] cursor-pointer">お問い合わせ</li>
                <li className="hover:text-[#ffa41c] cursor-pointer">採用情報</li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 mt-8 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center md:text-left">© 2024 Xin Chào Vietnam. Handcrafted for your life.</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
