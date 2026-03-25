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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-auto">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img src={CONFIG.BACKGROUND_IMAGE} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="flex w-[90%] max-w-[450px] flex-col items-center py-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center">
          <h1 className="font-display text-6xl font-bold drop-shadow-lg leading-none text-destructive">
            Vladimir
          </h1>
          <p className="font-heading mt-1 text-lg font-semibold tracking-[0.35em] uppercase text-destructive">
            kitchen
          </p>
          <p className="mt-2 text-center text-xs font-medium text-foreground/50 tracking-wide">
            Your AI Dining Concierge · Plant-Based Experts
          </p>
        </div>

        <div className="mt-4">
          <LanguageSwitcher />
        </div>

        <div className="glass-strong mt-4 w-full rounded-3xl p-4">
          <h2 className="mb-3 text-center text-base font-bold text-foreground">
            {t('howCanIHelp')}
          </h2>

          <div className="mb-4">
            <button
              onClick={handleWrite}
              className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-accent-foreground bg-accent hover:bg-accent/90 transition-colors">
              
              <MessageCircle className="h-4 w-4" />
              {t('startChatting')}
            </button>
          </div>

          <div className="glass rounded-2xl p-3">
            <AllergySelector selected={selectedAllergies} onToggle={toggleAllergy} />
          </div>

          <div className="mt-3">
            <QuickAsk
              selected={selectedQuickAsks}
              onToggle={toggleQuickAsk} />
            
          </div>

          <div className="mt-3">
            <SearchBar selectedAllergies={selectedAllergies} selectedQuickAsks={selectedQuickAsks} />
          </div>
        </div>

        <p className="mt-4 max-w-xs text-center text-[11px] leading-relaxed text-foreground/50">
          {t('disclaimer')}
        </p>
        <p className="mt-3 text-xs text-foreground/40">
          {t('poweredBy')}{' '}
          <a href={CONFIG.BRANDING_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-foreground/60 hover:text-foreground/90 hover:underline transition-colors">
            {CONFIG.BRANDING_NAME}
          </a>
        </p>
      </div>

    </div>);

};

export default Index;