
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentStatsCards } from "@/components/students/StudentStatsCards";
import { StudentDialogManager, StudentDialogManagerRef } from "@/components/students/StudentDialogManager";
import { useStudents } from "@/hooks/students"; 
import { useStudentFiltering } from "@/hooks/useStudentFiltering";
import { Student } from "@/components/students/StudentTypes";
import { PageContainer } from "@/components/ui/page-container";
import { Button } from "@/components/ui/button";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { History } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import from the correct paths
import StudentProgramManagerView from "./students/components/program/StudentProgramManagerView";
import StudentSearchControls from "./students/components/StudentSearchControls";
// Import from the list-views folder instead of local components
import { StudentTableView } from "@/components/students/list-views";
import { useStudentRefresh } from "@/hooks/useStudentRefresh"; 
import { useStudentEvents } from "./students/hooks/useStudentEvents";
import { useStudentHistory } from "@/hooks/useStudentHistory";

const StudentsPage = () => {
  const dialogManagerRef = useRef<StudentDialogManagerRef>(null);
  const [selectedStudentForProgram, setSelectedStudentForProgram] = useState<Student | null>(null);
  const [activeGenderTab, setActiveGenderTab] = useState<string>("all");
  const deviceInfo = useDeviceInfo();
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  
  // Check if profile is complete on component mount
  useEffect(() => {
    const checkProfileCompleteness = async () => {
      try {
        const { getStorageItem } = await import('@/utils/databaseStorage');
        const savedProfile = await getStorageItem('trainerProfile', null);
        if (savedProfile) {
          setIsProfileComplete(Boolean(
            (savedProfile as any).name && 
            (savedProfile as any).phone && 
            (savedProfile as any).gymName && 
            (savedProfile as any).gymAddress && 
            (savedProfile as any).bio && 
            (savedProfile as any).gymDescription
          ));
        } else {
          setIsProfileComplete(false);
        }
      } catch (error) {
        console.error('Error checking profile completeness:', error);
        setIsProfileComplete(false);
      }
    };
    checkProfileCompleteness();
  }, []);
  
  const {
    students,
    exercises,
    meals,
    supplements,
    handleDelete,
    handleSave,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements
  } = useStudents();
  
  const { refreshTrigger, triggerRefresh, lastRefresh } = useStudentRefresh();
  const { addHistoryEntry } = useStudentHistory();

  const {
    handleSaveWithHistory,
    handleSaveExercisesWithHistory,
    handleSaveDietWithHistory,
    handleSaveSupplementsWithHistory,
    handleDeleteWithHistory
  } = useStudentEvents(
    handleSave as any,
    handleSaveExercises as any,
    handleSaveDiet as any,
    handleSaveSupplements as any,
    handleDelete,
    addHistoryEntry,
    triggerRefresh,
    students,
    selectedStudentForProgram
  );

  const {
    searchQuery,
    setSearchQuery,
    sortedAndFilteredStudents,
    sortField,
    sortOrder,
    toggleSort,
    handleClearSearch
  } = useStudentFiltering(students);

  // Filter students by gender
  const filteredStudentsByGender = React.useMemo(() => {
    let filtered = sortedAndFilteredStudents;
    
    if (activeGenderTab === "male") {
      filtered = filtered.filter(student => student.gender === "male");
    } else if (activeGenderTab === "female") {
      filtered = filtered.filter(student => student.gender === "female");
    }
    
    return filtered;
  }, [sortedAndFilteredStudents, activeGenderTab]);

  // Handler for opening the program manager
  const handleOpenProgramManager = (student: Student) => {
    setSelectedStudentForProgram(student);
  };

  // Handler for toggling student access
  const handleToggleAccess = async (student: Student) => {
    try {
      console.log('handleToggleAccess called for student:', student.name, 'Current isActive:', student.isActive);
      
      const newStatus = !student.isActive;
      console.log('New status will be:', newStatus);
      
      const response = await fetch(`/api/students/${student.id}/access`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: newStatus }),
      });

      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error('Failed to update student access');
      }

      const updatedStudent = await response.json();
      console.log('Updated student:', updatedStudent);

      // Add history entry
      addHistoryEntry({
        id: Date.now(),
        timestamp: Date.now(),
        studentId: student.id,
        studentName: student.name,
        studentImage: student.image,
        action: 'access_changed',
        type: 'edit',
        description: `دسترسی شاگرد ${student.name} ${newStatus ? 'فعال' : 'غیرفعال'} شد`,
        details: JSON.stringify({ isActive: newStatus })
      });

      // Force refresh by fetching fresh data
      triggerRefresh();
      
      // Also dispatch event to update other components
      window.dispatchEvent(new CustomEvent('studentsUpdated'));
      console.log('Access toggle completed successfully');
    } catch (error) {
      console.error('Error toggling student access:', error);
    }
  };

  // Determine the appropriate classes based on device type
  const getContentPadding = () => {
    if (deviceInfo.isMobile) return "px-2";
    if (deviceInfo.isTablet) return "px-4";
    return "px-4 sm:px-6 lg:px-8";
  };

  // Count students by gender
  const maleStudentsCount = students.filter(s => s.gender === "male").length;
  const femaleStudentsCount = students.filter(s => s.gender === "female").length;

  // If a student is selected for program management, show the program manager
  if (selectedStudentForProgram) {
    return (
      <StudentProgramManagerView 
        student={selectedStudentForProgram}
        exercises={exercises}
        meals={meals}
        supplements={supplements}
        onSaveExercises={handleSaveExercisesWithHistory}
        onSaveDiet={handleSaveDietWithHistory}
        onSaveSupplements={handleSaveSupplementsWithHistory}
        onClose={() => setSelectedStudentForProgram(null)}
      />
    );
  }

  return (
    <PageContainer withBackground fullHeight className="w-full overflow-hidden">
      <div className={`w-full h-full flex flex-col mx-auto ${getContentPadding()} py-3 sm:py-4 md:py-6`}>
        <div className="flex justify-between items-center">
          <StudentsHeader 
            onAddStudent={() => dialogManagerRef.current?.handleAdd()} 
            onRefresh={triggerRefresh}
            lastRefreshTime={lastRefresh}
          />
          
          <Link to="/Management/Student-History">
            <Button variant="outline" className="flex items-center gap-2 bg-gradient-to-r from-brand-500 to-info-500 text-white border-0 hover:from-brand-600 hover:to-info-600">
              <History className="h-4 w-4" />
              <span>تاریخچه</span>
            </Button>
          </Link>
        </div>
        
        <StudentStatsCards students={students} />
        
        <div className="w-full mt-4 md:mt-6 flex-1 flex flex-col">
          <div className="flex justify-end mb-4 md:mb-6">
            <StudentSearchControls 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleClearSearch={handleClearSearch}
            />
          </div>
          
          {/* Gender Tabs */}
          <Tabs value={activeGenderTab} onValueChange={setActiveGenderTab} className="w-full mb-4">
            <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-brand-50 to-info-50 dark:from-brand-950/30 dark:to-info-950/30">
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500 data-[state=active]:to-info-500 data-[state=active]:text-white">همه ({students.length})</TabsTrigger>
              <TabsTrigger value="male" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500 data-[state=active]:to-info-500 data-[state=active]:text-white">آقایان ({maleStudentsCount})</TabsTrigger>
              <TabsTrigger value="female" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500 data-[state=active]:to-info-500 data-[state=active]:text-white">بانوان ({femaleStudentsCount})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <StudentTableView 
                students={students}
                sortedAndFilteredStudents={sortedAndFilteredStudents}
                searchQuery={searchQuery}
                refreshTrigger={refreshTrigger}
                onEdit={(student) => dialogManagerRef.current?.handleEdit(student)}
                onDelete={handleDeleteWithHistory}
                onAddExercise={handleOpenProgramManager}
                onAddDiet={handleOpenProgramManager}
                onAddSupplement={handleOpenProgramManager}
                onToggleAccess={handleToggleAccess}
                onAddStudent={() => dialogManagerRef.current?.handleAdd()}
                onClearSearch={handleClearSearch}
                viewMode="table"
                isProfileComplete={isProfileComplete}
                sortField={sortField}
                sortOrder={sortOrder}
                onSortChange={toggleSort}
              />
            </TabsContent>
            
            <TabsContent value="male" className="mt-4">
              <StudentTableView 
                students={students}
                sortedAndFilteredStudents={filteredStudentsByGender}
                searchQuery={searchQuery}
                refreshTrigger={refreshTrigger}
                onEdit={(student) => dialogManagerRef.current?.handleEdit(student)}
                onDelete={handleDeleteWithHistory}
                onAddExercise={handleOpenProgramManager}
                onAddDiet={handleOpenProgramManager}
                onAddSupplement={handleOpenProgramManager}
                onToggleAccess={handleToggleAccess}
                onAddStudent={() => dialogManagerRef.current?.handleAdd()}
                onClearSearch={handleClearSearch}
                viewMode="table"
                isProfileComplete={isProfileComplete}
                sortField={sortField}
                sortOrder={sortOrder}
                onSortChange={toggleSort}
              />
            </TabsContent>
            
            <TabsContent value="female" className="mt-4">
              <StudentTableView 
                students={students}
                sortedAndFilteredStudents={filteredStudentsByGender}
                searchQuery={searchQuery}
                refreshTrigger={refreshTrigger}
                onEdit={(student) => dialogManagerRef.current?.handleEdit(student)}
                onDelete={handleDeleteWithHistory}
                onAddExercise={handleOpenProgramManager}
                onAddDiet={handleOpenProgramManager}
                onAddSupplement={handleOpenProgramManager}
                onToggleAccess={handleToggleAccess}
                onAddStudent={() => dialogManagerRef.current?.handleAdd()}
                onClearSearch={handleClearSearch}
                viewMode="table"
                isProfileComplete={isProfileComplete}
                sortField={sortField}
                sortOrder={sortOrder}
                onSortChange={toggleSort}
              />
            </TabsContent>
          </Tabs>
        </div>

        <StudentDialogManager
          ref={dialogManagerRef}
          onSave={handleSaveWithHistory}
          onSaveExercises={handleSaveExercisesWithHistory}
          onSaveDiet={handleSaveDietWithHistory}
          onSaveSupplements={handleSaveSupplementsWithHistory}
          exercises={exercises}
          meals={meals}
          supplements={supplements}
        />
        
        {/* Program Manager Dialog */}
        {selectedStudentForProgram && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-7xl h-[90vh] bg-white dark:bg-slate-900 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <StudentProgramManagerView
                  student={selectedStudentForProgram}
                  exercises={exercises}
                  meals={meals}
                  supplements={supplements}
                  onSaveExercises={handleSaveExercisesWithHistory}
                  onSaveDiet={handleSaveDietWithHistory}
                  onSaveSupplements={handleSaveSupplementsWithHistory}
                  onClose={() => setSelectedStudentForProgram(null)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default StudentsPage;
