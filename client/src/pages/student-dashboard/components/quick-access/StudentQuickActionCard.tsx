
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LucideIcon, ArrowLeft } from "lucide-react";

interface StudentQuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: "brand" | "info" | "orange" | "brand-info" | "info-brand" | "teal";
  path: string;
}

export const StudentQuickActionCard = ({ title, description, icon: Icon, color, path }: StudentQuickActionCardProps) => {
  const navigate = useNavigate();

  const colorClasses = {
    brand: {
      bg: "from-emerald-500 to-emerald-600",
      hover: "hover:from-emerald-600 hover:to-emerald-700",
      icon: "text-emerald-500"
    },
    info: {
      bg: "from-sky-500 to-sky-600",
      hover: "hover:from-sky-600 hover:to-sky-700", 
      icon: "text-sky-500"
    },
    orange: {
      bg: "from-orange-500 to-orange-600",
      hover: "hover:from-orange-600 hover:to-orange-700",
      icon: "text-orange-500"
    },
    "brand-info": {
      bg: "from-emerald-500 to-sky-600",
      hover: "hover:from-emerald-600 hover:to-sky-700",
      icon: "text-emerald-500"
    },
    "info-brand": {
      bg: "from-sky-500 to-emerald-600",
      hover: "hover:from-sky-600 hover:to-emerald-700",
      icon: "text-sky-500"
    },
    teal: {
      bg: "from-emerald-500 to-teal-600",
      hover: "hover:from-emerald-600 hover:to-teal-700",
      icon: "text-emerald-500"
    }
  };

  const handleClick = () => {
    navigate(path);
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-700/50 cursor-pointer group"
      style={{ boxShadow: 'var(--shadow-soft)' }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
    >
      <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
        <div className={`w-full h-full rounded-full bg-gradient-to-br ${colorClasses[color].bg}`} />
      </div>
      
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-2xl bg-gray-50 dark:bg-gray-800`}>
            <Icon className={`h-6 w-6 ${colorClasses[color].icon}`} />
          </div>
          <ArrowLeft className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
