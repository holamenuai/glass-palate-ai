import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { useChat } from '@/contexts/ChatContext';
import type { AllergyKey } from './AllergySelector';

type Props = {
  selectedAllergies: Set<AllergyKey>;
};

const SearchBar = ({ selectedAllergies }: Props) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { resetChat } = useChat();

  const handleClick = () => {
    if (selectedAllergies.size === 0) return;

    const allergyList = Array.from(selectedAllergies)
      .map((key) => t(key))
      .join(', ');

    const message = `I am allergic to ${allergyList}. Based on the menu, what can I safely eat?`;
    resetChat();
    navigate(`/chat?message=${encodeURIComponent(message)}`);
  };

  return (
    <button
      onClick={handleClick}
      disabled={selectedAllergies.size === 0}
      className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm transition-all ${
        selectedAllergies.size > 0
        ? 'glass-button-solid glass-blue-glow'
        : 'glass-button text-foreground/40 cursor-not-allowed'
      }`}
    >
      <Search className="h-4 w-4" />
      {t('findSafeDishes')} {selectedAllergies.size > 0 && `(${selectedAllergies.size})`}
    </button>
  );
};

export default SearchBar;
