
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { ProfileImage as ProfileImageComponent } from "../ProfileImage";

interface ProfileImageSectionProps {
  image: string;
  onImageChange: (image: string) => void;
}

export const ProfileImageSection = ({ 
  image, 
  onImageChange 
}: ProfileImageSectionProps) => {
  return (
    <div className="relative mx-auto">
      <ProfileImageComponent 
        image={image}
        onImageChange={onImageChange}
      />
      
      <motion.div 
        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 shadow-md rounded-full px-3 py-1 flex items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Upload className="h-3.5 w-3.5 text-indigo-500" />
        <span className="text-xs font-medium">تغییر تصویر</span>
      </motion.div>
    </div>
  );
};
