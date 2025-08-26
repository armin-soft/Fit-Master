import React from "react";
import { motion } from "framer-motion";
import { StudentProfile } from "../../types/studentProfile";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileImageSectionProps {
  profile: StudentProfile;
  onImageChange: (image: string) => void;
}

export const ProfileImageSection: React.FC<ProfileImageSectionProps> = ({
  profile,
  onImageChange
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="text-center space-y-6"
    >
      {/* Profile Image - Read Only */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
        className="relative inline-block"
      >
        <Avatar className="w-32 h-32 mx-auto shadow-2xl border-4 border-white/50 dark:border-slate-700/50">
          <AvatarImage 
            src={profile.avatar || "/Assets/Image/Place-Holder.svg"} 
            alt={profile.name}
            className="object-cover"
          />
          <AvatarFallback className="text-4xl bg-gradient-to-br from-emerald-500 to-sky-500 text-white font-bold">
            {profile.name ? profile.name.charAt(0) : 'ش'}
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-3"
      >
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
          {profile.name}
        </h3>
        <div className="flex flex-col gap-2">
          <Badge 
            className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
            variant="secondary"
          >
            شاگرد فعال
          </Badge>
          {profile.goalType && (
            <Badge 
              className="bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300"
              variant="secondary"
            >
              {profile.goalType}
            </Badge>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};