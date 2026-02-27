import { useLanguage } from '@/i18n/LanguageContext';

const quickOptions = [
  { key: 'veggie' as const, emoji: '🥕' },
  { key: 'findMyVibe' as const, emoji: '🍸' },
  { key: 'vegan' as const, emoji: '🌿' },
];

const QuickAsk = () => {
  const { t } = useLanguage();

  return (
    <div>
      <h3 className="mb-3 text-center text-xs font-bold tracking-widest text-foreground/80">
        {t('quickAsk')}
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {quickOptions.map((opt) => (
          <button
            key={opt.key}
            className="glass-button flex flex-col items-center gap-1.5 rounded-xl p-3 transition-all hover:scale-105"
          >
            <span className="text-2xl">{opt.emoji}</span>
            <span className="text-xs font-medium text-foreground/80">{t(opt.key)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickAsk;
