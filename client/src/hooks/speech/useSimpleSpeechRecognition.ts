
import { useState, useEffect, useRef, useCallback } from 'react';
import { correctPersianWords } from "@/utils/persian-word-correction";
import { useBrowserSupport } from './useBrowserSupport';
import { useTextProcessing } from './useTextProcessing';

interface UseSimpleSpeechRecognitionOptions {
  onTranscriptChange: (transcript: string) => void;
  initialValue?: string;
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
  multiLine?: boolean;
}

export const useSimpleSpeechRecognition = ({
  onTranscriptChange,
  initialValue = '',
  lang = 'fa-IR',
  continuous = true,
  interimResults = true,
  maxAlternatives = 3,
  multiLine = false
}: UseSimpleSpeechRecognitionOptions) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(initialValue);
  const [interimTranscript, setInterimTranscript] = useState('');
  
  const recognitionRef = useRef<any>(null);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const finalTranscriptRef = useRef(initialValue);
  const isRestartingRef = useRef(false);

  // Use refactored hooks
  const { isSupported } = useBrowserSupport();
  const { cleanTranscriptText } = useTextProcessing();

  // Enhanced text processing with Persian word correction
  const processTranscriptText = useCallback((text: string) => {
    let cleanedText = cleanTranscriptText(text);
    cleanedText = correctPersianWords(cleanedText);
    return cleanedText;
  }, [cleanTranscriptText]);

  const initializeRecognition = useCallback(() => {
    if (!isSupported) return null;

    const SpeechRecognition = 
      window.SpeechRecognition || 
      (window as any).webkitSpeechRecognition ||
      (window as any).mozSpeechRecognition ||
      (window as any).msSpeechRecognition;
    
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    
    // Browser detection for optimized settings
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isAndroid = /android/i.test(navigator.userAgent);
    const isEdge = /Edge/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isFirefox = /firefox/i.test(navigator.userAgent);
    
    // Base configuration for Persian language
    recognition.lang = lang;
    recognition.interimResults = interimResults;
    recognition.maxAlternatives = maxAlternatives;
    recognition.continuous = continuous;
    
    // Platform-specific optimizations for unlimited recording
    if (isEdge || isFirefox) {
      recognition.continuous = true;
    }
    
    if (isSafari && !isIOS) {
      recognition.interimResults = true;
      recognition.continuous = true;
    }
    
    if (isIOS) {
      recognition.interimResults = true;
      recognition.continuous = false;
    }
    
    if (isAndroid) {
      recognition.maxAlternatives = 5;
      recognition.continuous = true;
    }

    recognition.onstart = () => {
      console.log('Speech recognition started - unlimited mode');
      setIsListening(true);
      isRestartingRef.current = false;
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
      
      if (isListening && !isRestartingRef.current) {
        isRestartingRef.current = true;
        restartTimeoutRef.current = setTimeout(() => {
          if (recognitionRef.current && isListening) {
            try {
              recognitionRef.current.start();
              isRestartingRef.current = false;
            } catch (e) {
              console.log('Auto-restart failed:', e);
              isRestartingRef.current = false;
            }
          }
        }, 100);
      } else if (!isListening) {
        setIsListening(false);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      
      if (event.error === 'no-speech' || event.error === 'audio-capture' || event.error === 'network') {
        if (isListening && !isRestartingRef.current) {
          isRestartingRef.current = true;
          restartTimeoutRef.current = setTimeout(() => {
            if (recognitionRef.current && isListening) {
              try {
                recognitionRef.current.start();
                isRestartingRef.current = false;
              } catch (e) {
                console.log('Error restart failed:', e);
                isRestartingRef.current = false;
              }
            }
          }, 1000);
        }
      }
    };

    recognition.onresult = (event: any) => {
      let interim = "";
      let final = finalTranscriptRef.current;
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        let bestConfidence = 0;
        let bestTranscript = "";
        
        if (isIOS) {
          bestTranscript = event.results[i][0].transcript;
        } else {
          for (let j = 0; j < event.results[i].length; j++) {
            const currentTranscript = event.results[i][j].transcript;
            const confidence = event.results[i][j].confidence || 1;
            
            if (confidence > bestConfidence) {
              bestConfidence = confidence;
              bestTranscript = currentTranscript;
            }
          }
        }
        
        if (event.results[i].isFinal) {
          const processedText = processTranscriptText(bestTranscript);
          final += (final ? " " : "") + processedText;
          
          if (!multiLine) {
            final = final.replace(/\n/g, " ");
          }
          
          finalTranscriptRef.current = final;
        } else {
          interim = processTranscriptText(bestTranscript);
        }
      }

      setTranscript(final);
      onTranscriptChange(final + (interim ? " " + interim : ""));
      setInterimTranscript(interim);
    };

    return recognition;
  }, [isSupported, lang, interimResults, maxAlternatives, continuous, multiLine, onTranscriptChange, isListening, processTranscriptText]);

  const startListening = useCallback(async () => {
    if (!isSupported || isListening) return;

    try {
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }

      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      const recognition = initializeRecognition();
      if (!recognition) throw new Error('Speech recognition not supported');

      recognitionRef.current = recognition;
      
      setInterimTranscript('');
      finalTranscriptRef.current = transcript;
      isRestartingRef.current = false;

      recognition.start();
    } catch (error) {
      console.error('Error starting unlimited speech recognition:', error);
      setIsListening(false);
      throw error;
    }
  }, [isSupported, isListening, initializeRecognition, transcript]);

  const stopListening = useCallback(() => {
    if (!isListening) return;

    setIsListening(false);
    isRestartingRef.current = false;
    
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

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

export default useSimpleSpeechRecognition;
