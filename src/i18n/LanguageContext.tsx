import { createContext, useContext, useState, ReactNode } from 'react';
import { Language, translations } from './translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const t = (key: keyof typeof translations['en']) => translations[language][key];
  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'}>{children}</div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback for HMR edge cases — return English defaults
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: (key: keyof typeof translations['en']) => translations['en'][key],
      isRTL: false,
    };
  }
  return ctx;
};
