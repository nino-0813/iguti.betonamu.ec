# XIN CHÀO — Vietnamese Artisan Shop

Next.js で動くベトナム職人ショップのフロント＆APIです。

## 技術スタック

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS v4**
- **Stripe**（チェックアウト）
- **Motion**（アニメーション）

## 開発

1. 依存関係のインストール:
   ```bash
   npm install
   ```
2. 環境変数を設定（`.env.local` を作成し、`.env.example` を参考に記入）
3. 開発サーバー起動:
   ```bash
   npm run dev
   ```
4. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## ビルド・本番

```bash
npm run build
npm run start
```

## 主なルート

- `/` — 商品一覧
- `/category/[category]` — カテゴリ別一覧（雑貨・アパレル・バッグ）
- `/product/[id]` — 商品詳細
- `/cart` — カート
- `/tokushoho` — 特定商取引法に基づく表記
- `/success` — 注文完了

## 環境変数

`.env.example` をコピーして `.env.local` を作成し、必要に応じて設定してください。

- `APP_URL` — アプリのURL（Stripe リダイレクト用）
- `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe
- （任意）Supabase、GEMINI_API_KEY など
