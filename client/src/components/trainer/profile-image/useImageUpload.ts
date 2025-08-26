
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseImageUploadProps {
  onImageChange: (image: string) => void;
}

export const useImageUpload = ({ onImageChange }: UseImageUploadProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً یک فایل تصویری انتخاب کنید",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "خطا", 
        description: "حجم تصویر نباید بیشتر از ۵ مگابایت باشد",
      });
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onImageChange(result);
      setIsUploading(false);
      toast({
        title: "موفق",
        description: "تصویر با موفقیت آپلود شد",
      });
    };

    reader.onerror = () => {
      setIsUploading(false);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در آپلود تصویر",
      });
    };

    reader.readAsDataURL(file);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  return {
    fileInputRef,
    isUploading,
    dragActive,
    isHovering,
    setIsHovering,
    handleImageUpload,
    handleDrag,
    handleDrop,
    handleFileUpload
  };
};
