
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ImageUploadOptionsProps {
  onFileUpload: () => void;
  className?: string;
}

export const ImageUploadOptions = ({ 
  onFileUpload, 
  className 
}: ImageUploadOptionsProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onFileUpload}
      className={`bg-white border-gray-200 hover:bg-gray-50 ${className}`}
    >
      <Upload className="h-4 w-4 mr-2" />
      تغییر تصویر
    </Button>
  );
};
