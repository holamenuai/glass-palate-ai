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
      <h3 className="mb-3 text-center text-xs font-bold tracking-widest text-foreground/80">
        {t('selectAllergies')}
      </h3>
      <div className="grid grid-cols-5 gap-1.5">
        {allergyKeys.map((key) => {
          const isSelected = selected.has(key);
          const isDisabled = !isSelected && maxReached;
          return (
            <button
              key={key}
              onClick={() => onToggle(key)}
              disabled={isDisabled}
              className={`flex flex-col items-center gap-1 rounded-full p-2 text-center transition-all ${
                isSelected
                  ? 'glass-red-active text-foreground'
                  : isDisabled
                    ? 'glass-button opacity-35 cursor-not-allowed'
                    : 'glass-button'
              }`}
            >
              <span className="text-lg">{allergyEmojis[key]}</span>
              <span className="text-[9px] font-medium leading-tight text-foreground/80">
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
