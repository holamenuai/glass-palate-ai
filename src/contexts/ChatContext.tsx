import { createContext, useContext, useState, useCallback, ReactNode, useRef } from 'react';
import { CONFIG } from '@/config';

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
  aiResponseCount: number;
  showChips: boolean;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponseCount, setAiResponseCount] = useState(0);
  const showChips = !isLoading && aiResponseCount > 0 && aiResponseCount <= 4;
  const sessionIdRef = useRef<string>(crypto.randomUUID());

  const callApi = useCallback(async (formData: FormData): Promise<{ response: string; transcript?: string; suggestions?: string[] }> => {
    formData.append('session_id', sessionIdRef.current);

    const res = await fetch(CONFIG.BACKEND_URL, {
      method: 'POST',
      headers: {
        'X-API-KEY': CONFIG.API_KEY,
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return {
      response: data.response || data.message || data.answer || JSON.stringify(data),
      transcript: data.transcript,
      suggestions: data.suggestions || [],
    };
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('text_input', text);
      const { response, suggestions: newSuggestions } = await callApi(formData);
      const assistantMsg: Message = { id: crypto.randomUUID(), role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMsg]);
      setAiResponseCount(prev => prev + 1);
    } catch (error) {
      console.error('Chat API error:', error);
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      }]);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [callApi]);

  const sendAudio = useCallback(async (audioBlob: Blob) => {
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: '🎤 Transcribing...' };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.webm');
      const { response, transcript, suggestions: newSuggestions } = await callApi(formData);

      if (transcript) {
        setMessages(prev => prev.map(m =>
          m.id === userMsg.id ? { ...m, content: transcript } : m
        ));
      }

      const assistantMsg: Message = { id: crypto.randomUUID(), role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMsg]);
      setAiResponseCount(prev => prev + 1);
    } catch (error) {
      console.error('Chat API error:', error);
      setMessages(prev => [
        ...prev.map(m => m.id === userMsg.id ? { ...m, content: '🎤 Voice message' } : m),
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [callApi]);

  const resetChat = useCallback(() => {
    setMessages([]);
    setAiResponseCount(0);
    setSuggestions([]);
    sessionIdRef.current = crypto.randomUUID();
  }, []);

  return (
    <ChatContext.Provider value={{ messages, isLoading, sendMessage, sendAudio, resetChat, aiResponseCount, suggestions }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
};
