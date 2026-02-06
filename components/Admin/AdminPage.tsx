
import React, { useState } from 'react';
import { Product, Category } from '../../types';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ChevronLeft, 
  Save, 
  X, 
  Image as ImageIcon,
  LayoutDashboard,
  Package
} from 'lucide-react';

interface AdminPageProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  onBackToStore: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ products, onUpdateProducts, onBackToStore }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('本当にこの商品を削除しますか？')) {
      onUpdateProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const productData: Product = {
      id: editingProduct?.id || `prod-${Date.now()}`,
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      category: formData.get('category') as Category,
      image: formData.get('image') as string,
      description: formData.get('description') as string,
      rating: editingProduct?.rating || 5,
      reviewCount: editingProduct?.reviewCount || 0,
      isPrime: formData.get('isPrime') === 'on',
      stockCount: Number(formData.get('stockCount')),
    };

    if (isAddMode) {
      onUpdateProducts([productData, ...products]);
    } else {
      onUpdateProducts(products.map(p => p.id === productData.id ? productData : p));
    }

    setEditingProduct(null);
    setIsAddMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
          <span className="font-bold text-xl tracking-tight">Xin Chào</span>
          <span className="text-[#ffa41c] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#ffa41c] uppercase">Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <div className="flex items-center gap-3 px-4 py-3 bg-orange-50 text-[#ffa41c] rounded-xl font-bold text-sm cursor-pointer transition-all">
            <LayoutDashboard size={18} />
            <span>在庫管理</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-50 rounded-xl text-sm cursor-not-allowed transition-all">
            <Package size={18} />
            <span>注文管理 (予定)</span>
          </div>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={onBackToStore}
            className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-widest"
          >
            <ChevronLeft size={14} /> ショップに戻る
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">在庫管理</h1>
              <p className="text-sm text-gray-500 mt-1">フロントエンドに表示される商品の編集・管理が可能です。</p>
            </div>
            <button 
              onClick={() => {
                setEditingProduct(null);
                setIsAddMode(true);
              }}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg"
            >
              <Plus size={18} /> 新規商品追加
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">総商品数</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}点</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">カテゴリー数</p>
              <p className="text-2xl font-bold text-gray-900">{Object.keys(Category).length}種</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">平均単価</p>
              <p className="text-2xl font-bold text-gray-900">
                ￥{Math.round(products.reduce((a, b) => a + b.price, 0) / products.length).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
            <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="商品名・カテゴリーで検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#ffa41c] transition-all"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    <th className="px-6 py-4">商品情報</th>
                    <th className="px-6 py-4">カテゴリー</th>
                    <th className="px-6 py-4">価格</th>
                    <th className="px-6 py-4">在庫数</th>
                    <th className="px-6 py-4 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-lg border border-gray-100 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                            <img src={p.image} className="max-h-full max-w-full object-contain" alt="" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 line-clamp-1">{p.name}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">ID: {p.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">
                        ￥{p.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${p.stockCount > 10 ? 'bg-green-500' : 'bg-orange-500'}`} />
                          <span className="text-sm font-medium text-gray-600">{p.stockCount}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => {
                              setEditingProduct(p);
                              setIsAddMode(false);
                            }}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(p.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Modal Overlay */}
      {(editingProduct || isAddMode) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => { setEditingProduct(null); setIsAddMode(false); }} />
          <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold">{isAddMode ? '新規商品の追加' : '商品情報の編集'}</h2>
              <button onClick={() => { setEditingProduct(null); setIsAddMode(false); }} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">商品名</label>
                <input 
                  required
                  name="name"
                  defaultValue={editingProduct?.name || ''}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ffa41c] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">価格 (￥)</label>
                  <input 
                    required
                    type="number"
                    name="price"
                    defaultValue={editingProduct?.price || ''}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ffa41c] transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">在庫数</label>
                  <input 
                    required
                    type="number"
                    name="stockCount"
                    defaultValue={editingProduct?.stockCount || 0}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ffa41c] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">カテゴリー</label>
                <select 
                  name="category"
                  defaultValue={editingProduct?.category || Category.KITCHEN}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ffa41c] transition-all"
                >
                  {Object.values(Category).filter(v => v !== Category.ALL).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">画像URL (Unsplashや外部URL)</label>
                <div className="flex gap-4">
                  <input 
                    name="image"
                    placeholder="https://images.unsplash.com/..."
                    defaultValue={editingProduct?.image || ''}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ffa41c] transition-all"
                  />
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shrink-0 border border-gray-200 overflow-hidden">
                    <ImageIcon size={20} className="text-gray-300" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">商品説明</label>
                <textarea 
                  name="description"
                  rows={4}
                  defaultValue={editingProduct?.description || ''}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ffa41c] transition-all resize-none"
                />
              </div>

              <div className="flex items-center gap-3 py-2">
                <input 
                  type="checkbox" 
                  name="isPrime" 
                  id="isPrime"
                  defaultChecked={editingProduct?.isPrime || false}
                  className="w-4 h-4 accent-[#ffa41c] rounded"
                />
                <label htmlFor="isPrime" className="text-xs font-bold text-gray-700">翌日配送対象にする</label>
              </div>

              <div className="pt-6 flex gap-3">
                <button 
                  type="button"
                  onClick={() => { setEditingProduct(null); setIsAddMode(false); }}
                  className="flex-1 py-3 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors"
                >
                  キャンセル
                </button>
                <button 
                  type="submit"
                  className="flex-[2] bg-gray-900 text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg"
                >
                  <Save size={18} /> 保存する
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
