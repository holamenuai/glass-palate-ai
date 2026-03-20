import { useLanguage } from '@/i18n/LanguageContext';

export type QuickAskKey = 'fillingDish' | 'tiramisuToday' | 'pastaPairing';

const quickOptions: { key: QuickAskKey; emoji: string }[] = [
  { key: 'fillingDish', emoji: '💪' },
  { key: 'tiramisuToday', emoji: '🍰' },
  { key: 'pastaPairing', emoji: '🍝' },
];

type Props = {
  selected: Set<QuickAskKey>;
  onToggle: (key: QuickAskKey) => void;
};

const QuickAsk = ({ selected, onToggle }: Props) => {
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
            onClick={() => onToggle(opt.key)}
            className={`flex flex-col items-center gap-2 rounded-xl p-3 transition-all hover:scale-105 ${
              selected.has(opt.key)
                ? 'glass-red-active text-foreground'
                : 'glass-button glass-red-glow'
            }`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 text-2xl">
              {opt.emoji}
            </span>
            <span className="text-xs font-medium text-foreground/80">{t(opt.key)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickAsk;
