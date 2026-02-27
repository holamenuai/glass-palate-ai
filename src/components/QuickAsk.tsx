import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { useChat } from '@/contexts/ChatContext';

const quickOptions = [
  { key: 'veggie' as const, emoji: '🥕', message: 'Show me vegetarian options from the menu.' },
  { key: 'findMyVibe' as const, emoji: '🍸', message: 'Help me find my vibe.' },
  { key: 'vegan' as const, emoji: '🌿', message: 'Show me vegan options from the menu.' },
];

const QuickAsk = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { resetChat } = useChat();

  const handleClick = (message: string) => {
    resetChat();
    navigate(`/chat?message=${encodeURIComponent(message)}`);
  };

  return (
    <div>
      <h3 className="mb-3 text-center text-xs font-bold tracking-widest text-foreground/80">
        {t('quickAsk')}
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {quickOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => handleClick(opt.message)}
            className="glass-button glass-blue-glow flex flex-col items-center gap-1.5 rounded-xl p-3 transition-all hover:scale-105"
          >
            <span className="text-2xl">{opt.emoji}</span>
            <span className="text-xs font-medium text-foreground/80">{t(opt.key)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickAsk;
