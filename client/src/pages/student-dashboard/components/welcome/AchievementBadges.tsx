
import React from "react";
import { motion } from "framer-motion";
import { Target, Award, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface AchievementBadgesProps {
  weeklyProgress: number;
  exerciseStreak: number;
}

export const AchievementBadges: React.FC<AchievementBadgesProps> = ({
  weeklyProgress,
  exerciseStreak
}) => {
  return (
    <motion.div 
      className="flex flex-wrap items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <Badge className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-white border-yellow-300/30 hover:from-yellow-400/30 hover:to-orange-400/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
        <Target className="w-4 h-4 ml-2" />
        پیشرفت هفتگی: {toPersianNumbers(weeklyProgress.toString())}%
      </Badge>
      
      <Badge className="bg-gradient-to-r from-green-400/20 to-emerald-400/20 text-white border-green-300/30 hover:from-green-400/30 hover:to-emerald-400/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
        <Award className="w-4 h-4 ml-2" />
        استریک: {toPersianNumbers(exerciseStreak.toString())} روز
      </Badge>
      
      <Badge className="bg-gradient-to-r from-blue-400/20 to-purple-400/20 text-white border-blue-300/30 hover:from-blue-400/30 hover:to-purple-400/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
        <TrendingUp className="w-4 h-4 ml-2" />
        روند صعودی
      </Badge>
    </motion.div>
  );
};
