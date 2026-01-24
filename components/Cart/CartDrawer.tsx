
import React from 'react';
import { CartItem } from '../../types';
import { X, Trash2, Plus, Minus } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#eaeded] h-full shadow-2xl flex flex-col">
        <div className="p-4 bg-white border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">ショッピングカート</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-10 bg-white rounded p-4">
              <p className="text-gray-500">カートに商品が入っていません。</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded shadow-sm flex gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
                <div className="flex-1">
                  <h3 className="text-sm font-bold line-clamp-2">{item.name}</h3>
                  <p className="text-lg font-bold text-[#B12704] mt-1">￥{item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center border rounded">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:bg-gray-100"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-xs text-[#007185] hover:underline flex items-center gap-1"
                    >
                      <Trash2 size={14} /> 削除
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-white border-t space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span>小計 ({items.reduce((a, b) => a + b.quantity, 0)} 点):</span>
              <span className="font-bold text-[#B12704]">￥{total.toLocaleString()}</span>
            </div>
            <button className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-3 rounded-md shadow-sm border border-[#fcd200] font-bold">
              レジに進む
            </button>
            <p className="text-xs text-center text-gray-500">配送料無料（一部対象外）</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
