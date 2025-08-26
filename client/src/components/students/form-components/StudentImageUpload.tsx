
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageIcon, User2 } from "lucide-react";

interface StudentImageUploadProps {
  imageData: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  error: string | null;
  itemVariants: any;
}

export const StudentImageUpload: React.FC<StudentImageUploadProps> = ({
  imageData,
  onChange,
  onReset,
  error,
  itemVariants,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
      <Label htmlFor="student-image" className="cursor-pointer">
        <Avatar className="w-20 h-20 relative ring-2 ring-offset-2 ring-offset-background ring-indigo-100 dark:ring-indigo-900/30">
          {imageData ? (
            <AvatarImage src={imageData} alt="تصویر شاگرد" className="object-cover" />
          ) : (
            <AvatarFallback className="bg-indigo-50 dark:bg-indigo-950/50">
              <User2 className="h-8 w-8 text-indigo-400 dark:text-indigo-300" />
            </AvatarFallback>
          )}
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute -bottom-1 -right-1 rounded-full shadow-md h-8 w-8"
            onClick={() => inputRef.current?.click()}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </Avatar>
      </Label>
      
      <input
        ref={inputRef}
        id="student-image"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
      
      {error && <p className="text-destructive text-xs font-medium">{error}</p>}
      
      {imageData && (
        <Button
          type="button"
          variant="link"
          size="sm"
          className="text-xs h-7 px-2 text-muted-foreground"
          onClick={onReset}
        >
          حذف تصویر
        </Button>
      )}
    </motion.div>
  );
};
