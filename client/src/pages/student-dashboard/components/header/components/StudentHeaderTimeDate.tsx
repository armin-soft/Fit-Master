
import { motion } from "framer-motion";
import { Clock, Calendar, Sun, Moon, CloudSun, Sunrise, Sunset } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentHeaderTimeDateProps {
  currentTime: Date;
  persianDate: string;
}

export const StudentHeaderTimeDate = ({ currentTime, persianDate }: StudentHeaderTimeDateProps) => {
  const formatTimeWithSeconds = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return toPersianNumbers(`${hours}:${minutes}:${seconds}`);
  };

  const getTimeIcon = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 0 && hour < 6) return Moon;
    if (hour >= 6 && hour < 8) return Sunrise;
    if (hour >= 8 && hour < 12) return Sun;
    if (hour >= 12 && hour < 17) return CloudSun;
    if (hour >= 17 && hour < 19) return Sunset;
    return Moon;
  };

  const TimeIcon = getTimeIcon();

  return (
    <div className="flex flex-col items-center lg:items-end gap-3">
      <motion.div 
        className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <TimeIcon className="h-5 w-5 text-white/90" />
          </motion.div>
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
      
      <motion.div 
        className="bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-white/80" />
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
    </div>
  );
};
