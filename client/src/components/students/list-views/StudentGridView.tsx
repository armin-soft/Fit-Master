
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { StudentCard } from "@/components/students/StudentCard";
import { StudentEmptyState } from "./StudentEmptyState";

interface StudentGridViewProps {
  students: Student[];
  searchQuery: string;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onAddStudent: () => void;
  onClearSearch: () => void;
  isProfileComplete: boolean;
}

export const StudentGridView: React.FC<StudentGridViewProps> = ({
  students,
  searchQuery,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onAddStudent,
  onClearSearch,
  isProfileComplete
}) => {
  // No students found with search query
  if (students.length === 0 && searchQuery) {
    return (
      <StudentEmptyState
        searchQuery={searchQuery}
        onClearSearch={onClearSearch}
        onAddStudent={onAddStudent}
      />
    );
  }
  
  // No students at all
  if (students.length === 0) {
    return (
      <StudentEmptyState
        searchQuery={""}
        onClearSearch={onClearSearch}
        onAddStudent={onAddStudent}
      />
    );
  }
  
  // Log to help with debugging
  console.log(`Rendering StudentGridView with ${students.length} students`);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
      <AnimatePresence>
        {students.map((student) => (
          <motion.div
            key={student.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <StudentCard
              student={student}
              onEdit={() => {
                console.log("Edit clicked for:", student.name);
                onEdit(student);
              }}
              onDelete={() => {
                console.log("Delete clicked for:", student.name);
                onDelete(student.id);
              }}
              onAddExercise={() => {
                console.log("GridView: onAddExercise called for student:", student.name);
                onAddExercise(student);
              }}
              onAddDiet={() => onAddDiet(student)}
              onAddSupplement={() => onAddSupplement(student)}
              isProfileComplete={isProfileComplete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
