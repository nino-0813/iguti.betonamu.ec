
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Product } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY || '';
    if (!apiKey) {
      console.warn('Gemini API key is not set. Chat functionality will be limited.');
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  initChat(products: Product[]) {
    const productList = products.map(p => 
      `- ${p.name} (ID: ${p.id}, カテゴリー: ${p.category}, 価格: ￥${p.price})`
    ).join('\n');

    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `
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
    });
  }

  async sendMessage(message: string, onChunk: (text: string) => void) {
    if (!this.chat) return;

    try {
      const result = await this.chat.sendMessageStream({ message });
      let fullText = "";
      for await (const chunk of result) {
        const text = (chunk as GenerateContentResponse).text;
        if (text) {
          fullText += text;
          onChunk(fullText);
        }
      }
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      onChunk("申し訳ありません。少し休憩させてください。後ほどまたお声がけください。");
    }
  }
}

export const geminiService = new GeminiService();
