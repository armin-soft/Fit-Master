
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, User } from "lucide-react";
import { TrainerProfile } from "@/types/trainer";
import { ImageUploadOptions } from "@/components/trainer/profile-image/ImageUploadOptions";
import { useAppName } from "@/contexts/AppNameContext";

interface ProfileImageSectionProps {
  profile: TrainerProfile;
  onImageChange: (image: string) => void;
}

export const ProfileImageSection: React.FC<ProfileImageSectionProps> = ({ 
  profile, 
  onImageChange 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { appName } = useAppName();

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          onImageChange(result);
        };
        reader.readAsDataURL(file);
      }
    });
    input.click();
  };

  return (
    <div className="text-center space-y-6">
      {/* تصویر پروفایل */}
      <motion.div 
        className="relative mx-auto w-40 h-40"
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700">
          {profile.image && profile.image !== "/Assets/Image/Place-Holder.svg" ? (
            <img 
              src={profile.image} 
              alt="پروفایل مربی" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-sky-100 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
              <User className="w-16 h-16 text-emerald-500 dark:text-emerald-400" />
            </div>
          )}
          
          {/* Overlay برای ویرایش */}
          <motion.div 
            className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleFileUpload}
          >
            <div className="text-white text-center">
              <Upload className="w-8 h-8 mx-auto mb-2" />
              <span className="text-sm font-medium">تغییر تصویر</span>
            </div>
          </motion.div>
        </div>

        {/* دکمه انتخاب تصویر */}
        <ImageUploadOptions
          onFileUpload={handleFileUpload}
          className="absolute -bottom-2 -left-2"
        />
      </motion.div>

      {/* اطلاعات کلی */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            {profile.name || "نام مربی"}
          </h3>
          <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
            {appName}
          </p>
        </motion.div>
      </div>
    </div>
  );
};
