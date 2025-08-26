
import { useState } from "react";
import { Student } from "@/components/students/StudentTypes";

export const useStudentProgram = () => {
  const [selectedStudentForProgram, setSelectedStudentForProgram] = useState<Student | null>(null);
  const [selectedStudentForExport, setSelectedStudentForExport] = useState<Student | null>(null);
  
  // Handler for opening the program manager
  const handleOpenProgramManager = (student: Student) => {
    setSelectedStudentForProgram(student);
  };
  
  // Handler for closing the program manager
  const handleCloseProgramManager = () => {
    setSelectedStudentForProgram(null);
  };
  
  // Handler for opening the export dialog
  const handleOpenExport = (student: Student) => {
    setSelectedStudentForExport(student);
  };
  
  // Handler for closing the export dialog
  const handleCloseExport = () => {
    setSelectedStudentForExport(null);
  };
  
  return {
    selectedStudentForProgram,
    selectedStudentForExport,
    handleOpenProgramManager,
    handleCloseProgramManager,
    handleOpenExport,
    handleCloseExport
  };
};
