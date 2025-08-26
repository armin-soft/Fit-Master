
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentHeaderProfileProps {
  studentProfile: {
    name: string;
    image: string;
  };
  overallProgress: number;
  greeting: string;
}

export const StudentHeaderProfile = ({ studentProfile, overallProgress, greeting }: StudentHeaderProfileProps) => {
  return (
    <div className="flex items-center gap-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      >
        <Avatar className="h-20 w-20 border-4 border-white/20 shadow-lg">
          <AvatarImage src={studentProfile.image} alt={studentProfile.name} />
          <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
            {studentProfile.name.charAt(0) || 'ش'}
          </AvatarFallback>
        </Avatar>
      </motion.div>

      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-2">
            {greeting}، {studentProfile.name}!
          </h1>
          <p className="text-white/80 mb-4 text-lg">
            برای رسیدن به اهدافتان تلاش کنید!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <div className="flex justify-between items-center">
            <span className="text-white/90 text-sm font-medium">پیشرفت کلی</span>
            <span className="text-white font-bold text-sm">
              {toPersianNumbers(overallProgress.toString())}%
            </span>
          </div>
          <Progress 
            value={overallProgress} 
            className="h-3 bg-white/20"
            indicatorClassName="bg-gradient-to-r from-yellow-400 to-yellow-600"
          />
        </motion.div>
      </div>
    </div>
  );
};
