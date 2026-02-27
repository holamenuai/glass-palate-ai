import { useEffect, useState, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

type Props = {
  onResult: (audioBlob: Blob) => void;
  onClose: () => void;
};

const ListeningOverlay = ({ onResult, onClose }: Props) => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'listening' | 'processing'>('listening');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const stop = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        mediaRecorderRef.current = mediaRecorder;
        chunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = () => {
          stream.getTracks().forEach(track => track.stop());
          if (cancelled) return;
          const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
          if (audioBlob.size > 0) {
            setStatus('processing');
            setTimeout(() => onResult(audioBlob), 400);
          } else {
            onClose();
          }
        };

        mediaRecorder.onerror = () => {
          stream.getTracks().forEach(track => track.stop());
          if (!cancelled) onClose();
        };

        mediaRecorder.start();
      } catch (err) {
        console.error('Microphone access error:', err);
        alert('Could not access microphone. Please allow microphone permissions.');
        if (!cancelled) onClose();
      }
    };

    startRecording();

    return () => {
      cancelled = true;
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
      <button onClick={() => { stop(); onClose(); }} className="absolute top-6 right-6 text-foreground/60 hover:text-foreground">
        <X className="h-8 w-8" />
      </button>

      <p className="mb-8 text-2xl font-bold text-foreground">
        {status === 'listening' ? (t('speak') + '...') : 'Processing...'}
      </p>

      {/* Stop recording button */}
      {status === 'listening' && (
        <button
          onClick={stop}
          className="mb-8 h-20 w-20 rounded-full bg-red-500/80 flex items-center justify-center hover:bg-red-500 transition-colors"
        >
          <div className="h-8 w-8 rounded-sm bg-white" />
        </button>
      )}

      {/* Waveform animation */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 rounded-full"
            style={{
              height: '40px',
              background: `hsl(${(i * 30) % 360}, 70%, 60%)`,
              animation: `waveform 1.2s ease-in-out infinite`,
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </div>

      <p className="mt-10 text-sm text-foreground/50">{t('disclaimer')}</p>

      <style>{`
        @keyframes waveform {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  );
};

export default ListeningOverlay;
