
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  VisuallyHidden
} from "@/components/ui/dialog";
import { Student } from "@/components/students/StudentTypes";
import { motion, AnimatePresence } from "framer-motion";
import { StudentDialogContent } from "@/components/students/form-components";

interface StudentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: StudentFormData) => void;
  student?: Student;
}

interface StudentFormData {
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;

}

export const StudentDialog = ({
  isOpen,
  onClose,
  onSave,
  student,
}: StudentDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[95vh] overflow-y-auto w-full p-0 rounded-2xl border-0 shadow-2xl">
        <DialogTitle className="sr-only">
          {student ? "ویرایش شاگرد" : "افزودن شاگرد جدید"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          فرم {student ? "ویرایش اطلاعات" : "ثبت"} شاگرد جدید
        </DialogDescription>
        <AnimatePresence mode="wait">
          <StudentDialogContent 
            student={student}
            onSave={onSave}
            onCancel={onClose}
          />
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
