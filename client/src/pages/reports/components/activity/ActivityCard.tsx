
import React from "react";
import { motion } from "framer-motion";
import { Clock, LucideIcon } from "lucide-react";

interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  time: Date;
  icon: LucideIcon;
  color: string;
  priority: string;
}

interface ActivityCardProps {
  activity: Activity;
  index: number;
  getTimeAgo: (date: Date) => string;
  getPriorityColor: (priority: string) => string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  index,
  getTimeAgo,
  getPriorityColor
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
      className={`group relative border-r-4 ${getPriorityColor(activity.priority)} rounded-lg transition-all duration-300 hover:shadow-md`}
    >
      <div className="flex items-start gap-4 p-4">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`flex-shrink-0 p-3 bg-gradient-to-r ${activity.color} rounded-xl shadow-lg`}
        >
          <activity.icon className="h-5 w-5 text-white" />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-200">
                {activity.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                {activity.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="h-3 w-3" />
            <span>{getTimeAgo(activity.time)}</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full" />
            <span className="capitalize">{activity.type.replace('_', ' ')}</span>
          </div>
        </div>
        
        {/* Priority Indicator */}
        <div className={`w-2 h-2 rounded-full ${
          activity.priority === 'high' ? 'bg-emerald-400' :
          activity.priority === 'medium' ? 'bg-yellow-400' : 'bg-sky-400'
        } group-hover:scale-125 transition-transform duration-200`} />
      </div>

      {/* Hover Effect Line */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-500 to-primary group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
};
