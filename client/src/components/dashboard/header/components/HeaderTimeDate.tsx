
import { motion } from "framer-motion";
import { 
  Moon,
  CloudMoon,
  Sunrise,
  Sun,
  CloudSun,
  Sunset,
  CloudRain,
  Snowflake
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface HeaderTimeDateProps {
  currentTime: Date;
  persianDate: string;
}

export const HeaderTimeDate = ({ currentTime, persianDate }: HeaderTimeDateProps) => {
  const formatTimeWithSeconds = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return toPersianNumbers(`${hours}:${minutes}:${seconds}`);
  };

  const getTimeIcon = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 0 && hour < 3) return Moon;
    if (hour >= 3 && hour < 5) return CloudMoon;
    if (hour >= 5 && hour < 6) return Sunrise;
    if (hour >= 6 && hour < 8) return Sunrise;
    if (hour >= 8 && hour < 11) return Sun;
    if (hour >= 11 && hour < 12) return Sun;
    if (hour >= 12 && hour < 14) return Sun;
    if (hour >= 14 && hour < 17) return CloudSun;
    if (hour >= 17 && hour < 19) return Sunset;
    if (hour >= 19 && hour < 20) return Sunset;
    if (hour >= 20 && hour < 22) return CloudRain;
    return CloudMoon;
  };

  const getSeasonIcon = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    
    if ((month >= 3 && month <= 5)) return Sun;
    if ((month >= 6 && month <= 8)) return Sun;
    if ((month >= 9 && month <= 11)) return CloudSun;
    return Snowflake;
  };

  const TimeIcon = getTimeIcon();
  const SeasonIcon = getSeasonIcon();

  return (
    <div className="flex flex-col gap-4">
      <motion.div 
        className="bg-white/15 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <TimeIcon className="w-5 h-5 text-white/80" />
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
        className="bg-white/15 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <SeasonIcon className="w-5 h-5 text-white/80" />
          </motion.div>
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
