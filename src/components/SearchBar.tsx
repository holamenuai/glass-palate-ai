import { Search } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const SearchBar = () => {
  const { t } = useLanguage();

  return (
    <button className="glass-button flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm text-foreground/60 transition-all hover:text-foreground">
      <Search className="h-4 w-4" />
      {t('findSafeDishes')}
    </button>
  );
};

export default SearchBar;
