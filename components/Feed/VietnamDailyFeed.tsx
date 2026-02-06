import React from 'react';
import { Camera } from 'lucide-react';

export interface DailyPost {
  id: string;
  date: string;
  image: string;
  diary: string;
  hashtags: string[];
}

const MOCK_POSTS: DailyPost[] = [
  {
    id: '1',
    date: '2025.02.06',
    image: '/images/S__59285518.webp',
    diary: 'ホイアンの夕暮れ。提灯が灯り始める時間が一番好きです。現地の工房で、職人さんが一つずつ仕上げているランタンを見せてもらいました。',
    hashtags: ['#ホイアン', '#ベトナムの灯り', '#手仕事', '#XinChàoVietnam'],
  },
  {
    id: '2',
    date: '2025.02.05',
    image: '/images/S__59285516.jpg',
    diary: '湖畔の花屋さん。自転車に積まれた花が朝日を浴びて。ハノイの日常の一コマです。',
    hashtags: ['#ハノイ', '#ベトナムの日常', '#花', '#朝の風景'],
  },
  {
    id: '3',
    date: '2025.02.04',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800',
    diary: 'バチャン村の窯元を訪問。千年続く陶芸の町で、蓮の花を手書きで描く職人さんの姿に惹かれました。',
    hashtags: ['#バチャン焼き', '#ベトナム雑貨', '#職人', '#陶芸'],
  },
  {
    id: '4',
    date: '2025.02.03',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800',
    diary: '路地裏のカフェ。ベトナムコーヒーを飲みながら、窓の外を行き交うバイクを眺める。時間がゆっくり流れます。',
    hashtags: ['#ベトナム', '#カフェ', '#日常', '#ハノイ'],
  },
];

const VietnamDailyFeed: React.FC = () => {
  return (
    <section className="w-full">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Camera size={18} className="text-[#ffa41c]" />
          <span className="text-[10px] sm:text-xs font-bold text-[#ffa41c] tracking-wider uppercase">
            ベトナムの日常
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          写真と日記で届ける、現地のひとコマ
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          日々の出会いや風景を、写真とハッシュタグで発信しています。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {MOCK_POSTS.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg sm:rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={post.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2.5 sm:p-3">
              <time className="text-[9px] sm:text-[10px] text-gray-400 font-medium">
                {post.date}
              </time>
              <p className="text-[11px] sm:text-xs text-gray-700 mt-1 leading-relaxed line-clamp-3">
                {post.diary}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {post.hashtags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-block text-[9px] sm:text-[10px] text-[#ffa41c] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default VietnamDailyFeed;
