
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ImagePlaceholder } from "./profile-image/ImagePlaceholder";
import { HoverOverlay } from "./profile-image/HoverOverlay";
import { UploadProgress } from "./profile-image/UploadProgress";
import { ProfileBadge } from "./profile-image/ProfileBadge";

interface ProfileImageProps {
  image: string;
  onImageChange: (image: string) => void;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ 
  image, 
  onImageChange 
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageChange(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileChange(file);
      }
    };
    input.click();
  };

  return (
    <motion.div
      className="relative w-32 h-32 mx-auto cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl">
        {image && image !== "/Assets/Image/Place-Holder.svg" ? (
          <img 
            src={image} 
            alt="پروفایل مربی" 
            className="w-full h-full object-cover"
          />
        ) : (
          <ImagePlaceholder />
        )}
        
        <HoverOverlay 
          isHovering={isHovering}
          dragActive={dragActive}
          isUploading={isUploading}
        />
        
        <UploadProgress isUploading={isUploading} />
      </div>
      
      <ProfileBadge />
    </motion.div>
  );
};
