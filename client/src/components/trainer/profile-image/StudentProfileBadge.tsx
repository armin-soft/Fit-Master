
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export const StudentProfileBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="absolute -bottom-2 -right-1"
    >
      <Badge className="bg-gradient-to-r from-emerald-500 to-sky-500 border-none text-white px-2 py-0.5 text-xs">
        شاگرد
      </Badge>
    </motion.div>
  );
};
