
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Shield } from "lucide-react";

export const HeaderLogo = () => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative inline-flex items-center justify-center mb-8"
    >
      <div className="relative">
        <motion.div
          className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-emerald-600 via-sky-600 to-emerald-700 rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden"
          whileHover={{ scale: 1.05, rotateY: 15 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src="/Assets/Image/Icon.svg"
            alt="لوگوی فیت مستر"
            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-cover rounded-lg"
            onError={(e) => {
              console.log('Logo load error, using placeholder');
              e.currentTarget.src = "/Assets/Image/Place-Holder.svg";
            }}
          />
        </motion.div>
        
        {/* نشان‌های کناری */}
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-3 h-3 text-white" />
        </motion.div>
        
        <motion.div
          className="absolute -bottom-2 -left-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-lg"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Shield className="w-3 h-3 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
};
