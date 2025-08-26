
import React from "react";
import { motion } from "framer-motion";
import { User, Phone, FileText } from "lucide-react";
import { TrainerProfile } from "@/types/trainer";
import { ModernFormField } from "./ModernFormField";

interface PersonalInfoFormProps {
  profile: TrainerProfile;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, boolean>>>>;
  handleUpdate: (key: keyof TrainerProfile, value: string) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  profile,
  errors,
  validFields,
  handleUpdate
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
          اطلاعات شخصی
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          اطلاعات اساسی و شخصی خود را وارد کنید
        </p>
      </div>

      <ModernFormField
        label="نام مربی"
        value={profile.name}
        onChange={(value) => handleUpdate('name', value)}
        placeholder="نام خود را وارد کنید"
        icon={User}
        error={errors.name}
        isValid={validFields.name}
        required
      />

      <ModernFormField
        label="شماره تلفن"
        value={profile.phone}
        onChange={(value) => handleUpdate('phone', value)}
        placeholder="شماره تلفن خود را وارد کنید"
        icon={Phone}
        error={errors.phone}
        isValid={validFields.phone}
        type="tel"
        required
      />

      <ModernFormField
        label="بیوگرافی"
        value={profile.bio}
        onChange={(value) => handleUpdate('bio', value)}
        placeholder="توضیح کوتاهی درباره خود و تجربیاتتان بنویسید"
        icon={FileText}
        error={errors.bio}
        isValid={validFields.bio}
        textarea
        rows={4}
        required
      />
    </motion.div>
  );
};
