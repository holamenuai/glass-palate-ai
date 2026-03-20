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

  return (
    <div>
      <h3 className="mb-3 text-center text-xs font-bold tracking-widest text-foreground/80">
        {t('selectAllergies')}
      </h3>
      <div className="grid grid-cols-5 gap-1.5">
        {allergyKeys.map((key) => (
          <button
            key={key}
            onClick={() => onToggle(key)}
            className={`flex flex-col items-center gap-0.5 rounded-xl p-1.5 text-center transition-all ${
              selected.has(key)
                ? 'glass-red-active text-foreground'
                : 'glass-button'
            }`}
          >
            <span className="text-lg">{allergyEmojis[key]}</span>
            <span className="text-[9px] font-medium leading-tight text-foreground/80">
              {t(key)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllergySelector;
