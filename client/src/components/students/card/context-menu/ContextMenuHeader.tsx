
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ContextMenuLabel } from "@/components/ui/context-menu";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ContextMenuHeaderProps {
  student: Student;
}

export const ContextMenuHeader: React.FC<ContextMenuHeaderProps> = ({ student }) => {
  return (
    <div className="px-2 py-1.5 mb-2 border-b border-slate-100 dark:border-slate-800/90">
      <div className="flex items-center gap-2 mb-1">
        <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
          <AvatarImage src={student.image} alt={student.name} />
          <AvatarFallback className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
            {student.name?.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <ContextMenuLabel className="text-base font-semibold text-slate-900 dark:text-slate-100 p-0">
            {student.name}
          </ContextMenuLabel>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {student.phone ? `شماره: ${toPersianNumbers(student.phone)}` : "بدون شماره تماس"}
          </p>
        </div>
      </div>
    </div>
  );
};
