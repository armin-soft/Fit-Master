
import React from "react";
import { Student } from "../StudentTypes";
import { SupplementDialog as StudentSupplementDialog } from "@/components/supplements/student/SupplementDialog";

interface SupplementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedStudent: Student | null;
  supplements?: any[];
  onSaveSupplements?: (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => boolean;
}

export const SupplementDialog: React.FC<SupplementDialogProps> = ({
  open,
  onOpenChange,
  selectedStudent,
  supplements = [],
  onSaveSupplements,
}) => {
  if (!selectedStudent || !onSaveSupplements) return null;

  return (
    <StudentSupplementDialog
      open={open}
      onOpenChange={onOpenChange}
      studentName={selectedStudent.name}
      onSave={(data) => {
        return onSaveSupplements(data, selectedStudent.id);
      }}
      supplements={supplements}
      initialSupplements={selectedStudent.supplements}
      initialVitamins={selectedStudent.vitamins}
      initialSupplementsDay1={selectedStudent.supplementsDay1 || []}
      initialVitaminsDay1={selectedStudent.vitaminsDay1 || []}
    />
  );
};
