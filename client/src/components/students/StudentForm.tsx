
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/components/students/StudentTypes";
import { cn } from "@/lib/utils";
import { studentFormSchema, StudentFormValues } from "@/lib/validations/student";

// Import our components
import { ProfileImageUpload } from "./form-components/ProfileImageUpload";
import { PersonalInfoSection } from "./form-components/PersonalInfoSection";
import { MeasurementsSection } from "./form-components/MeasurementsSection";

import { FormActions } from "./form-components/FormActions";
import { GenderField } from "./form-components/GenderField";

import { GoalTypeField } from "./form-components/GoalTypeField";
import { ActivityLevelField } from "./form-components/ActivityLevelField";
import { usePhoneValidation } from "@/hooks/students/usePhoneValidation";

interface StudentFormProps {
  student?: Student;
  onSave: (data: StudentFormValues) => void;
  onCancel: () => void;
  isDialog?: boolean;
}

export const StudentForm = ({
  student,
  onSave,
  onCancel,
  isDialog = false,
}: StudentFormProps) => {
  const { toast } = useToast();
  const [previewImage, setPreviewImage] = useState<string>(student?.image || "/Assets/Image/Place-Holder.svg");
  const { validatePhone, checkPhoneAvailability } = usePhoneValidation();
  const [phoneValidationMessage, setPhoneValidationMessage] = useState<string>('');
  
  // Handle phone number change for validation
  const handlePhoneChange = (phone: string) => {
    // Check for duplicates
    checkPhoneAvailability(phone);
    
    // Validate phone number
    const validation = validatePhone(phone, student?.id);
    setPhoneValidationMessage(validation.message || '');
  };
  
  // Initialize form with default values or student data
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: student?.name || "",
      phone: student?.phone || "",
      height: student?.height || 0,
      weight: student?.weight || 0,
      image: student?.image || "/Assets/Image/Place-Holder.svg",

      age: student?.age || 0,
      goalType: student?.goalType || "تناسب اندام",
      activityLevel: student?.activityLevel || "متوسط",
      gender: student?.gender || "male",
    },
  });

  // Update form when student data changes
  useEffect(() => {
    if (student) {
      console.log("Updating form with student data:", student);
      form.reset({
        name: student.name || "",
        phone: student.phone || "",
        height: student.height || 0,
        weight: student.weight || 0,
        image: student.image || "/Assets/Image/Place-Holder.svg",
        age: student.age || 0,
        goalType: student.goalType || "تناسب اندام",
        activityLevel: student.activityLevel || "متوسط",
        gender: student.gender || "male",
      });
      setPreviewImage(student.image || "/Assets/Image/Place-Holder.svg");
    } else {
      // Clear form for new student
      console.log("Clearing form for new student");
      form.reset({
        name: "",
        phone: "",
        height: 0,
        weight: 0,
        image: "/Assets/Image/Place-Holder.svg",
        age: 0,
        goalType: "تناسب اندام",
        activityLevel: "متوسط",
        gender: "male",
      });
      setPreviewImage("/Assets/Image/Place-Holder.svg");
    }
  }, [student, form]);

  const onSubmit = (data: StudentFormValues) => {
    try {
      // Final phone validation before submit
      const phoneValidation = validatePhone(data.phone, student?.id);
      if (!phoneValidation.isValid || phoneValidation.isDuplicate) {
        toast({
          title: "خطا در ثبت اطلاعات",
          description: phoneValidation.message || "شماره موبایل معتبر نیست",
          variant: "destructive",
        });
        return;
      }
      
      console.log("Form submission data:", data);
      onSave(data);
    } catch (error) {
      console.error("Error saving student:", error);
      toast({
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی اطلاعات دانش‌آموز پیش آمد. لطفا مجدد تلاش کنید.",
        variant: "destructive",
      });
    }
  };

  // Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const handleImageChange = (imageData: string) => {
    setPreviewImage(imageData);
    form.setValue("image", imageData);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className={cn(
        "w-full max-w-7xl mx-auto",
        isDialog ? "p-0" : "p-4 md:p-6"
      )}
      dir="rtl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-8">
          {/* Profile Card Container - مطابق با student profile */}
          <motion.div
            className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-sky-400/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-40 -left-40 w-64 h-64 bg-gradient-to-tl from-sky-400/10 to-emerald-400/5 rounded-full blur-2xl" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
              {/* Sidebar - Profile Image and Basic Info */}
              <div className="lg:col-span-4 bg-gradient-to-b from-emerald-50/80 to-sky-50/80 dark:from-slate-800/80 dark:to-slate-900/80 border-l border-slate-200/50 dark:border-slate-700/50">
                <div className="p-8 space-y-8">
                  {/* Profile Image Section */}
                  <motion.div 
                    variants={itemVariants}
                    className="text-center"
                  >
                    <ProfileImageUpload 
                      previewImage={previewImage}
                      onChange={handleImageChange}
                      error={!!form.formState.errors.image}
                    />
                  </motion.div>

                  {/* Gender Field */}
                  <GenderField 
                    control={form.control}
                    itemVariants={itemVariants}
                  />
                </div>
              </div>

              {/* Form Section */}
              <div className="lg:col-span-8">
                <div className="p-8 h-full flex flex-col">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 space-y-8"
                  >
                    {/* Personal Info Section */}
                    <div className="space-y-6">
                      <motion.h3 
                        variants={itemVariants}
                        className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2"
                      >
                        اطلاعات شخصی
                      </motion.h3>
                      <PersonalInfoSection 
                        control={form.control} 
                        itemVariants={itemVariants}
                        onPhoneChange={handlePhoneChange}
                        phoneValidationMessage={phoneValidationMessage}
                        editingStudentId={student?.id}
                      />
                    </div>

                    {/* Measurements Section */}
                    <div className="space-y-6">
                      <motion.h3 
                        variants={itemVariants}
                        className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4"
                      >
                        اطلاعات تکمیلی
                      </motion.h3>
                      <MeasurementsSection 
                        control={form.control} 
                        itemVariants={itemVariants} 
                      />
                      <ActivityLevelField 
                        form={form}
                        itemVariants={itemVariants}
                      />
                      <GoalTypeField 
                        form={form}
                        itemVariants={itemVariants}
                      />
                    </div>


                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Actions */}
          <motion.div variants={itemVariants}>
            <FormActions 
              isEdit={!!student} 
              onCancel={onCancel} 
            />
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};
