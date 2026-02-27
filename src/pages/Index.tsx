import { Mic, Send } from 'lucide-react';
import restaurantBg from '@/assets/restaurant-bg.jpg';
import { useLanguage } from '@/i18n/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import AllergySelector from '@/components/AllergySelector';
import QuickAsk from '@/components/QuickAsk';
import SearchBar from '@/components/SearchBar';

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-auto">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img src={restaurantBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="flex w-full max-w-md flex-col items-center px-4 py-8">
        {/* Header */}
        <h1 className="font-display text-5xl font-black text-foreground drop-shadow-lg">
          {t('title')}
        </h1>
        <p className="mt-3 max-w-xs text-center text-sm leading-relaxed text-foreground/70">
          {t('subtitle')}
        </p>

        {/* Language */}
        <div className="mt-5">
          <LanguageSwitcher />
        </div>

        {/* Main Card */}
        <div className="glass-strong mt-6 w-full rounded-3xl p-5">
          <h2 className="mb-4 text-center text-lg font-bold text-foreground">
            {t('howCanIHelp')}
          </h2>

          {/* Speak / Write buttons */}
          <div className="mb-5 grid grid-cols-2 gap-3">
            <button className="glass-button-solid flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold">
              <Mic className="h-4 w-4" />
              {t('speak')}
            </button>
            <button className="glass-button flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-foreground">
              <Send className="h-4 w-4" />
              {t('write')}
            </button>
          </div>

          {/* Allergies */}
          <div className="glass rounded-2xl p-4">
            <AllergySelector />
          </div>

          {/* Quick Ask */}
          <div className="mt-4">
            <QuickAsk />
          </div>

          {/* Search */}
          <div className="mt-4">
            <SearchBar />
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-5 max-w-xs text-center text-[11px] leading-relaxed text-foreground/50">
          {t('disclaimer')}
        </p>

        {/* Footer */}
        <p className="mt-4 text-xs text-foreground/40">
          {t('poweredBy')} <span className="font-bold text-foreground/60">HolaMenuAI</span>
        </p>
      </div>
    </div>
  );
};

export default Index;
