
import React from 'react';
import { CartItem } from '../../types';
import { Trash2, ChevronLeft, ShoppingBag } from 'lucide-react';

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onBackToHome: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ items, onUpdateQuantity, onRemove, onBackToHome }) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
      <div className="flex items-center gap-2 mb-8 group cursor-pointer" onClick={onBackToHome}>
        <ChevronLeft size={18} className="text-gray-400 group-hover:text-[#ffa41c] transition-colors" />
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#ffa41c] transition-colors">お買い物を続ける</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-10 pb-6 border-b border-gray-100">
              <ShoppingBag className="text-[#ffa41c]" size={24} />
              <h1 className="text-2xl font-bold text-gray-900">ショッピングバッグ</h1>
            </div>

            {items.length === 0 ? (
              <div className="py-20 text-center">
                <h2 className="text-lg font-bold text-gray-900 mb-2">バッグは空です</h2>
                <button 
                  onClick={onBackToHome}
                  className="bg-[#ffd814] text-gray-900 px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#f7ca00] transition-colors shadow-sm border border-[#fcd200]"
                >
                  商品を探しに行く
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row gap-6 group">
                    <div className="w-32 h-32 flex-shrink-0 bg-white rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 p-3">
                      <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between gap-4">
                        <h3 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-[#ffa41c] transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-sm font-bold text-gray-900">￥{item.price.toLocaleString()}</span>
                      </div>
                      <p className="text-[10px] font-bold text-teal-600 mt-1 uppercase tracking-widest">在庫あり</p>
                      
                      <div className="flex items-center gap-6 mt-auto pt-4">
                        <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                          <select 
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              onUpdateQuantity(item.id, val - item.quantity);
                            }}
                            className="bg-transparent text-xs font-bold text-gray-700 focus:outline-none cursor-pointer pr-2 pl-1"
                          >
                            {[...Array(10)].map((_, i) => (
                              <option key={i+1} value={i+1}>数量: {i+1}</option>
                            ))}
                          </select>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 size={12} /> 削除
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-8 border-t border-gray-100 flex justify-end">
                  <p className="text-sm text-gray-500">
                    小計 ({totalItems}点): <span className="text-xl font-bold text-gray-900 ml-2">￥{totalPrice.toLocaleString()}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {items.length > 0 && (
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-28">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">注文内容</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">小計</span>
                  <span className="text-gray-900 font-bold">￥{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">配送料</span>
                  <span className="text-teal-600 font-bold">無料</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900">合計</span>
                  <span className="text-2xl font-bold text-gray-900">￥{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 py-4 rounded-xl shadow-md font-bold text-sm transition-all border border-[#fcd200]">
                レジに進む
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
