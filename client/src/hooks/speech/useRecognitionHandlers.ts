
import { useCallback, useRef } from 'react';

interface UseRecognitionHandlersOptions {
  onTranscriptChange: (transcript: string) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  setTranscript: (transcript: string) => void;
  setInterimTranscript: (transcript: string) => void;
  finalTranscriptRef: React.MutableRefObject<string>;
  isRestartingRef: React.MutableRefObject<boolean>;
  restartTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
  cleanTranscriptText: (text: string) => string;
  recognitionRef: React.MutableRefObject<any>;
}

export const useRecognitionHandlers = ({
  onTranscriptChange,
  isListening,
  setIsListening,
  setTranscript,
  setInterimTranscript,
  finalTranscriptRef,
  isRestartingRef,
  restartTimeoutRef,
  cleanTranscriptText,
  recognitionRef
}: UseRecognitionHandlersOptions) => {
  
  const handleStart = useCallback(() => {
    console.log('Speech recognition started');
    setIsListening(true);
    isRestartingRef.current = false;
  }, [setIsListening, isRestartingRef]);

  const handleResult = useCallback((event: any) => {
    let interimText = '';
    let finalText = finalTranscriptRef.current;

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      let transcriptText = result[0].transcript;

      if (result.isFinal) {
        // Clean the transcript text and remove ALL periods
        transcriptText = cleanTranscriptText(transcriptText);
        // اضافه کردن متن نهایی بدون محدودیت
        finalText += (finalText ? ' ' : '') + transcriptText;
        finalTranscriptRef.current = finalText;
      } else {
        // Clean interim text as well
        interimText += cleanTranscriptText(transcriptText);
      }
    }

    setTranscript(finalText);
    setInterimTranscript(interimText);
    // ارسال کل متن بدون محدودیت کاراکتر
    onTranscriptChange(finalText + (interimText ? ' ' + interimText : ''));
  }, [onTranscriptChange, setTranscript, setInterimTranscript, finalTranscriptRef, cleanTranscriptText]);

  const handleError = useCallback((event: any) => {
    console.error('Speech recognition error:', event.error);
    
    // در صورت خطا، تلاش برای شروع مجدد اگر کاربر هنوز گوش می‌دهد
    if (event.error === 'no-speech' || event.error === 'audio-capture' || event.error === 'network') {
      if (isListening && !isRestartingRef.current) {
        isRestartingRef.current = true;
        restartTimeoutRef.current = setTimeout(() => {
          if (recognitionRef.current && isListening && !isRestartingRef.current) {
            try {
              recognitionRef.current.start();
            } catch (e) {
              console.log('Failed to restart recognition:', e);
              isRestartingRef.current = false;
            }
          }
        }, 1000);
      }
    }
  }, [isListening, isRestartingRef, restartTimeoutRef, recognitionRef]);

  const handleEnd = useCallback(() => {
    console.log('Speech recognition ended');
    
    // اگر کاربر هنوز در حالت گوش دادن است و restart نمی‌شود، دوباره شروع کن
    if (isListening && !isRestartingRef.current) {
      isRestartingRef.current = true;
      restartTimeoutRef.current = setTimeout(() => {
        if (recognitionRef.current && isListening) {
          try {
            recognitionRef.current.start();
            isRestartingRef.current = false;
          } catch (e) {
            console.log('Recognition already started or not available');
            isRestartingRef.current = false;
          }
        }
      }, 100);
    } else if (!isListening) {
      setIsListening(false);
    }
  }, [isListening, isRestartingRef, restartTimeoutRef, recognitionRef, setIsListening]);

  return {
    handleStart,
    handleResult,
    handleError,
    handleEnd
  };
};
