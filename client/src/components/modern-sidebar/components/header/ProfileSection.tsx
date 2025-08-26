
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Crown } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { TrainerProfile } from "../../types";
import { getStatusColor, getStatusText } from "../../utils/statusUtils";

interface ProfileSectionProps {
  profile: TrainerProfile;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ profile }) => {
  const [projectName, setProjectName] = useState('فیت مستر');

  useEffect(() => {
    const loadProjectName = async () => {
      try {
        const response = await fetch('/Manifest.json');
        const manifest = await response.json();
        setProjectName(manifest.name || 'فیت مستر');
      } catch (error) {
        console.error('Failed to load project name:', error);
        setProjectName('فیت مستر');
      }
    };
    loadProjectName();
  }, []);

  return (
    <div className="flex items-center gap-3 flex-1">
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-sky-500 to-emerald-600 rounded-full blur-md opacity-30" />
        <Avatar className="relative z-10 h-12 w-12 border-2 border-white/50 dark:border-slate-700/50 shadow-lg">
          <AvatarImage src={profile.image} className="object-cover" />
          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-sky-600 text-white text-sm font-bold">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        
        <motion.div 
          className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 shadow-md ${getStatusColor(profile.status)}`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <motion.div 
            className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 via-sky-500 to-emerald-600 flex items-center justify-center shadow-sm"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Crown className="h-3 w-3 text-white" />
          </motion.div>
          
          <motion.h3 
            className="text-base font-bold bg-gradient-to-r from-emerald-800 via-sky-700 to-emerald-600 dark:from-emerald-200 dark:via-sky-200 dark:to-emerald-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {profile.name}
          </motion.h3>
        </div>
        
        <motion.p 
          className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          dir="ltr"
        >
          {toPersianNumbers(profile.phone)}
        </motion.p>
        
        <div className="flex items-center gap-1.5">
          <Badge variant="secondary" className="text-2xs px-2 py-0.5 bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300">
            <Crown className="h-2.5 w-2.5 ml-1" />
            {projectName}
          </Badge>
          <Badge variant="outline" className={`text-2xs px-2 py-0.5 ${getStatusColor(profile.status).replace('bg-', 'text-')}`}>
            {getStatusText(profile.status)}
          </Badge>
        </div>
      </div>
    </div>
  );
};
