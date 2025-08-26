
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentCardHeaderProps {
  student: Student;
  onEdit: () => void;
  onDelete: (id: number) => void;
  isProfileComplete: boolean;
  menu?: React.ReactNode;
}

export const StudentCardHeader: React.FC<StudentCardHeaderProps> = ({
  student,
  onEdit,
  onDelete,
  isProfileComplete,
  menu
}) => {
  return (
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-800 shadow-sm">
          <AvatarImage 
            src={student.image || "/Assets/Image/Place-Holder.svg"} 
            alt={student.name} 
            className="object-cover"
          />
          <AvatarFallback className="bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300">
            {student.name?.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">{student.name}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {student.phone ? toPersianNumbers(student.phone) : "بدون شماره تماس"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-brand-100/80 dark:hover:bg-brand-900/30 transition-colors duration-200"
          onClick={onEdit}
        >
          <Edit2 className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          <span className="sr-only">ویرایش شاگرد</span>
        </Button>
        
        {menu}
      </div>
    </div>
  );
};
