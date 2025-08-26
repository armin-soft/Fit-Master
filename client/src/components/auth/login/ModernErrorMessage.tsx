
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface ModernErrorMessageProps {
  error: string;
}

export const ModernErrorMessage = ({ error }: ModernErrorMessageProps) => {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            duration: 0.4
          }}
          className="mb-6"
        >
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-warning-500/20 backdrop-blur-xl border border-warning-500/30 rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-warning-500/20 via-warning-500/10 to-brand-500/5 rounded-2xl"></div>
            
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-warning-500/40"
              animate={{
                borderColor: [
                  "hsl(var(--warning-500) / 0.4)",
                  "hsl(var(--brand-500) / 0.6)",
                  "hsl(var(--warning-500) / 0.4)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <div className="relative z-10 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <motion.div
                  className="flex-shrink-0 w-8 h-8 bg-warning-500/20 rounded-full flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertTriangle className="h-5 w-5 text-warning-500 dark:text-warning-500" />
                </motion.div>
                
                <div className="flex-1">
                  <p className="text-warning-500 dark:text-warning-500 font-semibold text-sm sm:text-base leading-relaxed">
                    {error}
                  </p>
                </div>
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-500/10 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
