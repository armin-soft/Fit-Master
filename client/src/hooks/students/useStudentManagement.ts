
import { useStudentCore } from './core/useStudentCore';
import { useStudentPersistence } from './core/useStudentPersistence';
import { useStudentCRUD } from './core/useStudentCRUD';
import { useToast } from "@/hooks/use-toast";

/**
 * Main hook for student management, combining core data loading,
 * persistence, and CRUD operations
 */
export const useStudentManagement = () => {
  const { toast } = useToast();
  
  const {
    students,
    setStudents,
    exercises,
    meals,
    supplements,
    setSupplements,
    isInitialized
  } = useStudentCore();
  
  // Set up persistence
  useStudentPersistence(students, supplements, isInitialized);
  
  // Set up CRUD operations
  const { handleDelete, handleSave, handleToggleAccess, refreshData } = useStudentCRUD(students, setStudents);

  return {
    students,
    exercises,
    meals, 
    supplements,
    setStudents,
    setSupplements,
    handleDelete,
    handleSave,
    handleToggleAccess,
    refreshData
  };
};
