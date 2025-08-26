
import React from "react";
import { TableBody } from "@/components/ui/table";
import { Student } from "@/components/students/StudentTypes";
import { StudentTableRow } from "./StudentTableRow";
import { StudentTableEmpty } from "./StudentTableEmpty";
import { motion, AnimatePresence } from "framer-motion";
import { useTableColumns } from "./tableColumns";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";

// Helper function to calculate profile completion
const calculateProfileCompletion = (student: Student): boolean => {
  const requiredFields = [
    student.name,
    student.phone,
    student.gender,
    student.age,
    student.height,
    student.weight
  ];
  
  return requiredFields.every(field => field !== null && field !== undefined && field !== "");
};

interface StudentTableBodyProps {
  students: Student[];
  onEdit?: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onToggleAccess?: (student: Student) => void;
  isProfileComplete?: boolean;
  searchQuery?: string;
  onAddStudent?: () => void;
  onClearSearch?: () => void;
}

export const StudentTableBody: React.FC<StudentTableBodyProps> = ({
  students,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onToggleAccess,
  isProfileComplete,
  searchQuery = "",
  onAddStudent,
  onClearSearch
}) => {
  const columns = useTableColumns();
  
  const table = useReactTable({
    data: students,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (students.length === 0) {
    return (
      <StudentTableEmpty 
        columnsCount={columns.length} 
        searchQuery={searchQuery}
        onAddStudent={onAddStudent}
        onClearSearch={onClearSearch}
      />
    );
  }

  return (
    <TableBody className="divide-y divide-slate-100 dark:divide-slate-800/50">
      <AnimatePresence mode="popLayout">
        {students.map((student, index) => (
          <motion.tr
            key={student.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30,
              delay: index * 0.03
            }}
            className="bg-white dark:bg-slate-900/60 backdrop-blur-sm hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
          >
            <StudentTableRow
              student={student}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddExercise={onAddExercise}
              onAddDiet={onAddDiet}
              onAddSupplement={onAddSupplement}
              onToggleAccess={onToggleAccess}
              isProfileComplete={calculateProfileCompletion(student)}
              index={index}
            />
          </motion.tr>
        ))}
      </AnimatePresence>
    </TableBody>
  );
};
