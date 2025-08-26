
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Student } from "@/components/students/StudentTypes";
import { StudentCardHeader } from "./card/StudentCardHeader";
import { StudentCardStats } from "./card/StudentCardStats";
import { StudentProgressBar } from "./card/StudentProgressBar";
import { StudentStatBadges } from "./card/StudentStatBadges";
import { StudentCardFooter } from "./card/StudentCardFooter";
import { StudentContextMenu } from "./card/StudentContextMenu";
import { cn } from "@/lib/utils";

interface StudentCardProps {
  student: Student;
  onEdit: () => void;
  onDelete: () => void;
  onAddExercise: () => void;
  onAddDiet: () => void;
  onAddSupplement: () => void;
  isProfileComplete: boolean;
  className?: string;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  isProfileComplete,
  className
}) => {
  // Log when the card is rendered to help with debugging
  console.log("Rendering StudentCard for:", student.name, "with onAddExercise handler:", !!onAddExercise);
  
  return (
    <StudentContextMenu
      student={student}
      onEdit={onEdit}
      onDelete={onDelete}
      onAddExercise={onAddExercise}
      onAddDiet={onAddDiet}
      onAddSupplement={onAddSupplement}
      isProfileComplete={isProfileComplete}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        layout
        className="h-full"
        aria-label={`کارت دانش‌آموز ${student.name}`}
      >
        <Card className={cn(
          "h-full relative overflow-hidden shadow-lg backdrop-blur-md",
          "bg-gradient-to-br from-white/90 to-white/70 dark:from-slate-900/90 dark:to-slate-800/70",
          "border border-slate-200/80 dark:border-slate-700/80",
          "hover:shadow-xl hover:shadow-brand-200/10 dark:hover:shadow-brand-900/20",
          "transition-all duration-300 ease-in-out group",
          className
        )}>
          {/* Animated gradient background on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-400/5 via-info-400/5 to-brand-400/5 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
          
          {/* Top right decorative shape */}
          <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-br from-brand-500/10 to-info-500/10 
                        blur-xl dark:from-brand-500/20 dark:to-info-500/20"></div>
          
          {/* Bottom left decorative shape */}
          <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-br from-info-500/10 to-brand-500/10 
                        blur-xl dark:from-info-500/20 dark:to-brand-500/20"></div>
          
          <CardHeader className="p-4 pb-0">
            <StudentCardHeader
              student={student}
              onEdit={onEdit}
              onDelete={onDelete}
              isProfileComplete={isProfileComplete}
            />
          </CardHeader>
          
          <CardContent className="p-4 pt-2">
            <StudentCardStats 
              height={student.height} 
              weight={student.weight} 
              trainingLevel={student.grade}
              goalType={student.goalType}
            />
            
            <StudentProgressBar progress={student.progress || 0} />
            
            <StudentStatBadges 
              exercises={student.exercises} 
              meals={student.meals} 
              supplements={student.supplements} 
            />
          </CardContent>
          
          <CardFooter className="p-3 pt-0 flex justify-between">
            <StudentCardFooter onEdit={onEdit} />
          </CardFooter>
        </Card>
      </motion.div>
    </StudentContextMenu>
  );
};
