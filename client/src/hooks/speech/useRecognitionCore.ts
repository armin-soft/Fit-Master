
import { useState, useRef, useCallback } from 'react';

export const useRecognitionCore = (options: any = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const [recognitionState, setRecognitionState] = useState('idle');
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const restartCountRef = useRef(0);

  const startListening = useCallback(() => {
    console.log('Starting speech recognition...');
    setIsListening(true);
  }, []);

  const stopListening = useCallback(() => {
    console.log('Stopping speech recognition...');
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setConfidence(0);
  }, []);

  const handleRestart = useCallback(() => {
    console.log('Restarting speech recognition...');
    // Restart logic here
  }, []);

  return {
    isListening,
    setIsListening,
    transcript,
    confidence,
    error,
    isInitialized,
    recognitionRef,
    recognitionState,
    setRecognitionState,
    restartTimeoutRef,
    restartCountRef,
    startListening,
    stopListening,
    resetTranscript,
    handleRestart
  };
};
