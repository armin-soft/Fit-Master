
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSimpleSpeechRecognition } from "@/hooks/speech/useSimpleSpeechRecognition";
import { useBrowserSupport } from "@/hooks/speech/useBrowserSupport";
import { useMicrophonePermission } from "@/hooks/speech/useMicrophonePermission";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import SpeechPopover from "./SpeechPopover";
import WavesVisualizer from "./WavesVisualizer";

export interface AdvancedSpeechInputProps {
  onTranscriptChange: (transcript: string) => void;
  value?: string;
  placeholder?: string;
  className?: string;
}

export function AdvancedSpeechInput({ 
  onTranscriptChange, 
  value = "", 
  placeholder = "برای شروع ضبط صدا، روی میکروفون کلیک کنید",
  className 
}: AdvancedSpeechInputProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  
  const browserSupport = useBrowserSupport();
  const microphonePermission = useMicrophonePermission();
  
  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useSimpleSpeechRecognition({
    onTranscriptChange,
    initialValue: value,
    lang: "fa-IR"
  });

  const handleToggle = async () => {
    if (isListening) {
      stopListening();
      setIsPopoverOpen(false);
    } else {
      try {
        await startListening();
        setIsPopoverOpen(true);
      } catch (error) {
        console.error("Error starting speech recognition:", error);
      }
    }
  };

  const handleClear = () => {
    resetTranscript();
  };

  // Close popover when listening stops
  useEffect(() => {
    if (!isListening) {
      setIsPopoverOpen(false);
    }
  }, [isListening]);

  return (
    <div className={cn("relative", className)} dir="rtl">
      <div className="flex items-center gap-2">
        <div className="flex-1 p-3 border rounded-lg bg-background min-h-[44px] flex items-center text-right">
          <span className={cn(
            "text-sm",
            transcript || interimTranscript ? "text-foreground" : "text-muted-foreground"
          )}>
            {transcript || interimTranscript || placeholder}
          </span>
        </div>
        
        <SpeechPopover 
          show={isPopoverOpen}
          isListening={isListening}
        />
        
        <Button
          type="button"
          variant={isListening ? "destructive" : "default"}
          size="icon"
          onClick={handleToggle}
          disabled={!isSupported}
          className="h-11 w-11"
        >
          <AnimatePresence mode="wait">
            {isListening ? (
              <motion.div
                key="mic-off"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <MicOff className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="mic"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Mic className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
        
        {(transcript || interimTranscript) && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="h-11 w-11"
          >
            <VolumeX className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      {isListening && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="mt-2 flex justify-center"
        >
          <WavesVisualizer isActive={isListening} />
        </motion.div>
      )}
    </div>
  );
}
