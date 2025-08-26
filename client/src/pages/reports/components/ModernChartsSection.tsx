
import React from "react";
import { motion } from "framer-motion";
import { useStudents } from "@/hooks/useStudents";
import { useWeeklyStats, useActivityStats } from "../hooks/useReportsData";
import { EmptyChartsState } from "./charts/EmptyChartsState";
import { GenderDistributionChart } from "./charts/GenderDistributionChart";
import { ActivityDistributionChart } from "./charts/ActivityDistributionChart";
import { WeeklyProgressChart } from "./charts/WeeklyProgressChart";
import { prepareGenderData, prepareWeeklyData } from "./charts/chartDataUtils";

export const ModernChartsSection = () => {
  const { students } = useStudents();
  const { data: weeklyStats, isLoading: weeklyLoading } = useWeeklyStats();
  const { data: activityStats, isLoading: activityLoading } = useActivityStats();
  
  const totalStudents = students.length;

  if (totalStudents === 0) {
    return <EmptyChartsState />;
  }

  // Prepare chart data with real database data
  const genderData = prepareGenderData(students);
  const activityData = Array.isArray(activityStats) ? activityStats : [];
  const weeklyData = prepareWeeklyData(Array.isArray(weeklyStats) ? weeklyStats : []);

  const isLoading = weeklyLoading || activityLoading;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mb-12"
    >
      <div className="space-y-8">
        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GenderDistributionChart data={genderData} />
          <ActivityDistributionChart data={activityData} isLoading={activityLoading} />
        </div>

        {/* Weekly Progress */}
        <WeeklyProgressChart data={weeklyData} isLoading={weeklyLoading} />
      </div>
    </motion.div>
  );
};
