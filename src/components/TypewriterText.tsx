import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {
  text: string;
  speed?: number;
  onComplete?: () => void;
  markdown?: boolean;
};

const TypewriterText = ({ text, speed = 12, onComplete, markdown = false }: Props) => {
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

  const content = done ? text : displayed;

  if (markdown) {
    return (
      <div className="min-h-[1.5em]">
        <ReactMarkdown>{content}</ReactMarkdown>
        {!done && <span className="inline-block w-0.5 h-4 bg-foreground/60 animate-pulse align-text-bottom ml-0.5" />}
      </div>
    );
  }

  if (done) return <>{text}</>;

  return (
    <>
      {displayed}
      <span className="inline-block w-0.5 h-4 bg-foreground/60 animate-pulse align-text-bottom ml-0.5" />
    </>
  );
};

export default TypewriterText;
