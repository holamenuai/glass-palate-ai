import { useEffect, useState } from 'react';

type Props = {
  text: string;
  speed?: number;
  onComplete?: () => void;
};

const TypewriterText = ({ text, speed = 12, onComplete }: Props) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;

    const tick = () => {
      if (i < text.length) {
        // Advance by 1-3 chars for natural pacing
        const chunk = text.charAt(i);
        i++;
        setDisplayed(text.slice(0, i));
        requestAnimationFrame(() => setTimeout(tick, speed));
      } else {
        setDone(true);
        onComplete?.();
      }
    };

    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [text, speed, onComplete]);

  if (done) return <>{text}</>;

  return (
    <>
      {displayed}
      <span className="inline-block w-0.5 h-4 bg-foreground/60 animate-pulse align-text-bottom ml-0.5" />
    </>
  );
};

export default TypewriterText;
