
import React from "react";
import { motion } from "framer-motion";
import { Save, Check, Loader } from "lucide-react";

interface ProfileSaveButtonProps {
  onSave: () => void;
  isLoading: boolean;
}

export const ProfileSaveButton: React.FC<ProfileSaveButtonProps> = ({
  onSave,
  isLoading
}) => {
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave();
  };

  return (
    <motion.button
      type="button"
      onClick={handleSave}
      disabled={isLoading}
      className="w-full h-16 bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
      whileHover={!isLoading ? { scale: 1.02 } : {}}
      whileTap={!isLoading ? { scale: 0.98 } : {}}
    >
      {/* تأثیر درخشش پس‌زمینه */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
        animate={{ x: isLoading ? [-100, 400] : 0 }}
        transition={{ 
          duration: 1.5, 
          repeat: isLoading ? Infinity : 0,
          ease: "linear"
        }}
      />
      
      <div className="relative z-10 flex items-center justify-center gap-3">
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader className="w-6 h-6" />
            </motion.div>
            <span>در حال ذخیره...</span>
          </>
        ) : (
          <>
            <Save className="w-6 h-6" />
            <span>ذخیره اطلاعات</span>
          </>
        )}
      </div>
    </motion.button>
  );
};
