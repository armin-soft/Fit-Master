
import React from "react";
import { motion } from "framer-motion";
import { ModernReportsContainer } from "./components/ModernReportsContainer";
import { ModernReportsHeader } from "./components/ModernReportsHeader";
import { ModernReportsContent } from "./components/ModernReportsContent";

const ReportsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      <ModernReportsContainer>
        <ModernReportsHeader />
        <ModernReportsContent />
      </ModernReportsContainer>
    </motion.div>
  );
};

export default ReportsPage;
