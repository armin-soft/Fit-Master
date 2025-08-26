
import React from "react";
import { motion } from "framer-motion";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export const LoadingState = () => {
  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      key="loading"
      variants={loadingVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-[400px] flex items-center justify-center"
    >
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <LoadingSpinner 
            size="lg"
            className="text-emerald-600"
            text="در حال بارگذاری اطلاعات..."
          />
        </div>
      </div>
    </motion.div>
  );
};
