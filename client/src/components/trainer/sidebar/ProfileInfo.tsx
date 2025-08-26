
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ProfileInfoProps {
  name?: string;
}

export const ProfileInfo = ({ name }: ProfileInfoProps) => {
  return (
    <motion.div
      className="text-center space-y-1.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="font-bold text-lg bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-100 dark:to-white bg-clip-text text-transparent">
        {name || "نام مربی"}
      </h3>
      <div className="flex justify-center gap-1.5">
        <Badge variant="outline" className="text-xs bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
          مربی
        </Badge>
        <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
          فعال
        </Badge>
      </div>
    </motion.div>
  );
};
