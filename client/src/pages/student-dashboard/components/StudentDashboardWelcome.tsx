
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useStudentData } from "../hooks/useStudentData";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { usePersianDate } from "@/hooks/usePersianDate";
import { useStudentProfile } from "../hooks/useStudentProfile";
import { getMotivationalQuote } from "../utils/motivationalQuotes";
import { ProfileSection } from "./welcome/ProfileSection";
import { DateTimeSection } from "./welcome/DateTimeSection";
import { AchievementBadges } from "./welcome/AchievementBadges";

export const StudentDashboardWelcome: React.FC = () => {
  const { studentData, loading } = useStudentData();
  const currentTime = useCurrentTime();
  const persianDate = usePersianDate();
  const { profileImageSrc } = useStudentProfile();

  const motivationalQuote = getMotivationalQuote();

  if (loading) {
    return (
      <Card className="p-8 bg-gradient-to-br from-emerald-500 via-sky-500 to-emerald-600 text-white">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/20 rounded w-3/4"></div>
          <div className="h-4 bg-white/20 rounded w-1/2"></div>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-sky-500 to-emerald-600 border-none shadow-2xl">
        {/* تأثیرات پس‌زمینه */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-xl" />
        </div>

        <div className="relative z-10 p-8 text-white">
          {/* ردیف بالا - پروفایل و تاریخ/زمان */}
          <div className="flex items-center justify-between mb-8">
            {/* بخش راست - پروفایل و سلام */}
            <ProfileSection
              studentName={studentData.name}
              profileImageSrc={profileImageSrc}
              currentTime={currentTime}
              motivationalQuote={motivationalQuote}
            />
            
            {/* بخش چپ - تاریخ و زمان */}
            <DateTimeSection
              currentTime={currentTime}
              persianDate={persianDate}
            />
          </div>

          {/* نشان‌های دستاورد */}
          <AchievementBadges
            weeklyProgress={studentData.weeklyProgress}
            exerciseStreak={studentData.exerciseStreak}
          />
        </div>
      </Card>
    </motion.div>
  );
};
