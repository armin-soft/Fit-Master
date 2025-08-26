
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3, Trash2 } from "lucide-react";
import { Meal } from "./types";

interface MealCardProps {
  meal: Meal;
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
  index: number;
}

export const MealCard: React.FC<MealCardProps> = ({
  meal,
  onEdit,
  onDelete,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="group hover:shadow-md transition-all duration-300 bg-white/80 dark:bg-gray-800/80 border border-emerald-100/50 dark:border-emerald-800/30 hover:border-emerald-300 dark:hover:border-emerald-600 h-12">
        <CardContent className="p-2 h-full flex items-center">
          <div className="flex items-center justify-between w-full">
            <h4 className="font-medium text-sm text-gray-800 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate flex-1">
              {meal.name}
            </h4>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mr-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(meal)}
                className="h-6 w-6 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600"
              >
                <Edit3 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(meal.id)}
                className="h-6 w-6 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
