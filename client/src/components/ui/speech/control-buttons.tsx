
import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ControlButtonsProps {
  isListening: boolean;
  isSupported: boolean;
  hasContent: boolean;
  onToggleListening: () => void;
  onClearTranscript: () => void;
  compact?: boolean;
}

export const ControlButtons = ({
  isListening,
  isSupported,
  hasContent,
  onToggleListening,
  onClearTranscript,
  compact = false
}: ControlButtonsProps) => {
  return (
    <div className="flex gap-1">
      <Button
        type="button"
        size="icon"
        disabled={!isSupported}
        onClick={onToggleListening}
        className={cn(
          "transition-all",
          isListening 
            ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md" 
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
        aria-label={isListening ? "توقف ضبط صدا" : "شروع ضبط صدا"}
      >
        <AnimatePresence mode="wait">
          {isListening ? (
            <motion.div
              key="stop"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center justify-center"
            >
              <MicOff className="h-4 w-4" />
            </motion.div>
          ) : (
            <motion.div
              key="mic"
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                transition: { duration: 0.2 }
              }}
              exit={{ scale: 0 }}
              className="flex items-center justify-center"
            >
              <Mic className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
      
      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={onClearTranscript}
        disabled={!hasContent}
        aria-label="پاک کردن متن"
        className="hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/20"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
