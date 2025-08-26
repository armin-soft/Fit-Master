
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Dumbbell } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";

interface StudentStatBadgesProps {
  exercises?: any[];
  meals?: any[];
  supplements?: any[];
}

export const StudentStatBadges: React.FC<StudentStatBadgesProps> = ({ 
  exercises = []
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-wrap gap-2 mt-4"
    >
      <motion.div variants={item}>
        <StatBadge 
          icon={<Dumbbell className="h-3 w-3" />}
          count={exercises.length}
          label="تمرین"
          className="bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800/50 dark:text-emerald-400"
          hoverClassName="hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
        />
      </motion.div>
    </motion.div>
  );
};

interface StatBadgeProps {
  icon: React.ReactNode;
  count: number;
  label: string;
  className?: string;
  hoverClassName?: string;
}

const StatBadge: React.FC<StatBadgeProps> = ({ icon, count, label, className, hoverClassName }) => {
  return (
    <Badge 
      variant="outline" 
      className={`py-1 gap-1.5 text-xs transition-colors duration-200 ${className} ${hoverClassName}`}
    >
      <span className="flex items-center justify-center rounded-full p-0.5">
        {icon}
      </span>
      <span className="font-medium">{toPersianNumbers(count)}</span>
      <span className="opacity-80">{label}</span>
    </Badge>
  );
};
