
import { useEffect } from 'react';
import { UseRecognitionEventHandlersProps, RecognitionEvent } from './speech-recognition-types';
import { MutableRefObject } from 'react';

export const useRecognitionEventHandlers = ({
  recognition,
  state,
  setState,
  onTextRecognized,
  onError,
  onRestart,
  restartTimeoutRef,
  maxRestarts = 5,
  restartCountRef,
}: UseRecognitionEventHandlersProps) => {
  useEffect(() => {
    if (!recognition) return;

    const handleStart = () => {
      setState({ ...state, isRecording: true, error: '' });
    };

    const handleEnd = () => {
      // Reset restartCount if we've been recording for a while
      if (state.isRecording && Date.now() - state.startTime > 10000) {
        if (restartCountRef && typeof restartCountRef === 'object' && 'current' in restartCountRef) {
          // Use mutable ref to update the value
          (restartCountRef as MutableRefObject<number>).current = 0;
        }
      }

      setState({ ...state, isRecording: false });

      if (state.autoRestart && !state.isStopped) {
        // Avoid memory leaks by clearing any existing timeout
        if (restartTimeoutRef.current) {
          window.clearTimeout(restartTimeoutRef.current);
        }

        // Only restart if we haven't exceeded maxRestarts
        const currentRestartCount = restartCountRef && typeof restartCountRef === 'object' && 'current' in restartCountRef 
          ? (restartCountRef as MutableRefObject<number>).current
          : 0;
          
        if (currentRestartCount < maxRestarts) {
          const timeoutId = window.setTimeout(() => {
            if (onRestart) onRestart();
          }, 300);
          
          // Safely increment restart count
          if (restartCountRef && typeof restartCountRef === 'object' && 'current' in restartCountRef) {
            (restartCountRef as MutableRefObject<number>).current += 1;
          }
          
          // Update timeout ref if possible
          if (restartTimeoutRef && typeof restartTimeoutRef === 'object' && 'current' in restartTimeoutRef) {
            (restartTimeoutRef as MutableRefObject<number | null>).current = timeoutId;
          }
        } else {
          setState({
            ...state,
            error: 'تعداد تلاش‌های مجدد به حداکثر رسید. لطفاً مجدد تلاش کنید.',
            isStopped: true,
          });
          if (onError) onError('تعداد تلاش‌های مجدد به حداکثر رسید. لطفاً مجدد تلاش کنید.');
        }
      }
    };

    const handleResult = (event: RecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = state.transcript || '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        let transcriptText = result[0].transcript;

        if (result.isFinal) {
          finalTranscript += transcriptText;
          // Call callback with recognized text
          if (onTextRecognized) onTextRecognized(transcriptText);
        } else {
          interimTranscript += transcriptText;
        }
      }

      setState({
        ...state,
        transcript: finalTranscript,
        interimTranscript,
      });
    };

    const handleError = (event: RecognitionEvent) => {
      const errorMessage = event.error || 'خطای نامشخص در تشخیص گفتار';
      setState({
        ...state,
        error: errorMessage,
        isRecording: false,
        isStopped: true,
      });
      if (onError) onError(errorMessage);
    };

    recognition.onstart = handleStart;
    recognition.onend = handleEnd;
    recognition.onresult = handleResult;
    recognition.onerror = handleError;
    
    return () => {
      recognition.onstart = null;
      recognition.onend = null;
      recognition.onresult = null;
      recognition.onerror = null;
    };
  }, [recognition, state, setState, onTextRecognized, onError, onRestart, maxRestarts, restartTimeoutRef, restartCountRef]);
  
  // Add a cleanup utility function
  const cleanupRestartTimers = () => {
    if (restartTimeoutRef.current) {
      window.clearTimeout(restartTimeoutRef.current);
      if (restartTimeoutRef && typeof restartTimeoutRef === 'object' && 'current' in restartTimeoutRef) {
        (restartTimeoutRef as MutableRefObject<number | null>).current = null;
      }
    }
  };
  
  return { cleanupRestartTimers };
};
