
import React from "react";
import { motion } from "framer-motion";

export const HeaderDivider = () => {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
      className="mx-auto mt-8 h-px max-w-md bg-gradient-to-l from-transparent via-slate-300 dark:via-slate-600 to-transparent"
    />
  );
};
