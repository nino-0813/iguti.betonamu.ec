import OpenAI from 'openai';
import { Product } from '../types';

export class ChatService {
  private client: OpenAI | null = null;
  private apiKey: string | null = null;
  private messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.OPENAI_API_KEY || null;
    if (!this.apiKey) {
      console.warn('OpenAI API key is not set. Chat functionality will be limited.');
    } else {
      try {
        this.client = new OpenAI({
          apiKey: this.apiKey,
          dangerouslyAllowBrowser: true, // ブラウザで使用する場合
        });
      } catch (error) {
        console.error('Failed to initialize OpenAI API:', error);
        this.client = null;
      }
    }
  }

  initChat(products: Product[]) {
    if (!this.client) {
      console.warn('OpenAI API is not available. Chat functionality disabled.');
      return;
    }

    const productList = products.map(p => 
      `- ${p.name} (ID: ${p.id}, カテゴリー: ${p.category}, 価格: ￥${p.price})`
    ).join('\n');

    // システムメッセージを設定
    this.messages = [
      {
        role: 'system',
        content: `
          あなたはベトナム雑貨専門店「Xin Chào Vietnam」のコンシェルジュです。
          
          ## 振る舞いのルール (厳守):
          1. **短文で話す**: 1回の発言は最大でも100〜120文字程度に抑えてください。
          2. **1つずつ質問する**: 最初から商品を提案せず、まずユーザーの目的（自分用？ギフト？お店用？）や好みを1つずつ聞いてください。
          3. **聞き出しに徹する**: ユーザーが何に困っているか、どんな雰囲気が好きか、2〜3回ラリーを繰り返して深掘りしてください。
          4. **最後に提案する**: ニーズが固まったら、商品リストから最も合うものを1〜2点だけ具体的に名前を出して提案してください。
          5. **ベトナムの雰囲気**: 丁寧で親しみやすく、少しだけベトナムの風情を感じさせる言葉遣い（「Xin chào」など）を混ぜてください。

          ## 取り扱い商品:
          ${productList}
        `,
      },
      {
        role: 'assistant',
        content: 'Xin chào! ベトナム雑貨へようこそ。本日はご自宅用にお探しですか？それとも大切な方への贈り物でしょうか？',
      },
    ];
  }

  async sendMessage(message: string, onChunk: (text: string) => void) {
    if (!this.client) {
      onChunk("申し訳ございません。現在、チャット機能は利用できません。商品一覧から直接お選びいただけます。");
      return;
    }

    try {
      // ユーザーメッセージを追加
      this.messages.push({
        role: 'user',
        content: message,
      });

      // ストリーミングでレスポンスを取得
      const stream = await this.client.chat.completions.create({
        model: 'gpt-4o-mini', // または 'gpt-3.5-turbo' でコスト削減
        messages: this.messages,
        stream: true,
        max_tokens: 200,
        temperature: 0.7,
      });

      let fullText = "";
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          fullText += content;
          onChunk(fullText);
        }
      }

      // アシスタントのレスポンスをメッセージ履歴に追加
      if (fullText) {
        this.messages.push({
          role: 'assistant',
          content: fullText,
        });
      }
    } catch (error) {
      console.error("OpenAI Chat Error:", error);
      onChunk("申し訳ありません。少し休憩させてください。後ほどまたお声がけください。");
    }
  }

  resetChat(products: Product[]) {
    this.messages = [];
    this.initChat(products);
  }
}

export const chatService = new ChatService();

