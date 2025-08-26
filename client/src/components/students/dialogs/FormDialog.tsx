
import React from "react";
import { Student } from "../StudentTypes";
import StudentFormDialog from "../StudentFormDialog";

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedStudent: Student | null;
  isEditing: boolean;
  onSave: (updatedStudent: Student, selectedStudent?: Student | null) => void;
}

export const FormDialog: React.FC<FormDialogProps> = ({
  open,
  onOpenChange,
  selectedStudent,
  isEditing,
  onSave,
}) => {
  return (
    <StudentFormDialog
      open={open}
      onOpenChange={onOpenChange}
      student={selectedStudent}
      isEditing={isEditing}
      onSave={(updatedStudent) => {
        onSave(updatedStudent, selectedStudent);
        onOpenChange(false);
      }}
    />
  );
};
