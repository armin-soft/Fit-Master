
import React, { useState } from "react";
import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";
import { StudentFormValues } from "@/lib/validations/student";
import { StudentImageUpload } from "./StudentImageUpload";

interface StudentImageSectionProps {
  initialImage: string | undefined;
  form: UseFormReturn<StudentFormValues>;
  itemVariants: any;
}

export const StudentImageSection: React.FC<StudentImageSectionProps> = ({
  initialImage,
  form,
  itemVariants,
}) => {
  const [imageData, setImageData] = useState<string | null>(initialImage || null);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      setImageError("حجم تصویر باید کمتر از ۵ مگابایت باشد");
      return;
    }
    
    setImageError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImageData(result);
      // Update the form value for image
      form.setValue("image", result);
    };
    reader.readAsDataURL(file);
  };

  const handleResetImage = () => {
    setImageData(null);
    setImageError(null);
    form.setValue("image", "/Assets/Image/Place-Holder.svg");
  };

  return (
    <div className="w-full max-w-[180px] sm:max-w-[200px] lg:max-w-[220px] flex flex-col items-center gap-3">
      <StudentImageUpload 
        imageData={imageData}
        onChange={handleImageChange}
        onReset={handleResetImage}
        error={imageError}
        itemVariants={itemVariants}
      />
    </div>
  );
};
