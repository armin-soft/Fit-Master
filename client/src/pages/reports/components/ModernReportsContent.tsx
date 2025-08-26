
import React from "react";
import { motion } from "framer-motion";
import { ModernStatsGrid } from "./ModernStatsGrid";
import { ModernChartsSection } from "./ModernChartsSection";
import { ModernActivityFeed } from "./ModernActivityFeed";
import { QuickAccessSection } from "@/components/dashboard/QuickAccessSection";

export const ModernReportsContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="space-y-8"
    >
      {/* Statistics Overview */}
      <ModernStatsGrid />
      
      {/* Quick Access Section */}
      <QuickAccessSection />
      
      {/* Charts and Analytics */}
      <ModernChartsSection />
      
      {/* Recent Activities */}
      <ModernActivityFeed />
    </motion.div>
  );
};
