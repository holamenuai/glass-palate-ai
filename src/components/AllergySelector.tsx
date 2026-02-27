import { useLanguage } from '@/i18n/LanguageContext';

type AllergyKey = 'gluten' | 'crustaceans' | 'eggs' | 'fish' | 'peanuts' | 'soy' | 'dairy' | 'nuts' | 'celery' | 'mustard' | 'sesame' | 'sulphites' | 'lupin' | 'molluscs';

const allergyEmojis: Record<AllergyKey, string> = {
  gluten: '🌾', crustaceans: '🦐', eggs: '🥚', fish: '🐟', peanuts: '🥜',
  soy: '🌱', dairy: '🥛', nuts: '🌰', celery: '🥬', mustard: '🟡',
  sesame: '🫘', sulphites: '🍷', lupin: '💜', molluscs: '🦑',
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
      <div className="grid grid-cols-5 gap-2">
        {allergyKeys.map((key) => (
          <button
            key={key}
            onClick={() => onToggle(key)}
            className={`flex flex-col items-center gap-1 rounded-xl p-2 text-center transition-all ${
              selected.has(key)
                ? 'glass-strong ring-2 ring-foreground/40'
                : 'glass-button'
            }`}
          >
            <span className="text-xl">{allergyEmojis[key]}</span>
            <span className="text-[10px] font-medium leading-tight text-foreground/80">
              {t(key)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllergySelector;
