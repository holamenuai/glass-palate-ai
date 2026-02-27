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
  sendAudio: (audioBlob: Blob) => Promise<void>;
  resetChat: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const API_URL = 'https://nbaruermb9.us-east-1.awsapprunner.com/chat';
const API_KEY = 'j.vSH4Q4(586)';

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const sessionIdRef = useRef<string>(crypto.randomUUID());

  const callApi = useCallback(async (formData: FormData): Promise<string> => {
    formData.append('session_id', sessionIdRef.current);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'X-API-KEY': API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response || data.message || data.answer || JSON.stringify(data);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('text_input', text);
      const reply = await callApi(formData);
      const assistantMsg: Message = { id: crypto.randomUUID(), role: 'assistant', content: reply };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Chat API error:', error);
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [callApi]);

  const sendAudio = useCallback(async (audioBlob: Blob) => {
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: '🎤 Voice message' };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.webm');
      const reply = await callApi(formData);
      const assistantMsg: Message = { id: crypto.randomUUID(), role: 'assistant', content: reply };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Chat API error:', error);
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [callApi]);

  const resetChat = useCallback(() => {
    setMessages([]);
    sessionIdRef.current = crypto.randomUUID();
  }, []);

  return (
    <ChatContext.Provider value={{ messages, isLoading, sendMessage, sendAudio, resetChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
};
