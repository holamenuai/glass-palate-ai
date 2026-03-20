import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Send } from 'lucide-react';
import { CONFIG } from '@/config';
import { useLanguage } from '@/i18n/LanguageContext';
import { useChat } from '@/contexts/ChatContext';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import AllergySelector, { type AllergyKey } from '@/components/AllergySelector';
import QuickAsk, { type QuickAskKey } from '@/components/QuickAsk';
import SearchBar from '@/components/SearchBar';
import ListeningOverlay from '@/components/ListeningOverlay';

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { resetChat, sendAudio } = useChat();
  const [selectedAllergies, setSelectedAllergies] = useState<Set<AllergyKey>>(new Set());
  const [selectedQuickAsks, setSelectedQuickAsks] = useState<Set<QuickAskKey>>(new Set());
  const [showListening, setShowListening] = useState(false);

  const toggleAllergy = (key: AllergyKey) => {
    setSelectedAllergies((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const handleVoiceResult = (audioBlob: Blob) => {
    setShowListening(false);
    resetChat();
    sendAudio(audioBlob);
    navigate('/chat');
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
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="flex w-[90%] max-w-[450px] flex-col items-center py-6">
        <h1 className="font-display text-5xl font-black text-foreground drop-shadow-lg">
          {CONFIG.RESTAURANT_NAME}
        </h1>
        <p className="mt-2 max-w-xs text-center text-sm font-medium tracking-wide text-foreground/60">
          Your AI Pasta Sommelier
        </p>

        <div className="mt-4">
          <LanguageSwitcher />
        </div>

        <div className="glass-strong mt-4 w-full rounded-3xl p-4">
          <h2 className="mb-3 text-center text-base font-bold text-foreground">
            {t('howCanIHelp')}
          </h2>

          <div className="mb-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowListening(true)}
              className="flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold text-accent-foreground bg-accent hover:bg-accent/90 transition-colors"
            >
              <Mic className="h-4 w-4" />
              {t('speak')}
            </button>
            <button
              onClick={handleWrite}
              className="glass-button flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold text-foreground"
            >
              <Send className="h-4 w-4" />
              {t('write')}
            </button>
          </div>

          <div className="glass rounded-2xl p-3">
            <AllergySelector selected={selectedAllergies} onToggle={toggleAllergy} />
          </div>

          <div className="mt-3">
            <QuickAsk
              selected={selectedQuickAsks}
              onToggle={(key) => {
                setSelectedQuickAsks((prev) => {
                  const next = new Set(prev);
                  next.has(key) ? next.delete(key) : next.add(key);
                  return next;
                });
              }}
            />
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

      {showListening && (
        <ListeningOverlay
          onResult={handleVoiceResult}
          onClose={() => setShowListening(false)}
        />
      )}
    </div>
  );
};

export default Index;
