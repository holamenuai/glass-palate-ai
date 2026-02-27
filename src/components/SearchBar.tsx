import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { useChat } from '@/contexts/ChatContext';
import type { AllergyKey } from './AllergySelector';
import type { QuickAskKey } from './QuickAsk';

type Props = {
  selectedAllergies: Set<AllergyKey>;
  selectedQuickAsks: Set<QuickAskKey>;
};

const quickAskPhrases: Record<QuickAskKey, { prefix: string; standalone: string }> = {
  veggie: { prefix: 'Show me vegetarian dishes that are also free from:', standalone: 'Show me vegetarian options from the menu.' },
  findMyVibe: { prefix: 'Show me popular dishes that are also free from:', standalone: 'Help me find my vibe.' },
  vegan: { prefix: 'Show me vegan dishes that are also free from:', standalone: 'Show me vegan options from the menu.' },
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
        messages.push(`${quickAskPhrases[qa].prefix} ${allergyList}.`);
      }
    } else if (selectedQuickAsks.size > 0) {
      for (const qa of selectedQuickAsks) {
        messages.push(quickAskPhrases[qa].standalone);
      }
    } else {
      messages.push(`I am allergic to ${allergyList}. Based on the menu, what can I safely eat?`);
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
