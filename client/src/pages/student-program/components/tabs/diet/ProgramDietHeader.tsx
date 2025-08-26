
import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface ProgramDietHeaderProps {
  onSave: () => void;
  isLoading: boolean;
}

const ProgramDietHeader: React.FC<ProgramDietHeaderProps> = ({
  onSave,
  isLoading
}) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium">برنامه غذایی هفتگی</h3>
      <div className="flex gap-2">
        <Button 
          onClick={onSave}
          disabled={isLoading}
          size="sm"
          className="flex items-center gap-1"
        >
          <Save className="h-4 w-4" />
          {isLoading ? "در حال ذخیره..." : "ذخیره برنامه"}
        </Button>
      </div>
    </div>
  );
};

export default ProgramDietHeader;
