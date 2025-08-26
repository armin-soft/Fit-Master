
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRecognitionManager } from './useRecognitionManager';
import { useRecognitionHandlers } from './useRecognitionHandlers';
import { useTextProcessing } from './useTextProcessing';

interface UseContinuousSpeechRecognitionOptions {
  onTranscriptChange: (transcript: string) => void;
  initialValue?: string;
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
}

export const useContinuousSpeechRecognition = ({
  onTranscriptChange,
  initialValue = '',
  lang = 'fa-IR',
  continuous = true,
  interimResults = true,
  maxAlternatives = 1
}: UseContinuousSpeechRecognitionOptions) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(initialValue);
  const [interimTranscript, setInterimTranscript] = useState('');
  
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const finalTranscriptRef = useRef(initialValue);
  const isRestartingRef = useRef(false);

  // Use custom hooks
  const { isSupported, recognitionRef, createRecognition } = useRecognitionManager({
    lang,
    continuous,
    interimResults,
    maxAlternatives
  });

  const { cleanTranscriptText } = useTextProcessing();

  const { handleStart, handleResult, handleError, handleEnd } = useRecognitionHandlers({
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
  });

  const initializeRecognition = useCallback(() => {
    const recognition = createRecognition();
    if (!recognition) return null;

    recognition.onstart = handleStart;
    recognition.onresult = handleResult;
    recognition.onerror = handleError;
    recognition.onend = handleEnd;

    return recognition;
  }, [createRecognition, handleStart, handleResult, handleError, handleEnd]);

  const startListening = useCallback(async () => {
    if (!isSupported || isListening) return;

    try {
      // Clear any existing timeouts
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }

      // Stop any existing recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      // Initialize new recognition
      const recognition = initializeRecognition();
      if (!recognition) return;

      recognitionRef.current = recognition;
      
      // Reset transcripts
      setInterimTranscript('');
      finalTranscriptRef.current = transcript;
      isRestartingRef.current = false;

      recognition.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
    }
  }, [isSupported, isListening, initializeRecognition, transcript]);

  const stopListening = useCallback(() => {
    if (!isListening) return;

    setIsListening(false);
    isRestartingRef.current = false;
    
    // Clear restart timeout
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    // Clear interim transcript
    setInterimTranscript('');
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    finalTranscriptRef.current = '';
    onTranscriptChange('');
  }, [onTranscriptChange]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Update transcript when initialValue changes
  useEffect(() => {
    if (initialValue !== transcript && !isListening) {
      setTranscript(initialValue);
      finalTranscriptRef.current = initialValue;
    }
  }, [initialValue, transcript, isListening]);

  return {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  };
};

export default useContinuousSpeechRecognition;
