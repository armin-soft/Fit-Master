
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, VisuallyHidden } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Student } from '@/components/students/StudentTypes';
import { ExerciseWithSets } from '@/types/exercise';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ExerciseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => void;
  student: Student;
  exercises: any[];
}

export const ExerciseDialog: React.FC<ExerciseDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  student,
  exercises
}) => {
  const [selectedExercises, setSelectedExercises] = useState<ExerciseWithSets[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  
  const handleSave = () => {
    onSave(selectedExercises, selectedDay);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]" aria-describedby="exercise-dialog-description">
        <DialogTitle>برنامه تمرینی - {student.name}</DialogTitle>
        <DialogDescription id="exercise-dialog-description">
          برنامه تمرینی برای {student.name} را تنظیم کنید.
        </DialogDescription>
        
        <Tabs defaultValue="1" onValueChange={(value) => setSelectedDay(Number(value))}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="1">روز اول</TabsTrigger>
            <TabsTrigger value="2">روز دوم</TabsTrigger>
            <TabsTrigger value="3">روز سوم</TabsTrigger>
            <TabsTrigger value="4">روز چهارم</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[400px] pr-4">
            {/* Exercise selection UI would go here */}
            <div className="space-y-4">
              {exercises.map((exercise: any) => (
                <div key={exercise.id} className="p-4 border rounded-md">
                  {exercise.name}
                </div>
              ))}
            </div>
          </ScrollArea>
        </Tabs>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>انصراف</Button>
          <Button onClick={handleSave}>ذخیره برنامه</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
