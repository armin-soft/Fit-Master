
import { ImageIcon } from "lucide-react";

export const ImagePlaceholder = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="relative">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        <ImageIcon className="w-10 h-10 text-muted-foreground/40 mb-2 relative" />
      </div>
      <p className="text-xs text-muted-foreground font-medium">انتخاب تصویر</p>
    </div>
  );
};
