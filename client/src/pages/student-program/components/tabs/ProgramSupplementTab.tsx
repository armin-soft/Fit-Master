
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { Supplement } from "@/types/supplement";
import { useSupplementTabState } from "./supplement/useSupplementTabState";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import SupplementSelector from "./supplement/SupplementSelector";
import VitaminSelector from "./supplement/VitaminSelector";

interface ProgramSupplementTabProps {
  student: Student;
  supplements: Supplement[];
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}) => boolean;
}

export const ProgramSupplementTab: React.FC<ProgramSupplementTabProps> = ({
  student,
  supplements,
  onSaveSupplements
}) => {
  const {
    selectedSupplements,
    setSelectedSupplements,
    selectedVitamins,
    setSelectedVitamins,
    handleSave,
    isLoading
  } = useSupplementTabState(student, onSaveSupplements);

  return (
    <div className="space-y-4 p-1">
      {/* Header component with save button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">مکمل‌ها و ویتامین‌ها</h3>
        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            size="sm"
            className="flex items-center gap-1"
          >
            <Save className="h-4 w-4" />
            {isLoading ? "در حال ذخیره..." : "ذخیره برنامه"}
          </Button>
        </div>
      </div>
      
      {/* Supplement & vitamin selection UI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3">مکمل‌ها</h4>
          <SupplementSelector
            supplements={supplements.filter(s => s.type === 'supplement')}
            selectedIds={selectedSupplements}
            onChange={setSelectedSupplements}
          />
        </div>
        
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3">ویتامین‌ها</h4>
          <VitaminSelector
            vitamins={supplements.filter(s => s.type === 'vitamin')}
            selectedIds={selectedVitamins}
            onChange={setSelectedVitamins}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgramSupplementTab;
