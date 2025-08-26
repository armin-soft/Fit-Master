
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ProfessionalErrorMessageProps {
  error: string;
}

export const ProfessionalErrorMessage = ({ error }: ProfessionalErrorMessageProps) => {
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
            {/* پس‌زمینه شیشه‌ای */}
            <div className="absolute inset-0 bg-destructive/20 backdrop-blur-xl border border-destructive/30 rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/20 via-primary/10 to-primary/5 rounded-2xl"></div>
            
            {/* حاشیه متحرک */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-destructive/40"
              animate={{
                borderColor: [
                  "rgba(248, 113, 113, 0.4)",
                  "rgba(251, 146, 60, 0.6)",
                  "rgba(248, 113, 113, 0.4)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <div className="relative z-10 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                {/* نماد خطا */}
                <motion.div
                  className="flex-shrink-0 w-8 h-8 bg-destructive/20 rounded-full flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </motion.div>
                
                {/* متن خطا */}
                <div className="flex-1">
                  <p className="text-destructive font-semibold text-sm sm:text-base leading-relaxed">
                    {error}
                  </p>
                </div>
                
                {/* افکت درخشش */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
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
