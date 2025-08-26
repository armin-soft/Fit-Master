
import { motion } from "framer-motion";
import { Upload, UploadCloud } from "lucide-react";

interface HoverOverlayProps {
  isHovering: boolean;
  dragActive: boolean;
  isUploading: boolean;
}

export const HoverOverlay = ({ isHovering, dragActive, isUploading }: HoverOverlayProps) => {
  if ((!isHovering && !dragActive) || isUploading) return null;
  
  return (
    <motion.div 
      className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {dragActive ? (
        <div className="text-white flex flex-col items-center">
          <UploadCloud className="h-10 w-10 text-white mb-1" />
          <p className="text-sm font-medium">رها کنید</p>
        </div>
      ) : (
        <div className="text-white flex flex-col items-center">
          <Upload className="h-8 w-8 text-white mb-1" />
          <p className="text-sm font-medium">تغییر تصویر</p>
        </div>
      )}
    </motion.div>
  );
};
