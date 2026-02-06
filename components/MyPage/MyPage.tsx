import React from 'react';
import { User, Package, MapPin, ChevronRight, ArrowLeft } from 'lucide-react';

interface MyPageProps {
  onBackToHome: () => void;
}

const MyPage: React.FC<MyPageProps> = ({ onBackToHome }) => {
  const sections = [
    {
      icon: Package,
      title: '注文履歴',
      description: 'ご注文の確認・追跡',
      href: '#',
      disabled: true,
    },
    {
      icon: MapPin,
      title: 'お届け先',
      description: '住所の登録・変更',
      href: '#',
      disabled: true,
    },
    {
      icon: User,
      title: '会員情報',
      description: '名前・メールアドレスなど',
      href: '#',
      disabled: true,
    },
  ];

  return (
    <div className="min-h-[60vh] max-w-[600px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <button
        type="button"
        onClick={onBackToHome}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft size={18} />
        ストアに戻る
      </button>

      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">マイページ</h1>
      <p className="text-sm text-gray-500 mb-8">ご注文やお届け先の管理はこちらから</p>

      <ul className="space-y-2">
        {sections.map(({ icon: Icon, title, description, disabled }) => (
          <li key={title}>
            <div
              className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                disabled
                  ? 'border-gray-100 bg-gray-50/50 cursor-not-allowed opacity-75'
                  : 'border-gray-100 bg-white hover:bg-gray-50 cursor-pointer'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{description}</p>
              </div>
              {disabled ? (
                <span className="text-xs text-gray-400">準備中</span>
              ) : (
                <ChevronRight size={20} className="text-gray-400 flex-shrink-0" />
              )}
            </div>
          </li>
        ))}
      </ul>

      <p className="text-xs text-gray-400 mt-8 text-center">
        ログイン機能の実装に合わせて、注文履歴・お届け先・会員情報をご利用いただけるようになります。
      </p>
    </div>
  );
};

export default MyPage;
