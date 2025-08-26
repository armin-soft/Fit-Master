
import React from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { studentFormSchema, StudentFormValues } from "@/lib/validations/student";
import { Student } from "@/components/students/StudentTypes";
import { StudentImageSection } from "./StudentImageSection";
import { StudentPersonalInfo } from "./StudentPersonalInfo";
import { FormActions } from "./FormActions";
import { GenderField } from "./GenderField";
import { itemVariants } from "./FormContainer";

interface StudentFormProps {
  student?: Student;
  onSave: (data: StudentFormValues) => void;
  onCancel: () => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  student,
  onSave,
  onCancel,
}) => {
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      height: undefined,
      weight: undefined,
      age: undefined,
      gender: undefined,
      image: "/Assets/Image/Place-Holder.svg",
      goalType: "",
      activityLevel: "", 
      medicalConditions: "",
      isActive: true
    }
  });

  // Update form when student data changes
  React.useEffect(() => {
    if (student) {
      console.log("Updating form with student data:", student);
      form.reset({
        name: student.name || "",
        phone: student.phone || "",
        height: student.height || 170,
        weight: student.weight || 70,
        age: student.age || undefined,
        gender: student.gender || undefined,
        image: student.image || "/Assets/Image/Place-Holder.svg",
        goalType: student.goalType || "تناسب اندام",
        activityLevel: student.activityLevel || "متوسط", 
        medicalConditions: student.medicalConditions || "ندارد",
        isActive: student.isActive ?? true
      });
    } else {
      // Clear form for new student
      console.log("Clearing form for new student");
      form.reset({
        name: "",
        phone: "",
        height: undefined,
        weight: undefined,
        age: undefined,
        gender: undefined,
        image: "/Assets/Image/Place-Holder.svg",
        goalType: "",
        activityLevel: "", 
        medicalConditions: "",
        isActive: true
      });
    }
  }, [student, form]);

  const onSubmit = async (data: StudentFormValues) => {
    try {
      // Validate phone number before submission
      const phoneInput = form.getFieldState('phone');
      if (phoneInput.error) {
        console.error("Phone validation error:", phoneInput.error);
        return;
      }
      
      await onSave(data);
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-6">
        <motion.div variants={itemVariants} className="p-4 sm:p-6 md:p-8">
          {/* Responsive Layout - Improved for better spacing */}
          <div className="flex flex-col xl:flex-row gap-6 xl:gap-8">
            {/* Image Section */}
            <div className="w-full xl:w-1/4 flex justify-center xl:justify-start">
              <StudentImageSection 
                initialImage={student?.image} 
                form={form as UseFormReturn<StudentFormValues>} 
                itemVariants={itemVariants} 
              />
            </div>
            
            {/* Form Fields */}
            <div className="w-full xl:w-3/4 space-y-4 sm:space-y-6">
              <StudentPersonalInfo form={form as UseFormReturn<StudentFormValues>} student={student} />
              <GenderField control={form.control as any} itemVariants={itemVariants} />
            </div>
          </div>
        </motion.div>
        
        <FormActions isEdit={Boolean(student)} onCancel={onCancel} />
      </form>
    </Form>
  );
};
