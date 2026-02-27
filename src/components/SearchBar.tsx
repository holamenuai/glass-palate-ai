import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { useChat } from '@/contexts/ChatContext';
import type { AllergyKey } from './AllergySelector';
import type { QuickAskKey } from './QuickAsk';
import type { translations } from '@/i18n/translations';

type TKey = keyof typeof translations['en'];

type Props = {
  selectedAllergies: Set<AllergyKey>;
  selectedQuickAsks: Set<QuickAskKey>;
};

const quickAskTranslationKeys: Record<QuickAskKey, { prefix: TKey; standalone: TKey }> = {
  veggie: { prefix: 'queryVeggiePrefix', standalone: 'queryVeggieStandalone' },
  findMyVibe: { prefix: 'queryVibePrefix', standalone: 'queryVibeStandalone' },
  vegan: { prefix: 'queryVeganPrefix', standalone: 'queryVeganStandalone' },
};

const SearchBar = ({ selectedAllergies, selectedQuickAsks }: Props) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { resetChat } = useChat();

  const hasSelection = selectedAllergies.size > 0 || selectedQuickAsks.size > 0;

  const handleClick = () => {
    if (!hasSelection) return;

    const allergyList = Array.from(selectedAllergies).map((key) => t(key)).join(', ');
    const messages: string[] = [];

    if (selectedQuickAsks.size > 0 && selectedAllergies.size > 0) {
      for (const qa of selectedQuickAsks) {
        messages.push(`${t(quickAskTranslationKeys[qa].prefix)} ${allergyList}.`);
      }
    } else if (selectedQuickAsks.size > 0) {
      for (const qa of selectedQuickAsks) {
        messages.push(t(quickAskTranslationKeys[qa].standalone));
      }
    } else {
      messages.push(t('queryAllergyOnly').replace('{allergies}', allergyList));
    }

    const message = messages.join(' ');
    resetChat();
    navigate(`/chat?message=${encodeURIComponent(message)}`);
  };

  const count = selectedAllergies.size + selectedQuickAsks.size;

  return (
    <button
      onClick={handleClick}
      disabled={!hasSelection}
      className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm transition-all ${
        hasSelection
        ? 'glass-button-solid glass-blue-glow'
        : 'glass-button text-foreground/40 cursor-not-allowed'
      }`}
    >
      <Search className="h-4 w-4" />
      {t('findSafeDishes')} {count > 0 && `(${count})`}
    </button>
  );
};

export default SearchBar;
