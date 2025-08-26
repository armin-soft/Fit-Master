import React, { KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Mic, MicOff, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { useContinuousSpeechRecognition } from "@/hooks/speech/useContinuousSpeechRecognition";

interface QuickSpeechAddProps {
  quickSpeechText: string;
  setQuickSpeechText: (value: string) => void;
  onQuickAdd: () => void;
}

const QuickSpeechAdd: React.FC<QuickSpeechAddProps> = ({
  quickSpeechText,
  setQuickSpeechText,
  onQuickAdd
}) => {
  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useContinuousSpeechRecognition({
    onTranscriptChange: (text: string) => {
      console.log('Speech transcript changed:', text);
      setQuickSpeechText(text);
    },
    initialValue: quickSpeechText,
    lang: "fa-IR"
  });

  // Use a combination of speech and manual text
  const currentText = transcript || quickSpeechText;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && currentText.trim()) {
      e.preventDefault();
      onQuickAdd();
    }
  };

  const toggleListening = async () => {
    if (isListening) {
      stopListening();
    } else {
      try {
        await startListening();
      } catch (error) {
        console.error("Error starting speech recognition:", error);
      }
    }
  };

  const handleClearText = () => {
    resetTranscript();
    setQuickSpeechText("");
  };

  const handleManualChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setQuickSpeechText(newValue);
  };

  const displayText = currentText + (interimTranscript ? ' ' + interimTranscript : '');

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800/50 rounded-lg p-3 mb-2">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={onQuickAdd}
                disabled={!displayText.trim()}
                className="bg-violet-600 hover:bg-violet-700 text-white"
              >
                <Plus className="h-4 w-4 ml-1" />
                افزودن سریع
              </Button>
              
              {isSupported && (
                <Button
                  size="sm"
                  onClick={toggleListening}
                  variant={isListening ? "destructive" : "outline"}
                  className={isListening ? "bg-red-500 hover:bg-red-600 text-white" : ""}
                >
                  <AnimatePresence mode="wait">
                    {isListening ? (
                      <motion.div
                        key="mic-off"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <MicOff className="h-4 w-4 ml-1" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="mic"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Mic className="h-4 w-4 ml-1" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {isListening ? "توقف ضبط" : "شروع ضبط"}
                </Button>
              )}

              {displayText.trim() && (
                <Button
                  size="sm"
                  onClick={handleClearText}
                  variant="ghost"
                  className="hover:bg-red-50 hover:text-red-600"
                  title="پاک کردن متن"
                >
                  <Trash2 className="h-4 w-4 ml-1" />
                  پاک کردن
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {isListening && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  در حال ضبط...
                </motion.div>
              )}
              <h4 className="font-medium text-sm text-purple-800 dark:text-purple-300">افزودن حرکت سریع</h4>
            </div>
          </div>
          
          <Textarea
            value={displayText}
            onChange={handleManualChange}
            placeholder="نام حرکت را وارد کنید یا روی دکمه ضبط کلیک کنید..."
            autoResize={true}
            className="min-h-[80px] max-h-[200px] focus-visible:ring-purple-400 text-right"
            dir="rtl"
            onKeyDown={handleKeyDown}
          />
          
          {interimTranscript && (
            <div className="text-xs text-gray-500 text-right">
              در حال تایپ: {interimTranscript}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default QuickSpeechAdd;
