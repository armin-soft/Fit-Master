
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpeechPopoverProps {
  show: boolean;
  isListening: boolean;
}

const SpeechPopover: React.FC<SpeechPopoverProps> = ({ show, isListening }) => {
  return (
    <AnimatePresence>
      {show && !isListening && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 5 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute z-50 top-full mt-1 right-0",
            "bg-white dark:bg-gray-900 shadow-lg rounded-md p-2",
            "border border-gray-200 dark:border-gray-800",
            "text-xs text-right font-medium max-w-[200px]",
            "before:content-[''] before:absolute before:-top-1 before:right-4",
            "before:w-2 before:h-2 before:bg-white dark:before:bg-gray-900",
            "before:rotate-45 before:border-t before:border-l",
            "before:border-gray-200 dark:before:border-gray-800"
          )}
        >
          با کلیک روی این دکمه می‌توانید نام حرکت را با گفتار وارد کنید
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpeechPopover;
