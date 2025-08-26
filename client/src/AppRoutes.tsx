
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Students from "./pages/students";
import StudentHistory from "./pages/student-history";
import Exercises from "./pages/exercises";
import Diet from "./pages/diet";
import Supplements from "./pages/supplements";
import Trainer from "./pages/trainer";
import Management from "./pages/management/index";
import Reports from "./pages/reports";
import Support from "./pages/support";
import About from "./pages/about";

// Student Panel Components
import { StudentAuthWrapper } from "./components/student-auth/StudentAuthWrapper";
import { StudentLayout } from "./components/student-layout/StudentLayout";
import StudentDashboard from "./pages/student-dashboard";
import StudentProfile from "./pages/student-profile";
import StudentExercises from "./pages/student-exercises";
import StudentDiet from "./pages/student-diet";
import StudentSupplements from "./pages/student-supplements";
import StudentReports from "./pages/student-reports";
import StudentSupport from "./pages/student-support";
import StudentAbout from "./pages/student-about";
import StudentProgram from "./pages/student-program";
import { NotFoundHandler } from "./components/NotFoundHandler";

const AppRoutes = () => {
  console.log('AppRoutes: Rendering routes');
  
  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<Index />} />
      
      {/* Student Panel Routes - Protected */}
      <Route path="/Student" element={
        <StudentAuthWrapper>
          <StudentLayout>
            <StudentDashboard />
          </StudentLayout>
        </StudentAuthWrapper>
      } />
      <Route path="/Student/Profile" element={
        <StudentAuthWrapper>
          <StudentLayout>
            <StudentProfile />
          </StudentLayout>
        </StudentAuthWrapper>
      } />
      <Route path="/Student/Exercise-Movements" element={
        <StudentAuthWrapper>
          <StudentLayout>
            <StudentExercises />
          </StudentLayout>
        </StudentAuthWrapper>
      } />
      <Route path="/Student/Diet-Plan" element={
        <StudentAuthWrapper>
          <StudentLayout>
            <StudentDiet />
          </StudentLayout>
        </StudentAuthWrapper>
      } />
      <Route path="/Student/Supplements-Vitamins" element={
        <StudentAuthWrapper>
          <StudentLayout>
            <StudentSupplements />
          </StudentLayout>
        </StudentAuthWrapper>
      } />
      <Route path="/Student/Report" element={
        <StudentAuthWrapper>
          <StudentLayout>
            <StudentReports />
          </StudentLayout>
        </StudentAuthWrapper>
      } />
      <Route path="/Student/Support" element={
        <StudentAuthWrapper>
          <StudentLayout>
            <StudentSupport />
          </StudentLayout>
        </StudentAuthWrapper>
      } />
      <Route path="/Student/About" element={
        <StudentAuthWrapper>
          <StudentLayout>
            <StudentAbout />
          </StudentLayout>
        </StudentAuthWrapper>
      } />
      <Route path="/Student/Program" element={
        <StudentAuthWrapper>
          <StudentLayout>
            <StudentProgram />
          </StudentLayout>
        </StudentAuthWrapper>
      } />
      
      {/* Management Panel Routes */}
      <Route path="/Management" element={<Management />} />
      <Route path="/Management/Coach-Profile" element={<Trainer />} />
      <Route path="/Management/Students" element={<Students />} />
      <Route path="/Management/Exercise-Movements" element={<Exercises />} />
      <Route path="/Management/Diet-Plan" element={<Diet />} />
      <Route path="/Management/Supplements-Vitamins" element={<Supplements />} />
      <Route path="/Management/Student-History" element={<StudentHistory />} />
      <Route path="/Management/Report" element={<Reports />} />
      <Route path="/Management/Support" element={<Support />} />
      <Route path="/Management/About" element={<About />} />
      
      {/* Legacy Routes Redirects - Fixed */}
      <Route path="/Students" element={<Navigate to="/Student" replace />} />
      <Route path="/Report" element={<Navigate to="/Management/Report" replace />} />
      <Route path="/Reports" element={<Navigate to="/Management/Report" replace />} />
      <Route path="/students" element={<Navigate to="/Management/Students" replace />} />
      <Route path="/student-history" element={<Navigate to="/Management/Student-History" replace />} />
      <Route path="/exercises" element={<Navigate to="/Management/Exercise-Movements" replace />} />
      <Route path="/diet" element={<Navigate to="/Management/Diet-Plan" replace />} />
      <Route path="/supplements" element={<Navigate to="/Management/Supplements-Vitamins" replace />} />
      <Route path="/trainer" element={<Navigate to="/Management/Coach-Profile" replace />} />
      <Route path="/management" element={<Navigate to="/Management" replace />} />

      {/* Catch All Route - Smart redirect based on authentication */}
      <Route path="*" element={<NotFoundHandler />} />
    </Routes>
  );
};

export default AppRoutes;
