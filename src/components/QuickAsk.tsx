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
      <h3 className="mb-2 text-center text-[10px] font-bold tracking-widest text-foreground/70 sm:mb-3 sm:text-xs">
        {t('quickAsk')}
      </h3>
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {quickOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => onToggle(opt.key)}
            className={`flex flex-col items-center gap-1 rounded-xl border p-2 transition-all hover:scale-105 sm:gap-2 sm:p-3 ${
              selected.has(opt.key)
                ? 'glass-red-active text-foreground'
                : 'glass-button border-foreground/10'
            }`}
            style={{ borderRadius: '12px' }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10 text-lg sm:h-11 sm:w-11 sm:text-2xl">
              {opt.emoji}
            </span>
            <span className="text-[10px] font-medium leading-tight text-foreground/80 sm:text-xs">{t(opt.key)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickAsk;
