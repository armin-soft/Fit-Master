
import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Student } from "@/components/students/StudentTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserRound, CheckCircle, CalendarDays, Edit, Trash2, Menu, User, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { BMIDisplay } from "@/components/students/bmi";
import StudentProgramExporter from "@/components/students/export/StudentProgramExporter";


interface StudentTableRowProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onToggleAccess?: (student: Student) => void;
  isProfileComplete: boolean;
  index?: number;
}

export const StudentTableRow: React.FC<StudentTableRowProps> = ({
  student,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onToggleAccess,
  isProfileComplete,
  index,
}) => {
  return (
    <>
      <TableCell className="p-2">
        <div className="flex items-center justify-start">
          <Avatar className="h-10 w-10 border-2 border-white/20 shadow-lg">
            <AvatarImage src={student.image} alt={student.name} />
            <AvatarFallback><UserRound className="h-4 w-4" /></AvatarFallback>
          </Avatar>
        </div>
      </TableCell>
      
      <TableCell>
        <div className="font-medium text-right">{student.name}</div>
      </TableCell>
      
      <TableCell className="text-right">{toPersianNumbers(student.phone)}</TableCell>
      
      <TableCell className="text-right">
        {student.gender && (
          <div className="flex justify-start">
            <Badge variant="outline" className={`gap-2 ${student.gender === 'male' ? 'bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-900/20 dark:border-brand-700/30 dark:text-brand-400' : 'bg-info-50 text-info-700 border-info-200 dark:bg-info-900/20 dark:border-info-700/30 dark:text-info-400'}`}>
              {student.gender === 'male' ? <User className="h-3.5 w-3.5" /> : <UserCheck className="h-3.5 w-3.5" />}
              {student.gender === 'male' ? "مرد" : "زن"}
            </Badge>
          </div>
        )}
      </TableCell>
      
      <TableCell className="text-right">
        <span className="text-sm">
          {student.age ? toPersianNumbers(student.age.toString()) : "-"}
        </span>
      </TableCell>
      
      <TableCell className="text-right">
        <div className="flex flex-col items-start">
          <span>{toPersianNumbers(student.height.toString())}</span>
          <span className="text-xs text-muted-foreground">سانتی‌متر</span>
        </div>
      </TableCell>
      
      <TableCell className="text-right">
        <div className="flex flex-col items-start">
          <span>{toPersianNumbers(student.weight.toString())}</span>
          <span className="text-xs text-muted-foreground">کیلوگرم</span>
        </div>
      </TableCell>
      
      <TableCell className="text-right">
        <div className="flex justify-start">
          {isProfileComplete ? (
            <Badge variant="outline" className="gap-2 bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-700/30 dark:text-green-400">
              <CheckCircle className="h-3.5 w-3.5 text-green-500" />
              کامل
            </Badge>
          ) : (
            <Badge variant="outline" className="gap-2 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700/30 dark:text-amber-400">
              ناقص
            </Badge>
          )}
        </div>
      </TableCell>
      
      <TableCell className="text-center">
        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
          {/* Mobile view: dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg border border-slate-200/70 dark:border-slate-700/70">
              {onEdit && (
                <DropdownMenuItem onClick={() => {
                  console.log('Edit button clicked for student:', student);
                  onEdit(student);
                }} className="cursor-pointer">
                  <Edit className="h-3.5 w-3.5 mr-2" />
                  ویرایش
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onAddExercise(student)} className="cursor-pointer">
                <CalendarDays className="h-3.5 w-3.5 mr-2" />
                برنامه
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <div className="w-full">
                  <StudentProgramExporter student={student} />
                </div>
              </DropdownMenuItem>
              {onToggleAccess && (
                <DropdownMenuItem onClick={() => {
                  console.log('Toggle access clicked for student:', student.name, 'Current isActive:', student.isActive);
                  onToggleAccess(student);
                }} className="cursor-pointer">
                  {student.isActive !== false ? (
                    <>
                      <User className="h-3.5 w-3.5 mr-2 text-red-500" />
                      غیرفعال کردن
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-3.5 w-3.5 mr-2 text-green-500" />
                      فعال کردن
                    </>
                  )}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => {
                console.log('Delete button clicked for student ID:', student.id);
                onDelete(student.id);
              }} className="cursor-pointer text-red-600 dark:text-red-400">
                <Trash2 className="h-3.5 w-3.5 mr-2" />
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Desktop view: inline buttons */}
          <div className="hidden md:flex md:items-center md:gap-2">
            <BMIDisplay 
              height={student.height} 
              weight={student.weight} 
              name={student.name}
              age={student.age}
              gender={student.gender}
            />
            
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-xs py-1 px-2 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400 transition-colors"
              onClick={() => onAddExercise(student)}
            >
              <CalendarDays className="h-3.5 w-3.5" />
              <span>برنامه</span>
            </Button>
            
            <StudentProgramExporter student={student} />
            
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-xs py-1 px-2 hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-900/20 dark:hover:text-sky-400 transition-colors"
                onClick={() => {
                  console.log('Desktop Edit button clicked for student:', student);
                  onEdit(student);
                }}
              >
                <Edit className="h-3.5 w-3.5" />
                <span>ویرایش</span>
              </Button>
            )}
            
            {onToggleAccess && (
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-1 text-xs py-1 px-2 transition-colors ${
                  student.isActive !== false 
                    ? 'hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-400'
                    : 'hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400'
                }`}
                onClick={() => onToggleAccess(student)}
              >
                {student.isActive !== false ? (
                  <>
                    <User className="h-3.5 w-3.5" />
                    <span>غیرفعال</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>فعال</span>
                  </>
                )}
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-xs py-1 px-2 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors"
              onClick={() => {
                console.log('Desktop Delete button clicked for student ID:', student.id);
                onDelete(student.id);
              }}
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>حذف</span>
            </Button>
          </div>
        </div>
      </TableCell>
    </>
  );
};
