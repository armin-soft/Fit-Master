
import { motion } from "framer-motion";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { usePersianDate } from "@/hooks/usePersianDate";
import { HeaderProfile } from "./components/HeaderProfile";
import { HeaderTimeDate } from "./components/HeaderTimeDate";
import { getGreeting } from "./utils/timeUtils";

interface DashboardHeaderNewProps {
  trainerProfile: {
    name: string;
    image: string;
  };
  totalStudents: number;
}

export const DashboardHeaderNew = ({ trainerProfile, totalStudents }: DashboardHeaderNewProps) => {
  const currentTime = useCurrentTime();
  const persianDate = usePersianDate();
  const greeting = getGreeting(currentTime);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="relative overflow-hidden rounded-3xl p-8 mb-8 bg-gradient-to-l from-emerald-600 to-sky-600"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-white">
        <HeaderProfile 
          trainerProfile={trainerProfile}
          totalStudents={totalStudents}
          greeting={greeting}
        />
        
        <HeaderTimeDate 
          currentTime={currentTime}
          persianDate={persianDate}
        />
      </div>
    </motion.div>
  );
};

export default DashboardHeaderNew;
