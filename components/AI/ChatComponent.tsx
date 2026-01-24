
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, User, RotateCcw } from 'lucide-react';
import { ChatMessage, Product } from '../../types';
import { geminiService } from '../../services/geminiService';

interface ChatComponentProps {
  products: Product[];
}

const ChatComponent: React.FC<ChatComponentProps> = ({ products }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Xin chào! ベトナム雑貨へようこそ。本日はご自宅用にお探しですか？それとも大切な方への贈り物でしょうか？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    geminiService.initChat(products);
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Placeholder for streaming
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    await geminiService.sendMessage(userMessage, (text) => {
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last.role === 'model') {
          return [...prev.slice(0, -1), { role: 'model', text }];
        }
        return prev;
      });
    });

    setIsLoading(false);
  };

  const handleReset = () => {
    setMessages([{ role: 'model', text: 'Xin chào! また新しくお伺いします。どのような雑貨に興味がありますか？' }]);
    geminiService.initChat(products);
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col h-[480px] overflow-hidden transition-all">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#ffd814] p-2 rounded-xl shadow-inner">
            <Sparkles size={18} className="text-gray-900" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm font-bold text-gray-900 leading-none mb-1">コンシェルジュ</h2>
            <span className="text-[9px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1">
              <span className="w-1 h-1 bg-green-500 rounded-full" />対話中
            </span>
          </div>
        </div>
        <button 
          onClick={handleReset}
          className="p-2 hover:bg-gray-50 rounded-full text-gray-300 hover:text-gray-600 transition-all"
          title="最初からやり直す"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border border-gray-100 ${
                msg.role === 'user' ? 'bg-white' : 'bg-[#ffd814]'
              }`}>
                {msg.role === 'user' ? <User size={14} className="text-gray-400" /> : <Sparkles size={14} className="text-gray-900" />}
              </div>
              <div className={`px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-gray-900 text-white rounded-2xl rounded-tr-none' 
                  : 'bg-white text-gray-700 rounded-2xl rounded-tl-none border border-gray-100'
              }`}>
                {msg.text || (isLoading && i === messages.length - 1 ? (
                  <div className="flex gap-1 py-1">
                    <span className="w-1 h-1 bg-gray-300 rounded-full animate-bounce" />
                    <span className="w-1 h-1 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-1 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                ) : '')}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="relative group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="メッセージを入力..."
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-3 pl-5 pr-12 text-sm focus:outline-none focus:border-[#ffa41c] focus:bg-white transition-all shadow-inner"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`absolute right-1.5 top-1.5 p-2 rounded-full transition-all ${
              !input.trim() || isLoading 
                ? 'text-gray-300' 
                : 'text-gray-900 bg-[#ffd814] hover:bg-[#f7ca00] shadow-md transform active:scale-90'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
