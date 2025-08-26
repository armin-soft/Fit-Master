
import React from "react";
import { StudentLayout } from "@/components/student-layout/StudentLayout";
import StudentDashboard from "@/pages/student-dashboard";

const StudentPanel = () => {
  // منطق احراز هویت به StudentAuthWrapper منتقل شده است
  return (
    <StudentLayout>
      <StudentDashboard />
    </StudentLayout>
  );
};

export default StudentPanel;
