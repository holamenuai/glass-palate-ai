import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { languageNames, Language } from '@/i18n/translations';

type Props = {
  compact?: boolean;
};

const LanguageSwitcher = ({ compact }: Props) => {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`glass-button flex items-center gap-1.5 rounded-full font-medium text-foreground ${
          compact ? 'px-3 py-1.5 text-xs' : 'px-5 py-2.5 text-sm gap-2'
        }`}
      >
        <Globe className={compact ? 'h-3 w-3' : 'h-4 w-4'} />
        {compact ? languageNames[language].slice(0, 3).toUpperCase() : t('language')}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="glass-strong absolute right-0 z-50 mt-2 w-44 rounded-2xl p-2">
            {(Object.keys(languageNames) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => { setLanguage(lang); setOpen(false); }}
                className={`w-full rounded-xl px-4 py-2 text-left text-sm transition-colors ${
                  language === lang
                    ? 'bg-foreground/20 font-semibold text-foreground'
                    : 'text-foreground/70 hover:bg-foreground/10 hover:text-foreground'
                }`}
              >
                {languageNames[lang]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
