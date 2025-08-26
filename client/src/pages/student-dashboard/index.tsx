
import React from "react";
import { StudentDashboardContentNew } from "./components/StudentDashboardContent-New";
import { StudentDashboardLayoutNew } from "./components/layout/StudentDashboardLayout-New";
import { useStudentDashboardStats } from "./hooks/useStudentDashboardStats";
import { useStudentProfile } from "./hooks/useStudentProfile";
import { useCurrentTime } from "@/hooks/useCurrentTime";

interface StudentDashboardProps {
  onSidebarToggle?: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onSidebarToggle }) => {
  const stats = useStudentDashboardStats();
  const { studentProfile, profileImageSrc } = useStudentProfile();
  const currentTime = useCurrentTime();

  // آماده‌سازی داده‌های پروفایل برای استفاده در کامپوننت‌ها - فقط داده واقعی
  const studentProfileData = {
    name: studentProfile?.name || "",
    image: profileImageSrc
  };

  console.log('Dashboard data:', {
    stats,
    studentProfile: studentProfileData,
    currentTime
  });

  return (
    <div className="min-h-screen w-full" dir="rtl">
      <StudentDashboardLayoutNew>
        <StudentDashboardContentNew 
          stats={stats}
          currentTime={currentTime}
          studentProfile={studentProfileData}
        />
      </StudentDashboardLayoutNew>
    </div>
  );
};

export default StudentDashboard;
