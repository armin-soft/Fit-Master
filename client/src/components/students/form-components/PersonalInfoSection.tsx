
import React from "react";
import { motion } from "framer-motion";
import { User, Phone, Calendar } from "lucide-react";
import { StudentFormField } from "./StudentFormField";

interface PersonalInfoSectionProps {
  control: any;
  itemVariants: any;
  onPhoneChange?: (phone: string) => void;
  phoneValidationMessage?: string;
  editingStudentId?: number;
}

export const PersonalInfoSection = ({ 
  control, 
  itemVariants, 
  onPhoneChange,
  phoneValidationMessage,
  editingStudentId
}: PersonalInfoSectionProps) => {
  return (
    <div className="space-y-6">
      <motion.div variants={itemVariants}>
        <StudentFormField
          control={control}
          name="name"
          label="نام و نام خانوادگی"
          placeholder="نام و نام خانوادگی شاگرد را وارد کنید"
          icon={User}
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <StudentFormField
          control={control}
          name="phone"
          label="شماره موبایل"
          placeholder="09123823886"
          icon={Phone}
          direction="ltr"
          numberOnly
          onChange={onPhoneChange}
          validationMessage={phoneValidationMessage}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StudentFormField
          control={control}
          name="age"
          label="سن"
          placeholder="25"
          icon={Calendar}
          direction="ltr"
          numberOnly
        />
      </motion.div>
    </div>
  );
};
