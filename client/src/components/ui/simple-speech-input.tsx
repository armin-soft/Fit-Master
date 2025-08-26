import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useContinuousSpeechRecognition } from "@/hooks/speech/useContinuousSpeechRecognition";

interface SimpleSpeechInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SimpleSpeechInput: React.FC<SimpleSpeechInputProps> = ({
  value,
  onChange,
  placeholder = "متن خود را وارد کنید یا از گفتار به نوشتار استفاده کنید",
  className
}) => {
  const [isManualEdit, setIsManualEdit] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useContinuousSpeechRecognition({
    onTranscriptChange: (text) => {
      onChange(text);
      setIsManualEdit(false);
    },
    initialValue: value,
    lang: "fa-IR",
    continuous: true,
    interimResults: true
  });

  const handleToggleListening = async () => {
    if (isListening) {
      stopListening();
    } else {
      setIsManualEdit(false);
      try {
        await startListening();
      } catch (error) {
        console.error("Error starting speech recognition:", error);
      }
    }
  };

  const handleClear = () => {
    resetTranscript();
    onChange("");
    setIsManualEdit(false);
  };

  const handleManualChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setIsManualEdit(true);
  };

  const displayText = isManualEdit ? value : (transcript || interimTranscript || value);

  return (
    <div className={cn("space-y-3", className)} dir="rtl">
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={displayText}
          onChange={handleManualChange}
          placeholder={placeholder}
          autoResize={true}
          className={cn(
            "min-h-[120px] max-h-[400px] text-right pr-3 pl-24",
            isListening && "border-destructive/30 ring-2 ring-destructive/10"
          )}
          dir="rtl"
        />
        
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {isSupported && (
            <Button
              type="button"
              size="sm"
              onClick={handleToggleListening}
              variant={isListening ? "destructive" : "outline"}
              className={cn(
                "h-8 w-8 p-0",
                isListening && "animate-pulse bg-destructive hover:bg-destructive/90"
              )}
              title={isListening ? "توقف ضبط" : "شروع ضبط"}
            >
              <AnimatePresence mode="wait">
                {isListening ? (
                  <motion.div
                    key="mic-off"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <MicOff className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="mic"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Mic className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          )}
          
          {displayText && (
            <Button
              type="button"
              size="sm"
              onClick={handleClear}
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
              title="پاک کردن متن"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {isListening && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 dark:bg-destructive/20 p-3 rounded-lg border border-destructive/20 dark:border-destructive/30"
        >
          <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
          <span className="font-medium">در حال ضبط صدا...</span>
          <span className="text-xs text-muted-foreground">
            (می‌توانید مکث کنید، ضبط ادامه دارد)
          </span>
        </motion.div>
      )}
      
      {interimTranscript && !isManualEdit && (
        <div className="text-xs text-gray-500 text-right bg-gray-50 dark:bg-gray-900 p-2 rounded border">
          <span className="opacity-60">در حال تایپ: </span>
          <span className="italic">{interimTranscript}</span>
        </div>
      )}
    </div>
  );
};

export default SimpleSpeechInput;
