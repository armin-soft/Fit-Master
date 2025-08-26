
import { motion } from "framer-motion";

interface UploadProgressProps {
  isUploading: boolean;
}

export const UploadProgress = ({ isUploading }: UploadProgressProps) => {
  if (!isUploading) return null;
  
  return (
    <motion.div 
      className="absolute inset-0 bg-black/60 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col items-center">
        <motion.div 
          className="w-10 h-10 border-3 border-white border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <p className="text-white text-xs mt-2">در حال آپلود...</p>
      </div>
    </motion.div>
  );
};
