
import { useCallback } from "react";
import { correctPersianWords } from "@/utils/persian-word-correction";

interface UseRecognitionSetupProps {
  transcript: string;
  onTranscriptChange: (transcript: string) => void;
  setTranscript: (transcript: string) => void;
  setInterimTranscript: (interim: string) => void;
  setIsListening: (isListening: boolean) => void;
  lang: string;
  multiLine?: boolean;
}

export function useRecognitionSetup({
  transcript,
  onTranscriptChange,
  setTranscript,
  setInterimTranscript,
  setIsListening,
  lang,
  multiLine = false,
}: UseRecognitionSetupProps) {
  return useCallback(() => {
    // Check for different speech recognition implementations
    const SpeechRecognition = 
      window.SpeechRecognition || 
      (window as any).webkitSpeechRecognition ||
      (window as any).mozSpeechRecognition ||
      (window as any).msSpeechRecognition;
      
    if (!SpeechRecognition) {
      console.error("SpeechRecognition not supported in this browser");
      return null;
    }

    const recognition = new SpeechRecognition();
    
    // Browser detection for optimized settings
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isAndroid = /android/i.test(navigator.userAgent);
    const isEdge = /Edge/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isFirefox = /firefox/i.test(navigator.userAgent);
    
    // Base configuration for Persian language
    recognition.lang = lang;
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;
    
    // Default for most browsers
    recognition.continuous = true;
    
    // Platform-specific optimizations
    if (isEdge || isFirefox) {
      // Edge and Firefox work better with continuous mode off
      recognition.continuous = false;
    }
    
    if (isSafari) {
      // Safari has issues with interim results in some versions
      if (!isIOS) {
        recognition.interimResults = false;
      }
    }
    
    if (isIOS) {
      // iOS needs special handling
      recognition.interimResults = true; // usually works better with this on
      recognition.continuous = false; // iOS doesn't support continuous mode well
    }
    
    if (isAndroid) {
      // Android-specific settings
      recognition.maxAlternatives = 5; // Android often provides better alternatives
    }

    // Universal event handlers
    recognition.onstart = () => {
      console.log("Speech recognition started");
      setIsListening(true);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      
      // Report detailed error information
      if (event.error === 'network') {
        console.error("Network error occurred during speech recognition");
      } else if (event.error === 'not-allowed') {
        console.error("Microphone access denied");
      } else if (event.error === 'aborted') {
        console.error("Speech recognition aborted");
      } else if (event.error === 'audio-capture') {
        console.error("Audio capture failed");
      } else if (event.error === 'no-speech') {
        console.error("No speech detected");
      } else if (event.error === 'bad-grammar') {
        console.error("Grammar error");
      }
    };

    // Enhanced results processing with better stability
    recognition.onresult = (event: any) => {
      let interim = "";
      let final = transcript;
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        // Find the best recognition with highest confidence
        let bestConfidence = 0;
        let bestTranscript = "";
        
        // On iOS, sometimes the confidence values are unreliable
        if (isIOS) {
          // For iOS, just use the first result
          bestTranscript = event.results[i][0].transcript;
        } else {
          // For other platforms, find result with best confidence
          for (let j = 0; j < event.results[i].length; j++) {
            const currentTranscript = event.results[i][j].transcript;
            const confidence = event.results[i][j].confidence;
            
            if (confidence > bestConfidence) {
              bestConfidence = confidence;
              bestTranscript = currentTranscript;
            }
          }
        }
        
        if (event.results[i].isFinal) {
          const processedText = bestTranscript.trim();
          
          // Add text to the end of the current line
          if (isIOS || isAndroid) {
            // Mobile browsers tend to duplicate text, so replace rather than append
            // if the last recognition time was very recent
            final = (final + " " + processedText).trim();
          } else {
            final += " " + processedText;
          }
          
          // Persian word correction
          final = correctPersianWords(final);
          
          // Clean up extra whitespace
          final = final.replace(/\s+/g, " ")
                     .replace(/\n +/g, "\n")
                     .replace(/\n+/g, "\n")
                     .trim();
                     
          // Handle multi-line formatting
          if (!multiLine) {
            final = final.replace(/\n/g, " ");
          }
        } else {
          interim = bestTranscript;
        }
      }

      // Apply final results
      setTranscript(final.trim());
      onTranscriptChange(final.trim());
      setInterimTranscript(interim);
    };

    return recognition;
  }, [transcript, onTranscriptChange, setTranscript, setInterimTranscript, setIsListening, lang, multiLine]);
}
