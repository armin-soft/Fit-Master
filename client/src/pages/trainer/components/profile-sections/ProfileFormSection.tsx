
import React from "react";
import { motion } from "framer-motion";
import { TrainerProfile } from "@/types/trainer";
import { PersonalInfoForm } from "../forms/PersonalInfoForm";
import { GymInfoForm } from "../forms/GymInfoForm";
import { SocialMediaForm } from "../forms/SocialMediaForm";
import { ProfileSaveButton } from "../forms/ProfileSaveButton";
import { ProfileProgress } from "../forms/ProfileProgress";

interface ProfileFormSectionProps {
  profile: TrainerProfile;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, boolean>>>>;
  activeSection: string;
  isSaving: boolean;
  handleUpdate: (key: keyof TrainerProfile, value: string) => void;
  handleSave: () => void;
}

export const ProfileFormSection: React.FC<ProfileFormSectionProps> = (props) => {
  const { activeSection } = props;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    props.handleSave();
  };

  const renderActiveForm = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalInfoForm {...props} />;
      case "gym":
        return <GymInfoForm {...props} />;
      case "social":
        return <SocialMediaForm {...props} />;
      default:
        return <PersonalInfoForm {...props} />;
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="p-8 space-y-8">
      {/* نوار پیشرفت */}
      <ProfileProgress profile={props.profile} />
      
      {/* فرم فعال */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {renderActiveForm()}
      </motion.div>

      {/* دکمه ذخیره */}
      <div className="pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
        <ProfileSaveButton 
          onSave={props.handleSave}
          isLoading={props.isSaving}
        />
      </div>
    </form>
  );
};
