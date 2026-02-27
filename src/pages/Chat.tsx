import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { useLanguage } from '@/i18n/LanguageContext';
import { CONFIG } from '@/config';
import ReactMarkdown from 'react-markdown';
import TypewriterText from '@/components/TypewriterText';

const Chat = () => {
  const navigate = useNavigate();
  const { messages, isLoading, sendMessage } = useChat();
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const seenMsgIds = useRef<Set<string>>(new Set());
  const [animatingIds, setAnimatingIds] = useState<Set<string>>(new Set());

  // Mark messages for animation
  useEffect(() => {
    messages.forEach((msg) => {
      if (!seenMsgIds.current.has(msg.id)) {
        seenMsgIds.current.add(msg.id);
        setAnimatingIds((prev) => new Set(prev).add(msg.id));
      }
    });
  }, [messages]);

  const handleAnimationComplete = useCallback((id: string) => {
    setAnimatingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading, animatingIds]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-auto animate-fade-in">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img src={CONFIG.BACKGROUND_IMAGE} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Header above card */}
      <div className="flex w-full max-w-[560px] items-center justify-between px-4 pb-3 pt-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="glass-button rounded-full p-2">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="font-display text-2xl font-black text-foreground drop-shadow-lg">{CONFIG.RESTAURANT_NAME}</h1>
        </div>
        <p className="text-xs text-foreground/60">AI Concierge</p>
      </div>

      {/* Chat card */}
      <div className="glass-strong w-full max-w-[560px] rounded-3xl flex flex-col" style={{ height: 'min(70vh, 600px)' }}>
        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {messages.map((msg) => {
            const shouldAnimate = animatingIds.has(msg.id);

            return (
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
                    shouldAnimate ? (
                      <div className="prose prose-sm prose-invert max-w-none">
                        <TypewriterText
                          text={msg.content}
                          speed={10}
                          onComplete={() => handleAnimationComplete(msg.id)}
                        />
                      </div>
                    ) : (
                      <div className="prose prose-sm prose-invert max-w-none">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    )
                  ) : shouldAnimate ? (
                    <TypewriterText
                      text={msg.content}
                      speed={15}
                      onComplete={() => handleAnimationComplete(msg.id)}
                    />
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            );
          })}
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
        <div className="border-t border-foreground/10 px-5 py-3">
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

      <p className="mt-4 pb-6 text-xs text-foreground/40">
        {t('poweredBy')}{' '}
        <a href={CONFIG.BRANDING_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-foreground/60 hover:text-foreground/90 hover:underline transition-colors">
          {CONFIG.BRANDING_NAME}
        </a>
      </p>
    </div>
  );
};

export default Chat;
