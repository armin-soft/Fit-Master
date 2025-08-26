
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudentTableHeaderProps {
  sortField?: string;
  sortOrder?: "asc" | "desc";
  onSortChange?: (field: string) => void;
}

export const StudentTableHeader: React.FC<StudentTableHeaderProps> = ({
  sortField,
  sortOrder,
  onSortChange,
}) => {
  const handleSort = (field: string) => {
    if (onSortChange) {
      onSortChange(field);
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField === field) {
      return sortOrder === "asc" ? (
        <ChevronUp className="h-3 w-3 ml-1" />
      ) : (
        <ChevronDown className="h-3 w-3 ml-1" />
      );
    }
    return null;
  };

  return (
    <TableHeader className="bg-slate-50/80 dark:bg-slate-800/60 backdrop-blur-sm border-b border-slate-200/60 dark:border-slate-700/60">
      <TableRow className="hover:bg-transparent">
        <TableHead className="text-right w-16">تصویر</TableHead>
        <TableHead className="text-right">
          <Button
            variant="ghost"
            className="h-auto p-0 font-medium hover:bg-transparent text-slate-700 dark:text-slate-300"
            onClick={() => handleSort("name")}
          >
            نام
            {getSortIcon("name")}
          </Button>
        </TableHead>
        <TableHead className="text-right">
          <Button
            variant="ghost"
            className="h-auto p-0 font-medium hover:bg-transparent text-slate-700 dark:text-slate-300"
            onClick={() => handleSort("phone")}
          >
            شماره موبایل
            {getSortIcon("phone")}
          </Button>
        </TableHead>
        <TableHead className="text-right">جنسیت</TableHead>
        <TableHead className="text-right">
          <Button
            variant="ghost"
            className="h-auto p-0 font-medium hover:bg-transparent text-slate-700 dark:text-slate-300"
            onClick={() => handleSort("age")}
          >
            سن
            {getSortIcon("age")}
          </Button>
        </TableHead>
        <TableHead className="text-right">
          <Button
            variant="ghost"
            className="h-auto p-0 font-medium hover:bg-transparent text-slate-700 dark:text-slate-300"
            onClick={() => handleSort("height")}
          >
            قد
            {getSortIcon("height")}
          </Button>
        </TableHead>
        <TableHead className="text-right">
          <Button
            variant="ghost"
            className="h-auto p-0 font-medium hover:bg-transparent text-slate-700 dark:text-slate-300"
            onClick={() => handleSort("weight")}
          >
            وزن
            {getSortIcon("weight")}
          </Button>
        </TableHead>
        <TableHead className="text-right">تکمیل پروفایل</TableHead>
        <TableHead className="text-center w-32">اقدامات</TableHead>
      </TableRow>
    </TableHeader>
  );
};
