
import React from "react";
import { motion } from "framer-motion";
import { TrainerProfile } from "@/types/trainer";
import { ProfileImageSection } from "./profile-sections/ProfileImageSection";
import { ProfileFormSection } from "./profile-sections/ProfileFormSection";
import { ProfileSidebarTabs } from "./profile-sections/ProfileSidebarTabs";

interface TrainerProfileCardProps {
  profile: TrainerProfile;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, boolean>>>>;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isSaving: boolean;
  handleUpdate: (key: keyof TrainerProfile, value: string) => void;
  handleSave: () => void;
}

export const TrainerProfileCard: React.FC<TrainerProfileCardProps> = (props) => {
  return (
    <motion.div
      className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* تأثیرات پس‌زمینه */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-sky-400/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-64 h-64 bg-gradient-to-tl from-sky-400/10 to-emerald-400/5 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        {/* نوار کناری */}
        <div className="lg:col-span-4 bg-gradient-to-b from-emerald-50/80 to-sky-50/80 dark:from-slate-800/80 dark:to-slate-900/80 border-l border-slate-200/50 dark:border-slate-700/50">
          <div className="p-8 space-y-8">
            <ProfileImageSection 
              profile={props.profile}
              onImageChange={(image) => props.handleUpdate('image', image)}
            />
            <ProfileSidebarTabs 
              activeSection={props.activeSection}
              onTabChange={props.setActiveSection}
            />
          </div>
        </div>

        {/* بخش فرم */}
        <div className="lg:col-span-8">
          <ProfileFormSection {...props} />
        </div>
      </div>
    </motion.div>
  );
};
