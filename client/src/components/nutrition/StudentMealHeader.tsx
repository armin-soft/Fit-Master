
import React from "react";
import { Salad } from "lucide-react";

interface StudentMealHeaderProps {
  studentName: string;
}

const StudentMealHeader: React.FC<StudentMealHeaderProps> = ({ studentName }) => {
  return (
    <div className="px-6 py-4 border-b bg-white dark:bg-gray-800/50 shadow-sm shrink-0 text-right">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-md">
              <Salad className="h-5 w-5 text-white" />
            </div>
            <div className="text-right">
              <h2 className="text-lg font-bold text-foreground">تخصیص برنامه</h2>
              <p className="text-sm font-medium text-muted-foreground">{studentName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMealHeader;
