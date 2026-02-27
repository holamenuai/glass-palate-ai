import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

type AllergyKey = 'gluten' | 'crustaceans' | 'eggs' | 'fish' | 'peanuts' | 'soy' | 'dairy' | 'nuts' | 'celery' | 'mustard' | 'sesame' | 'sulphites' | 'lupin' | 'molluscs';

const allergyEmojis: Record<AllergyKey, string> = {
  gluten: '🌾', crustaceans: '🦐', eggs: '🥚', fish: '🐟', peanuts: '🥜',
  soy: '🌱', dairy: '🥛', nuts: '🌰', celery: '🥬', mustard: '🟡',
  sesame: '🫘', sulphites: '🍷', lupin: '💜', molluscs: '🦑',
};

const allergyKeys: AllergyKey[] = Object.keys(allergyEmojis) as AllergyKey[];

const AllergySelector = () => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Set<AllergyKey>>(new Set());

  const toggle = (key: AllergyKey) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <div>
      <h3 className="mb-3 text-center text-xs font-bold tracking-widest text-foreground/80">
        {t('selectAllergies')}
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {allergyKeys.map((key) => (
          <button
            key={key}
            onClick={() => toggle(key)}
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
