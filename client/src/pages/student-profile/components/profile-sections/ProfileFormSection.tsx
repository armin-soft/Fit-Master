
import React from "react";
import { motion } from "framer-motion";
import { StudentProfile } from "../../types/studentProfile";
import { PersonalInfoForm } from "../forms/PersonalInfoForm";
import { BMIForm } from "../forms/BMIForm";

interface ProfileFormSectionProps {
  profile: StudentProfile;
  activeSection: string;
}

export const ProfileFormSection: React.FC<ProfileFormSectionProps> = ({
  profile,
  activeSection
}) => {
  const renderActiveForm = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalInfoForm profile={profile} />;
      case "bmi":
        return <BMIForm profile={profile} />;
      default:
        return <PersonalInfoForm profile={profile} />;
    }
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        {renderActiveForm()}
      </motion.div>
    </div>
  );
};
