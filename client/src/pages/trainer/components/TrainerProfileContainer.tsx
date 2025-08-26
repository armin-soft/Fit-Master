
import React from "react";
import { motion } from "framer-motion";
import { TrainerProfileCard } from "./TrainerProfileCard";
import { TrainerProfileHeader } from "./TrainerProfileHeader";
import { TrainerProfile } from "@/types/trainer";

interface TrainerProfileContainerProps {
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

export const TrainerProfileContainer: React.FC<TrainerProfileContainerProps> = (props) => {
  return (
    <div className="w-full max-w-7xl mx-auto" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-8"
      >
        <TrainerProfileHeader />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 xl:grid-cols-12 gap-8"
        >
          <div className="xl:col-span-12">
            <TrainerProfileCard {...props} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
