
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentGridView } from "@/components/students/list-views/StudentGridView";
import { StudentTableView } from "@/components/students/list-views/StudentTableView";
import { DataStatusIndicator } from "@/components/students/DataStatusIndicator";
import { Student } from "@/components/students/StudentTypes";

interface MainStudentTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  students: Student[];
  viewMode: "grid" | "table";
  searchQuery: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  selectedStudents: number[];
  onStudentSelect: (studentId: number) => void;
  onStudentSelectAll: () => void;
  onClearSelection: () => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (student: Student) => void;
  onViewStudentHistory: (student: Student) => void;
  onManageStudentProgram: (student: Student) => void;
  lastRefreshTime: Date;
  onRefresh: () => void;
  onAddStudent: () => void;
  isProfileComplete: boolean;
}

export const MainStudentTabs: React.FC<MainStudentTabsProps> = ({
  activeTab,
  onTabChange,
  students,
  viewMode,
  searchQuery,
  sortBy,
  sortOrder,
  selectedStudents,
  onStudentSelect,
  onStudentSelectAll,
  onClearSelection,
  onEditStudent,
  onDeleteStudent,
  onViewStudentHistory,
  onManageStudentProgram,
  lastRefreshTime,
  onRefresh,
  onAddStudent,
  isProfileComplete
}) => {
  // Filter students by gender and search
  const getFilteredStudents = (genderFilter?: "male" | "female") => {
    return students
      .filter(student => !genderFilter || student.gender === genderFilter)
      .filter(student =>
        (student.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (student.phone || '').toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const sortByValue = sortBy === 'name' ? 'name' : 'name';
        const aValue = (a.name || '').toString().toLowerCase();
        const bValue = (b.name || '').toString().toLowerCase();

        if (aValue < bValue) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
  };

  const allStudents = getFilteredStudents();
  const maleStudents = getFilteredStudents("male");
  const femaleStudents = getFilteredStudents("female");

  const handleClearSearch = () => {
    // Clear search functionality
  };

  const renderStudentView = (studentList: Student[]) => {
    if (viewMode === "grid") {
      return (
        <StudentGridView
          students={studentList}
          searchQuery={searchQuery}
          onEdit={onEditStudent}
          onDelete={(id: number) => {
            const student = studentList.find(s => s.id === id);
            if (student) onDeleteStudent(student);
          }}
          onAddExercise={onManageStudentProgram}
          onAddDiet={onManageStudentProgram}
          onAddSupplement={onManageStudentProgram}
          onAddStudent={onAddStudent}
          onClearSearch={handleClearSearch}
          isProfileComplete={isProfileComplete}
        />
      );
    } else {
      return (
        <StudentTableView
          students={studentList}
          sortedAndFilteredStudents={studentList}
          searchQuery={searchQuery}
          isProfileComplete={isProfileComplete}
          onEdit={onEditStudent}
          onDelete={(id: number) => {
            const student = studentList.find(s => s.id === id);
            if (student) onDeleteStudent(student);
          }}
          onAddExercise={onManageStudentProgram}
          onAddDiet={onManageStudentProgram}
          onAddSupplement={onManageStudentProgram}
          onAddStudent={onAddStudent}
          onClearSearch={handleClearSearch}
          viewMode="table"
        />
      );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">همه ({allStudents.length})</TabsTrigger>
            <TabsTrigger value="male">آقایان ({maleStudents.length})</TabsTrigger>
            <TabsTrigger value="female">بانوان ({femaleStudents.length})</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="mr-4">
          <DataStatusIndicator 
            lastRefreshTime={lastRefreshTime}
            onRefresh={onRefresh}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={onTabChange} className="flex-1 flex flex-col">
        <TabsContent value="all" className="flex-1 mt-0">
          {renderStudentView(allStudents)}
        </TabsContent>
        
        <TabsContent value="male" className="flex-1 mt-0">
          {renderStudentView(maleStudents)}
        </TabsContent>
        
        <TabsContent value="female" className="flex-1 mt-0">
          {renderStudentView(femaleStudents)}
        </TabsContent>
      </Tabs>
    </div>
  );
};
