
import React from "react";
import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import { getOperatorInfo } from "@/lib/utils/operatorUtils";

interface OperatorDisplayProps {
  phone: string;
}

export const OperatorDisplay = ({ phone }: OperatorDisplayProps) => {
  const operatorInfo = phone.length >= 4 ? getOperatorInfo(phone) : null;

  if (!operatorInfo || phone.length < 4) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-3"
    >
      <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${operatorInfo.bgColor} border border-opacity-30`}>
        <Smartphone className={`h-4 w-4 ${operatorInfo.color}`} />
        <span className={`text-sm font-semibold ${operatorInfo.color}`}>
          {operatorInfo.name}
        </span>
      </div>
    </motion.div>
  );
};
