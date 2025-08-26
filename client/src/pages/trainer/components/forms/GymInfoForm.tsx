
import React from "react";
import { motion } from "framer-motion";
import { Building, MapPin, FileText } from "lucide-react";
import { TrainerProfile } from "@/types/trainer";
import { ModernFormField } from "./ModernFormField";

interface GymInfoFormProps {
  profile: TrainerProfile;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, boolean>>>>;
  handleUpdate: (key: keyof TrainerProfile, value: string) => void;
}

export const GymInfoForm: React.FC<GymInfoFormProps> = ({
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
          اطلاعات تکمیلی
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          اطلاعات الزامی مربوط به محل فعالیت خود را وارد کنید
        </p>
      </div>

      <ModernFormField
        label="نام محل فعالیت"
        value={profile.gymName}
        onChange={(value) => handleUpdate('gymName', value)}
        placeholder="نام محل فعالیت خود را وارد کنید"
        icon={Building}
        error={errors.gymName}
        isValid={validFields.gymName}
        required
      />

      <ModernFormField
        label="آدرس محل فعالیت"
        value={profile.gymAddress}
        onChange={(value) => handleUpdate('gymAddress', value)}
        placeholder="آدرس کامل محل فعالیت را وارد کنید"
        icon={MapPin}
        error={errors.gymAddress}
        isValid={validFields.gymAddress}
        required
      />

      <ModernFormField
        label="توضیحات محل فعالیت"
        value={profile.gymDescription}
        onChange={(value) => handleUpdate('gymDescription', value)}
        placeholder="توضیح کوتاهی درباره محل فعالیت، امکانات و خدمات آن بنویسید"
        icon={FileText}
        error={errors.gymDescription}
        isValid={validFields.gymDescription}
        textarea
        rows={4}
        required
      />
    </motion.div>
  );
};
