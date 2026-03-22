import { useLanguage } from '@/i18n/LanguageContext';

type AllergyKey = 'gluten' | 'treeNuts' | 'garlicOnions' | 'soy' | 'sesame';

const allergyEmojis: Record<AllergyKey, string> = {
  gluten: '🌾',
  treeNuts: '🌰',
  garlicOnions: '🧄',
  soy: '🌱',
  sesame: '🫘',
};

const allergyKeys: AllergyKey[] = Object.keys(allergyEmojis) as AllergyKey[];

export type { AllergyKey };
export { allergyKeys };

type Props = {
  selected: Set<AllergyKey>;
  onToggle: (key: AllergyKey) => void;
};

const AllergySelector = ({ selected = new Set(), onToggle }: Props) => {
  const { t } = useLanguage();
  const maxReached = selected.size >= 2;

  return (
    <div>
      <h3 className="mb-2 text-center text-[10px] font-bold tracking-widest text-foreground/70 sm:mb-3 sm:text-xs">
        {t('selectAllergies')}
      </h3>
      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 sm:grid sm:grid-cols-5 sm:gap-1.5 sm:overflow-visible sm:pb-0 scrollbar-hide">
        {allergyKeys.map((key) => {
          const isSelected = selected.has(key);
          const isDisabled = !isSelected && maxReached;
          return (
            <button
              key={key}
              onClick={() => onToggle(key)}
              disabled={isDisabled}
              className={`flex flex-shrink-0 flex-col items-center gap-0.5 rounded-full p-1.5 text-center transition-all sm:gap-1 sm:p-2 ${
                isSelected
                  ? 'glass-red-active text-foreground'
                  : isDisabled
                    ? 'glass-button opacity-35 cursor-not-allowed'
                    : 'glass-button'
              }`}
            >
              <span className="text-base sm:text-lg">{allergyEmojis[key]}</span>
              <span className="whitespace-nowrap text-[8px] font-medium leading-tight text-foreground/80 sm:text-[9px]">
                {t(key)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AllergySelector;
