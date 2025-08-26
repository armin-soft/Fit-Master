
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingBackground } from "./components/LoadingBackground";
import { LoadingContent } from "./components/LoadingContent";
import { LoadingProgress } from "./components/LoadingProgress";
import { useLoadingState } from "@/hooks/loading/useLoadingState";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  isVisible?: boolean;
}

export const LoadingScreen = React.memo<LoadingScreenProps>(({ 
  onLoadingComplete, 
  isVisible = true 
}) => {
  const { progress, loadingText, gymName, systemInfo, isComplete } = useLoadingState();
  
  React.useEffect(() => {
    if (isComplete && progress === 100 && onLoadingComplete) {
      console.log('Loading completed, transitioning to main app...');
      const timer = setTimeout(() => {
        console.log('All systems ready, launching application...');
        onLoadingComplete();
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  }, [progress, isComplete, onLoadingComplete]);
  
  if (!isVisible) return null;
  
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key="loading-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 w-full h-full z-[9999] bg-gradient-to-br from-brand-600 via-info-500 to-brand-500 overflow-hidden"
      >
        <LoadingBackground />
        
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center p-2 xs:p-4 sm:p-6">
            <LoadingContent 
              gymName={gymName}
              systemInfo={systemInfo}
            />
            
            <LoadingProgress 
              progress={progress}
              loadingText={loadingText}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

LoadingScreen.displayName = "LoadingScreen";
