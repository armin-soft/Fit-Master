
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Supplement } from "@/types/supplement";
import { 
  FlaskConical, 
  Pill, 
  Edit2, 
  Trash2, 
  Clock, 
  Beaker,
  Tag
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface SupplementCardProps {
  supplement: Supplement;
  onEdit: () => void;
  onDelete: () => void;
}

export const SupplementCard: React.FC<SupplementCardProps> = ({
  supplement,
  onEdit,
  onDelete
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      dir="rtl"
    >
      <Card className="group relative overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-brand-400 dark:hover:border-brand-500 transition-all duration-300 shadow-lg hover:shadow-xl">
        {/* Header با آیکون نوع */}
        <div className="p-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {supplement.type === 'supplement' ? (
                <div className="w-10 h-10 bg-gradient-to-r from-brand-500 to-info-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FlaskConical className="w-5 h-5 text-white" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-gradient-to-r from-info-500 to-brand-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Pill className="w-5 h-5 text-white" />
                </div>
              )}
              <div className="text-right">
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 leading-tight">
                  {supplement.name}
                </h3>
                <Badge 
                  variant="outline" 
                  className="mt-1 text-xs bg-gradient-to-r from-brand-50 to-info-50 dark:from-brand-900/30 dark:to-info-900/30 border-brand-200 dark:border-brand-700 text-brand-700 dark:text-brand-300"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {supplement.category}
                </Badge>
              </div>
            </div>

            {/* دکمه‌های عملیات */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                className="h-8 w-8 p-0 hover:bg-info-100 dark:hover:bg-info-900/30 text-info-600 dark:text-info-400"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* محتوای اصلی */}
        <div className="px-4 pb-4 space-y-3">
          {/* دوز مصرف */}
          {supplement.dosage && (
            <div className="flex items-center justify-end gap-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50">
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                {toPersianNumbers(supplement.dosage)}
              </span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                دوز مصرف:
              </span>
              <Beaker className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          )}

          {/* زمان مصرف */}
          {supplement.timing && (
            <div className="flex items-center justify-end gap-2 p-2 bg-sky-50 dark:bg-sky-900/20 rounded-lg border border-sky-200/50 dark:border-sky-800/50">
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                {supplement.timing}
              </span>
              <span className="text-xs text-sky-700 dark:text-sky-400 font-medium">
                زمان مصرف:
              </span>
              <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            </div>
          )}
        </div>

        {/* نشانگر نوع */}
        <div className={cn(
          "absolute top-0 right-0 w-1 h-full",
          supplement.type === 'supplement' 
            ? "bg-gradient-to-b from-emerald-500 to-sky-600" 
            : "bg-gradient-to-b from-sky-500 to-emerald-600"
        )} />
      </Card>
    </motion.div>
  );
};
