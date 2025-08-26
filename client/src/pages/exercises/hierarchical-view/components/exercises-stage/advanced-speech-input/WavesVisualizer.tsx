
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WavesVisualizerProps {
  isActive: boolean;
  className?: string;
}

const WavesVisualizer: React.FC<WavesVisualizerProps> = ({ isActive, className }) => {
  if (!isActive) return null;
  
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          initial={{ height: "30%" }}
          animate={{ 
            height: ["30%", `${Math.random() * 70 + 30}%`, "30%"] 
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: i * 0.1
          }}
          className="w-0.5 bg-red-400 dark:bg-red-500 rounded-full opacity-70"
          style={{ height: 16 }}
        />
      ))}
    </div>
  );
};

export { WavesVisualizer };
export default WavesVisualizer;
