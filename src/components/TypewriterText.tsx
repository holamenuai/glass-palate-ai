import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

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

  return (
    <div className="whitespace-pre-wrap break-words">
      <ReactMarkdown skipHtml unwrapDisallowed>
        {done ? text : displayed}
      </ReactMarkdown>
      {!done && (
        <span className="inline-block w-0.5 h-4 bg-foreground/60 animate-pulse align-text-bottom ml-0.5" />
      )}
    </div>
  );
};

export default TypewriterText;
