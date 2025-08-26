import { useState, useCallback } from "react";
import { TrainerProfile } from "@/components/modern-sidebar/types";

export const useStudentProfileData = () => {
  const [studentProfile, setStudentProfile] = useState<TrainerProfile>({
    name: "",
    phone: "",
    image: "/Assets/Image/Place-Holder.svg",
    gymName: "",
    status: "active",
    membersSince: ""
  });

  const loadProfile = useCallback(async () => {
    try {
      // دریافت اطلاعات شاگرد از API
      const studentResponse = await fetch('/api/current-student', {
        credentials: 'include'
      });
      
      if (!studentResponse.ok) {
        throw new Error('Student not found');
      }
      
      const student = await studentResponse.json();
      
      // دریافت اطلاعات مربی (نام باشگاه)
      const trainerResponse = await fetch('/api/trainer/profile', {
        credentials: 'include'
      });
      
      let gymName = "";
      if (trainerResponse.ok) {
        const trainerData = await trainerResponse.json();
        gymName = trainerData.gymName || "";
      }

      console.log('Student profile loaded from database:', student);
      
      setStudentProfile({
        name: student.name || "",
        phone: student.phone || "",
        image: student.image || "/Assets/Image/Place-Holder.svg",
        gymName: gymName,
        status: "active",
        membersSince: student.createdAt ? new Date(student.createdAt).toLocaleDateString('fa-IR') : ""
      });
      
    } catch (error) {
      console.error('خطا در بارگذاری پروفایل شاگرد:', error);
      // در صورت خطا، فقط تصویر پیش‌فرض نمایش داده شود
      setStudentProfile({
        name: "",
        phone: "",
        image: "/Assets/Image/Place-Holder.svg",
        gymName: "",
        status: "active",
        membersSince: ""
      });
    }
  }, []);

  return { studentProfile, loadProfile };
};