
import React from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const ExerciseDialogLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <LoadingSpinner 
        size="lg"
        text="در حال بارگذاری تمرین‌ها..."
      />
    </div>
  );
};

export default ExerciseDialogLoading;
