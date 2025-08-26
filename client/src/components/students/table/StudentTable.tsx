
import React, { useState, useEffect } from "react";
import { Student } from "@/components/students/StudentTypes";
import { Table } from "@/components/ui/table";
import { StudentTableHeader } from "./StudentTableHeader";
import { StudentTableBody } from "./StudentTableBody";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingState } from "./LoadingState";

interface StudentTableProps {
  students: Student[];
  sortedAndFilteredStudents: Student[];
  searchQuery: string;
  refreshTrigger: number;
  onEdit?: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onToggleAccess?: (student: Student) => void;
  onAddStudent: () => void;
  onClearSearch: () => void;
  isProfileComplete: boolean;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  onSortChange?: (field: string) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  sortedAndFilteredStudents,
  searchQuery,
  refreshTrigger,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onToggleAccess,
  onAddStudent,
  onClearSearch,
  isProfileComplete,
  sortField,
  sortOrder,
  onSortChange
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Reset loading state when data changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [refreshTrigger, sortField, sortOrder, searchQuery]);

  const tableContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingState />
      ) : (
        <motion.div
          key="table"
          variants={tableContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="overflow-hidden rounded-lg border border-slate-200/70 dark:border-slate-700/70 backdrop-blur-sm bg-white/70 dark:bg-slate-900/60 shadow-lg shadow-slate-200/30 dark:shadow-slate-900/30"
        >
          <div className="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
            <Table>
              <StudentTableHeader 
                sortField={sortField}
                sortOrder={sortOrder}
                onSortChange={onSortChange}
              />
              <StudentTableBody
                students={sortedAndFilteredStudents}
                onEdit={onEdit}
                onDelete={onDelete}
                onAddExercise={onAddExercise}
                onAddDiet={onAddDiet}
                onAddSupplement={onAddSupplement}
                onToggleAccess={onToggleAccess}
                isProfileComplete={isProfileComplete}
                searchQuery={searchQuery}
                onAddStudent={onAddStudent}
                onClearSearch={onClearSearch}
              />
            </Table>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
