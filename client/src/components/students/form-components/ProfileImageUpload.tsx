
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ImageIcon, User2, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProfileImageUploadProps {
  previewImage: string;
  onChange: (imageData: string) => void;
  error?: boolean;
}

export const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  previewImage,
  onChange,
  error = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      // Handle error - file too large
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onChange(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="text-center space-y-6"
    >
      <div className="relative inline-block">
        <Avatar 
          className="w-32 h-32 cursor-pointer ring-4 ring-white dark:ring-slate-800 shadow-2xl transition-all duration-300 hover:scale-105"
          onClick={handleImageClick}
        >
          {previewImage && previewImage !== "/Assets/Image/Place-Holder.svg" ? (
            <AvatarImage src={previewImage} alt="تصویر شاگرد" className="object-cover" />
          ) : (
            <AvatarFallback className="bg-gradient-to-br from-emerald-100 to-sky-100 dark:from-emerald-900/30 dark:to-sky-900/30">
              <User2 className="h-16 w-16 text-emerald-600 dark:text-emerald-400" />
            </AvatarFallback>
          )}
        </Avatar>
        
        <Button
          type="button"
          size="icon"
          className="absolute -bottom-2 -left-2 rounded-full shadow-lg bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 border-4 border-white dark:border-slate-800 h-10 w-10"
          onClick={handleImageClick}
        >
          <Camera className="h-4 w-4 text-white" />
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-3"
      >
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleImageClick}
          className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
        >
          <ImageIcon className="h-4 w-4 ml-2" />
          تغییر تصویر
        </Button>
        
        <div className="flex justify-center">
          <Badge 
            variant="secondary" 
            className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
          >
            حداکثر ۵ مگابایت
          </Badge>
        </div>
      </motion.div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">
          لطفاً یک تصویر انتخاب کنید
        </p>
      )}
    </motion.div>
  );
};
