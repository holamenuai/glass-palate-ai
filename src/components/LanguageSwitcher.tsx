import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { languageNames, Language } from '@/i18n/translations';

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="glass-button flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground"
      >
        <Globe className="h-4 w-4" />
        {t('language')}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="glass-strong absolute left-1/2 z-50 mt-2 w-48 -translate-x-1/2 rounded-2xl p-2">
            {(Object.keys(languageNames) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => { setLanguage(lang); setOpen(false); }}
                className={`w-full rounded-xl px-4 py-2.5 text-left text-sm transition-colors ${
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
