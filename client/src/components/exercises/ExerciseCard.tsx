
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { Edit, Trash2, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseCardProps {
  exercise: Exercise;
  category?: ExerciseCategory;
  isSelected?: boolean;
  viewMode: "grid" | "list";
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  category,
  isSelected = false,
  viewMode,
  onClick,
  onEdit,
  onDelete,
}) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  if (viewMode === "list") {
    return (
      <motion.div 
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.2 }}
      >
        <Card 
          onClick={onClick}
          className={cn(
            "cursor-pointer hover:shadow-lg transition-all duration-300 mb-2 border-l-4",
            isSelected ? "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500 dark:border-emerald-400" : "border-transparent hover:border-emerald-300 dark:hover:border-emerald-700"
          )}
        >
          <div className="flex items-center justify-between p-3 sm:p-4">
            <div className="flex items-center gap-3 text-right">
              <div className="flex-shrink-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 dark:from-emerald-500/20 dark:to-blue-500/20 p-2 rounded-full">
                <Activity className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">{exercise.name}</h4>
                {category && (
                  <p className="text-xs text-muted-foreground">{category.name}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              {onEdit && (
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/20"
                  onClick={handleEdit}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              
              {onDelete && (
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        onClick={onClick}
        className={cn(
          "cursor-pointer overflow-hidden h-full shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100 dark:border-emerald-800/50",
          isSelected && "ring-2 ring-emerald-500 dark:ring-emerald-400"
        )}
      >
        <CardHeader className={cn(
          "p-3 pb-2 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/50 dark:to-blue-950/50",
          isSelected && "bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30"
        )}>
          <div className="flex items-center justify-between">
            <div className="bg-white/80 dark:bg-gray-800/80 p-1.5 rounded-full">
              <Activity className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            
            <div className="text-xs font-medium px-2 py-1 rounded-full bg-white/80 dark:bg-gray-800/80 text-emerald-700 dark:text-emerald-300">
              {category?.name || "دسته‌بندی نشده"}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-3 pt-2 text-center">
          <h4 className="font-medium line-clamp-2 min-h-[2.5rem]">{exercise.name}</h4>
        </CardContent>
        
        {(onEdit || onDelete) && (
          <CardFooter className="p-2 flex justify-center gap-2 border-t border-emerald-50 dark:border-emerald-900/50">
            {onEdit && (
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                onClick={handleEdit}
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
            )}
            
            {onDelete && (
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                onClick={handleDelete}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};
