import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { CONFIG } from '@/config';
import { useLanguage } from '@/i18n/LanguageContext';
import { useChat } from '@/contexts/ChatContext';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import AllergySelector, { type AllergyKey } from '@/components/AllergySelector';
import QuickAsk, { type QuickAskKey } from '@/components/QuickAsk';
import SearchBar from '@/components/SearchBar';


const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { resetChat } = useChat();
  const [selectedAllergies, setSelectedAllergies] = useState<Set<AllergyKey>>(new Set());
  const [selectedQuickAsks, setSelectedQuickAsks] = useState<Set<QuickAskKey>>(new Set());

  const toggleAllergy = (key: AllergyKey) => {
    setSelectedAllergies((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else if (next.size < 2) {
        next.add(key);
      }
      return next;
    });
  };

  const toggleQuickAsk = (key: QuickAskKey) => {
    setSelectedQuickAsks((prev) => {
      const next = new Set<QuickAskKey>();
      if (!prev.has(key)) next.add(key);
      return next;
    });
  };

  const handleWrite = () => {
    resetChat();
    navigate('/chat?mode=write');
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-auto">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img src={CONFIG.BACKGROUND_IMAGE} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Language switcher - top right corner */}
      <div className="fixed right-3 top-3 z-50">
        <LanguageSwitcher compact />
      </div>

      {/* Content - pushed to bottom on mobile, centered on desktop */}
      <div className="mt-auto flex w-full flex-col items-center px-4 pb-4 pt-8 sm:my-auto sm:pb-6">
        {/* Brand Header - single instance */}
        <div className="mb-3 flex flex-col items-center sm:mb-4">
          <h1 className="font-display text-5xl font-bold drop-shadow-lg leading-none text-destructive sm:text-6xl">
            Giuseppe's
          </h1>
          <p className="font-heading mt-0.5 text-sm font-semibold tracking-[0.35em] uppercase text-destructive sm:text-lg">
            Kitchen
          </p>
          <p className="mt-1 text-center text-[10px] font-medium text-foreground/40 tracking-wider sm:text-xs">
            Your AI Dining Concierge · Plant-Based Experts
          </p>
        </div>

        {/* Main Card - more transparent glass */}
        <div className="glass-card-transparent w-full max-w-[450px] rounded-2xl p-3 sm:rounded-3xl sm:p-4">
          <h2 className="mb-2 text-center text-sm font-bold text-foreground sm:mb-3 sm:text-base">
            {t('howCanIHelp')}
          </h2>

          {/* Start Chatting Button - slimmer on mobile */}
          <div className="mb-3">
            <button
              onClick={handleWrite}
              className="flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold text-accent-foreground bg-accent hover:bg-accent/90 transition-colors sm:py-3">
              <MessageCircle className="h-4 w-4" />
              {t('startChatting')}
            </button>
          </div>

          {/* Allergies - compact horizontal scroll on mobile */}
          <div className="glass rounded-xl p-2 sm:rounded-2xl sm:p-3">
            <AllergySelector selected={selectedAllergies} onToggle={toggleAllergy} />
          </div>

          {/* Quick Ask */}
          <div className="mt-2 sm:mt-3">
            <QuickAsk selected={selectedQuickAsks} onToggle={toggleQuickAsk} />
          </div>

          {/* Search Bar */}
          <div className="mt-2 sm:mt-3">
            <SearchBar selectedAllergies={selectedAllergies} selectedQuickAsks={selectedQuickAsks} />
          </div>
        </div>

        <p className="mt-3 max-w-xs text-center text-[10px] leading-relaxed text-foreground/40 sm:mt-4 sm:text-[11px]">
          {t('disclaimer')}
        </p>
        <p className="mt-2 text-[10px] text-foreground/30 sm:mt-3 sm:text-xs">
          {t('poweredBy')}{' '}
          <a href={CONFIG.BRANDING_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-foreground/50 hover:text-foreground/90 hover:underline transition-colors">
            {CONFIG.BRANDING_NAME}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Index;
