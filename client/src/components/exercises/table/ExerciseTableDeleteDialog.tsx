
import React from "react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Exercise } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Trash2, Check } from "lucide-react";

interface ExerciseTableDeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  exercisesToDelete: number[];
  exercises: Exercise[];
  onConfirmDelete: () => void;
}

export const ExerciseTableDeleteDialog: React.FC<ExerciseTableDeleteDialogProps> = ({
  isOpen,
  onOpenChange,
  exercisesToDelete,
  exercises,
  onConfirmDelete
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[90%] w-[450px] text-right" dir="rtl">
        <AlertDialogHeader className="space-y-3">
          <div className="flex items-center justify-center">
            <div className="p-3 rounded-full bg-red-100">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <AlertDialogTitle className="text-center text-xl">تأیید حذف</AlertDialogTitle>
          <AlertDialogDescription className="whitespace-pre-line max-h-[40vh] overflow-auto text-center">
            {exercisesToDelete.length === 1 ? (
              `آیا از حذف حرکت «${exercises.find(ex => ex.id === exercisesToDelete[0])?.name}» اطمینان دارید؟`
            ) : (
              `آیا از حذف ${toPersianNumbers(exercisesToDelete.length)} حرکت زیر اطمینان دارید؟\n\n${
                exercisesToDelete
                  .map((id, index) => {
                    const exercise = exercises.find(ex => ex.id === id);
                    return `${toPersianNumbers(index + 1)}. ${exercise?.name}`;
                  })
                  .join('\n')
              }`
            )}
            {'\n\n'}
            <span className="text-red-500 font-bold">این عملیات قابل بازگشت نیست.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row space-x-2 space-x-reverse">
          <AlertDialogCancel className="flex-1 border-gray-300 hover:bg-gray-100">انصراف</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirmDelete}
            className="flex-1 bg-red-600 text-white hover:bg-red-700"
          >
            <Trash2 className="ml-2 h-4 w-4" />
            حذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ExerciseTableDeleteDialog;
