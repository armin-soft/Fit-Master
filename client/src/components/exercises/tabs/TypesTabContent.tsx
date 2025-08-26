
import { motion } from "framer-motion";
import { ExerciseTypes } from "@/components/exercises/ExerciseTypes";
import { ExerciseCategory, ExerciseType } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";

interface TypesTabContentProps {
  exerciseTypes: ExerciseType[] | string[];
  selectedType: ExerciseType | string;
  onSelectType: (type: ExerciseType | string) => void;
  onAddType: () => void;
  onEditType: (type: ExerciseType | string) => void;
  onDeleteType: (type: ExerciseType | string) => void;
  categories: ExerciseCategory[];
}

export const TypesTabContent = ({
  exerciseTypes,
  selectedType,
  onSelectType,
  onAddType,
  onEditType,
  onDeleteType,
  categories
}: TypesTabContentProps) => {
  const { toast } = useToast();

  const handleDeleteType = (type: ExerciseType | string) => {
    const typeName = typeof type === 'object' ? type.name : type;
    if (categories.some(cat => cat.type === typeName)) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "ابتدا باید تمام دسته بندی های این نوع حرکت را حذف کنید"
      });
      return;
    }
    onDeleteType(type);
  };

  return (
    <motion.div 
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl border border-white/20 dark:border-slate-700/20 shadow-lg p-4 flex-shrink-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ExerciseTypes
        types={exerciseTypes}
        selectedType={selectedType}
        onSelectType={onSelectType}
        onAddType={onAddType}
        onEditType={onEditType}
        onDeleteType={handleDeleteType}
      />
    </motion.div>
  );
};
