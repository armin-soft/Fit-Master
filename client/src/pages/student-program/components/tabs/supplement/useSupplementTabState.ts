
import { useState, useEffect } from "react";
import { Student } from "@/components/students/StudentTypes";

export const useSupplementTabState = (
  student: Student,
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}) => boolean
) => {
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>([]);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Initialize selected supplements and vitamins from student data
  useEffect(() => {
    if (student.supplements) {
      setSelectedSupplements(student.supplements);
    } else {
      setSelectedSupplements([]);
    }
    
    if (student.vitamins) {
      setSelectedVitamins(student.vitamins);
    } else {
      setSelectedVitamins([]);
    }
  }, [student]);

  const handleSave = () => {
    setIsLoading(true);
    const success = onSaveSupplements({
      supplements: selectedSupplements,
      vitamins: selectedVitamins
    });
    setIsLoading(false);
    return success;
  };

  return {
    selectedSupplements,
    setSelectedSupplements,
    selectedVitamins,
    setSelectedVitamins,
    handleSave,
    isLoading
  };
};

export default useSupplementTabState;
