import { createContext, useContext, useState, useCallback, ReactNode, useRef } from 'react';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type ChatContextType = {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (text: string) => Promise<void>;
  resetChat: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const sessionIdRef = useRef<string>(crypto.randomUUID());

  const sendMessage = useCallback(async (text: string) => {
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const apiUrl = 'https://nbaruermb9.us-east-1.awsapprunner.com/chat';
      const apiKey = 'j.vSH4Q4(586)';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({
          text: text,
          session_id: sessionIdRef.current,
          restaurant_id: 'Franco Manca',
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.response || data.message || data.answer || JSON.stringify(data),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Chat API error:', error);
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetChat = useCallback(() => {
    setMessages([]);
    sessionIdRef.current = crypto.randomUUID();
  }, []);

  return (
    <ChatContext.Provider value={{ messages, isLoading, sendMessage, resetChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
};
