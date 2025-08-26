
import { useState, useEffect, useRef, useCallback } from 'react';

interface UseRecognitionManagerOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
}

export const useRecognitionManager = ({
  lang = 'fa-IR',
  continuous = true,
  interimResults = true,
  maxAlternatives = 1
}: UseRecognitionManagerOptions = {}) => {
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Check browser support
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  const createRecognition = useCallback(() => {
    if (!isSupported) return null;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.lang = lang;
    recognition.maxAlternatives = maxAlternatives;

    // تنظیم برای حداکثر زمان ضبط
    if ('webkitSpeechRecognition' in window) {
      recognition.serviceURI = 'wss://www.google.com/speech-api/full-duplex/v1/up';
    }

    return recognition;
  }, [isSupported, continuous, interimResults, lang, maxAlternatives]);

  return {
    isSupported,
    recognitionRef,
    createRecognition
  };
};
