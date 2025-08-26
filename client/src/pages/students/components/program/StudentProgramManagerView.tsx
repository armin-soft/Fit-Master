
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { PageContainer } from "@/components/ui/page-container";
import { useDeviceInfo } from "@/hooks/use-mobile";
import StudentProgramManager from "@/components/students/program/StudentProgramManager";
import { ExerciseWithSets } from "@/types/exercise";

interface StudentProgramManagerViewProps {
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: any[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], studentId: number, dayNumber?: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => boolean;
  onClose: () => void;
}

const StudentProgramManagerView: React.FC<StudentProgramManagerViewProps> = ({
  student,
  exercises,
  meals,
  supplements,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements,
  onClose
}) => {
  const deviceInfo = useDeviceInfo();
  
  // تعیین پدینگ مناسب براساس نوع دستگاه
  const getContentPadding = () => {
    if (deviceInfo.isMobile) return "px-2";
    if (deviceInfo.isTablet) return "px-4";
    return "px-4 sm:px-6 lg:px-8";
  };

  return (
    <div dir="rtl" className="w-full h-full">
      <PageContainer withBackground fullHeight className="w-full overflow-hidden">
        <div className={`w-full h-full flex flex-col mx-auto ${getContentPadding()} py-3 sm:py-4 md:py-6 text-right`} dir="rtl">
          <StudentProgramManager 
            student={student}
            exercises={exercises}
            meals={meals}
            supplements={supplements}
            onSaveExercises={(exercisesWithSets, dayNumber) => 
              onSaveExercises(exercisesWithSets, student.id, dayNumber)
            }
            onSaveDiet={(mealIds, dayNumber) => 
              onSaveDiet(mealIds, student.id, dayNumber)
            }
            onSaveSupplements={(data) => 
              onSaveSupplements(data, student.id)
            }
            onClose={onClose}
          />
        </div>
      </PageContainer>
    </div>
  );
};

export default StudentProgramManagerView;
