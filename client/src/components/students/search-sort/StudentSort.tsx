
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronUp, 
  ArrowUpDown,
  User,
  Weight,
  Ruler,
  BarChart
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StudentSortProps } from "./StudentSearchSortTypes";

export const StudentSort = ({
  sortField,
  sortOrder,
  toggleSort,
}: StudentSortProps) => {
  const getSortIcon = (field: "name" | "weight" | "height" | "progress") => {
    if (sortField !== field) return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    return sortOrder === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4 text-indigo-500" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4 text-indigo-500" />
    );
  };

  const getFieldIcon = (field: "name" | "weight" | "height" | "progress") => {
    switch (field) {
      case "name":
        return <User className="h-4 w-4 text-indigo-500 mr-2" />;
      case "weight":
        return <Weight className="h-4 w-4 text-indigo-500 mr-2" />;
      case "height":
        return <Ruler className="h-4 w-4 text-indigo-500 mr-2" />;
      case "progress":
        return <BarChart className="h-4 w-4 text-indigo-500 mr-2" />;
    }
  };

  const getActiveLabel = () => {
    switch (sortField) {
      case "name":
        return "نام";
      case "weight":
        return "وزن";
      case "height":
        return "قد";
      case "progress":
        return "پیشرفت";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 h-full py-6 px-4 border border-slate-200 dark:border-slate-800">
          <span>مرتب‌سازی: {getActiveLabel()}</span>
          {getSortIcon(sortField)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>مرتب‌سازی بر اساس</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => toggleSort("name")} className="flex items-center cursor-pointer">
          {getFieldIcon("name")}
          <span>نام</span>
          {getSortIcon("name")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleSort("height")} className="flex items-center cursor-pointer">
          {getFieldIcon("height")}
          <span>قد</span>
          {getSortIcon("height")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleSort("weight")} className="flex items-center cursor-pointer">
          {getFieldIcon("weight")}
          <span>وزن</span>
          {getSortIcon("weight")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleSort("progress")} className="flex items-center cursor-pointer">
          {getFieldIcon("progress")}
          <span>پیشرفت</span>
          {getSortIcon("progress")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
