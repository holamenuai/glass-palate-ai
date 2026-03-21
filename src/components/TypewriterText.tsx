import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {
  text: string;
  speed?: number;
  bufferMs?: number;
  onComplete?: () => void;
  markdown?: boolean;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const hasUnclosedMarkdown = (value: string) => {
  const cleaned = value.replace(/\\./g, '').replace(/```[\s\S]*?```/g, '');

  const strongAsteriskCount = (cleaned.match(/\*\*/g) || []).length;
  const strongUnderscoreCount = (cleaned.match(/__/g) || []).length;
  const singleAsteriskCount = (cleaned.replace(/\*\*/g, '').match(/\*/g) || []).length;
  const singleUnderscoreCount = (cleaned.replace(/__/g, '').match(/_/g) || []).length;
  const backtickCount = (cleaned.match(/`/g) || []).length;

  return (
    strongAsteriskCount % 2 !== 0 ||
    strongUnderscoreCount % 2 !== 0 ||
    singleAsteriskCount % 2 !== 0 ||
    singleUnderscoreCount % 2 !== 0 ||
    backtickCount % 2 !== 0
  );
};

const hideDanglingMarkdown = (value: string) => {
  let next = value;

  if (/\[[^\]]*\]\([^\)]*$/.test(next)) {
    next = next.replace(/\[[^\]]*\]\([^\)]*$/, '');
  }

  while (/(?:\*\*|__|~~|`{1,3}|[*_~`])$/.test(next)) {
    next = next.replace(/(?:\*\*|__|~~|`{1,3}|[*_~`])$/, '');
  }

  return next;
};

const nextChunkIndex = (source: string, from: number, chunkSize: number, markdown: boolean) => {
  const minTarget = Math.min(source.length, from + chunkSize);
  if (!markdown) return minTarget;

  const maxTarget = Math.min(source.length, from + chunkSize + 80);
  for (let i = minTarget; i <= maxTarget; i++) {
    const candidate = source.slice(0, i);
    if (!hasUnclosedMarkdown(candidate) && !/[`*_~]$/.test(candidate)) {
      return i;
    }
  }

  return minTarget;
};

const TypewriterText = ({ text, speed = 12, bufferMs, onComplete, markdown = false }: Props) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const renderDelay = clamp(bufferMs ?? speed * 16, 150, 300);
    const chunkSize = Math.max(3, Math.round(renderDelay / 45));

    setDisplayed('');
    setDone(false);
    setIsVisible(true);

    let cancelled = false;
    let i = 0;

    const tick = () => {
      if (cancelled) return;

      if (i >= text.length) {
        setDone(true);
        onCompleteRef.current?.();
        return;
      }

      const nextIndex = nextChunkIndex(text, i, chunkSize, markdown);
      const rawChunk = text.slice(0, nextIndex);
      const safeChunk = markdown && hasUnclosedMarkdown(rawChunk) ? hideDanglingMarkdown(rawChunk) : rawChunk;

      setIsVisible(false);
      setDisplayed(safeChunk);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        if (!cancelled) setIsVisible(true);
      });

      i = nextIndex;
      timerRef.current = setTimeout(tick, renderDelay);
    };

    timerRef.current = setTimeout(tick, renderDelay);

    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, speed, bufferMs, markdown]);

  const content = done ? text : displayed;

  if (markdown) {
    return (
      <div
        className="min-h-[1.5em] whitespace-pre-wrap break-words transition-opacity duration-200 ease-out"
        style={{ opacity: isVisible ? 1 : 0.92 }}
      >
        <ReactMarkdown className="whitespace-pre-wrap break-words">{content}</ReactMarkdown>
        {!done && <span className="inline-block w-0.5 h-4 bg-foreground/60 animate-pulse align-text-bottom ml-0.5" />}
      </div>
    );
  }

  if (done) return <span className="whitespace-pre-wrap break-words">{text}</span>;

  return (
    <span
      className="whitespace-pre-wrap break-words transition-opacity duration-200 ease-out"
      style={{ opacity: isVisible ? 1 : 0.92 }}
    >
      {displayed}
      <span className="inline-block w-0.5 h-4 bg-foreground/60 animate-pulse align-text-bottom ml-0.5" />
    </span>
  );
};

export default TypewriterText;
