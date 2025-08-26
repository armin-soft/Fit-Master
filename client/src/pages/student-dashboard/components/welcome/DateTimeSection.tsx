
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { formatTimeWithSeconds } from "../../utils/timeFormatters";

interface DateTimeSectionProps {
  currentTime: Date;
  persianDate: string;
}

export const DateTimeSection: React.FC<DateTimeSectionProps> = ({
  currentTime,
  persianDate
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* تاریخ */}
      <motion.div 
        className="bg-white/15 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-white/80" />
          <div className="text-right">
            <div 
              className="text-sm font-medium"
              style={{ fontFamily: 'Vazir, sans-serif' }}
            >
              {persianDate}
            </div>
            <div className="text-xs text-white/70">
              تاریخ امروز
            </div>
          </div>
        </div>
      </motion.div>

      {/* زمان زنده */}
      <motion.div 
        className="bg-white/15 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-white/80" />
          <div className="text-right">
            <motion.div 
              className="text-xl font-bold"
              key={formatTimeWithSeconds(currentTime)}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              style={{ fontFamily: 'Vazir, sans-serif' }}
            >
              {formatTimeWithSeconds(currentTime)}
            </motion.div>
            <div className="text-xs text-white/70">
              زمان فعلی
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
