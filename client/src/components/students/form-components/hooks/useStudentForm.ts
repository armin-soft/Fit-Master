
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/components/students/StudentTypes";

export interface StudentFormData {
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;

}

export interface StudentFormErrors {
  name?: string;
  phone?: string;
  height?: string;
  weight?: string;
  image?: string;

}

export const useStudentForm = (student?: Student, onSave?: (data: StudentFormData) => void) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<StudentFormData>({
    name: student?.name || "",
    phone: student?.phone || "",
    height: student?.height || "",
    weight: student?.weight || "",
    image: student?.image || "/placeholder.svg",

  });
  const [errors, setErrors] = useState<StudentFormErrors>({});

  const validateField = (key: keyof StudentFormData, value: string) => {
    let error = "";
    switch (key) {
      case "name":
        if (!value) error = "نام و نام خانوادگی الزامی است";
        break;
      case "phone":
        if (!value) error = "شماره موبایل الزامی است";
        else if (!/^09\d{9}$/.test(value)) error = "شماره موبایل معتبر نیست";
        break;
      case "height":
        if (!value) error = "قد الزامی است";
        else if (!/^\d+$/.test(value)) error = "قد باید عدد باشد";
        break;
      case "weight":
        if (!value) error = "وزن الزامی است";
        else if (!/^\d+$/.test(value)) error = "وزن باید عدد باشد";
        break;
      case "image":
        break;

    }
    setErrors(prev => ({ ...prev, [key]: error }));
    return !error;
  };

  const handleFieldChange = (field: keyof StudentFormData, value: string) => {
    let processedValue = value;
    
    if (field === "phone" || field === "height" || field === "weight") {
      processedValue = value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
    }
    setFormData({ ...formData, [field]: processedValue });
    validateField(field, processedValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = true;
    
    Object.entries(formData).forEach(([key, value]) => {
      if (!validateField(key as keyof StudentFormData, value)) {
        isValid = false;
      }
    });

    if (!isValid) {
      toast({
        title: "خطا",
        description: "لطفاً همه فیلدها را به درستی پر کنید",
        variant: "destructive",
      });
      return;
    }

    if (onSave) {
      onSave(formData);
    }
  };

  return {
    formData,
    errors,
    handleFieldChange,
    handleSubmit
  };
};
