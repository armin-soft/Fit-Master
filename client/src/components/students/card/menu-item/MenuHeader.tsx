
import React from "react";
import { Student } from "../../StudentTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface MenuHeaderProps {
  student: Student;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({ student }) => {
  return (
    <div className="px-2 py-1.5 mb-1 border-b border-slate-100 dark:border-slate-800/90">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 border border-slate-200 dark:border-slate-700">
          <AvatarImage src={student.image} alt={student.name} />
          <AvatarFallback className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
            {student.name?.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">{student.name}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {student.phone ? `شماره: ${toPersianNumbers(student.phone)}` : "بدون شماره تماس"}
          </p>
        </div>
      </div>
    </div>
  );
};
