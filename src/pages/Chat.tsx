import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { useLanguage } from '@/i18n/LanguageContext';
import restaurantBg from '@/assets/restaurant-bg.jpg';
import ReactMarkdown from 'react-markdown';

const Chat = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { messages, isLoading, sendMessage } = useChat();
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentInitialRef = useRef(false);

  // Auto-send initial message from query param
  useEffect(() => {
    const initialMsg = searchParams.get('message');
    if (initialMsg && !sentInitialRef.current) {
      sentInitialRef.current = true;
      sendMessage(decodeURIComponent(initialMsg));
    }
  }, [searchParams, sendMessage]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="relative flex h-screen flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img src={restaurantBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Header */}
      <div className="glass-strong flex items-center gap-3 px-4 py-3">
        <button onClick={() => navigate('/')} className="glass-button rounded-full p-2">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div>
          <h1 className="font-display text-lg font-bold text-foreground">{t('title')}</h1>
          <p className="text-xs text-foreground/60">AI Concierge</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'glass-blue-active text-foreground'
                  : 'glass text-foreground'
              }`}
            >
              {msg.role === 'assistant' ? (
                <div className="prose prose-sm prose-invert max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="glass rounded-2xl px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="glass-strong px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('write') + '...'}
            className="flex-1 rounded-full bg-foreground/10 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none border border-foreground/10 blue-input-focus transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="glass-button-solid rounded-full p-3 disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
