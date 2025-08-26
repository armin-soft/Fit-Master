
import { useCallback, useRef, MutableRefObject } from 'react';
import { RecognitionState } from './speech-recognition-types';

interface UseRecognitionRestartProps {
  recognition: any;
  state: RecognitionState;
  setState: (state: RecognitionState) => void;
}

export const useRecognitionRestart = ({
  recognition,
  state,
  setState,
}: UseRecognitionRestartProps) => {
  const restartTimeoutRef = useRef<number | null>(null);
  const restartCountRef = useRef<number>(0);

  const handleRestart = useCallback(() => {
    if (!recognition || state.isStopped) return;

    try {
      recognition.start();
      setState({
        ...state,
        isRecording: true,
        startTime: Date.now(),
      });
      
      // Safely clear timeout reference
      if (restartTimeoutRef.current) {
        window.clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
    } catch (error) {
      console.error('Error restarting recognition:', error);
      setState({
        ...state,
        error: 'خطا در شروع مجدد تشخیص گفتار',
        isRecording: false,
        isStopped: true,
      });
    }
  }, [recognition, state, setState]);

  return {
    handleRestart,
    restartTimeoutRef,
    restartCountRef,
  };
};
