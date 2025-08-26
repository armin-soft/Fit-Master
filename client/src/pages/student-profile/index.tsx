
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { StudentProfileContainer } from "./components/StudentProfileContainer";
import { StudentProfileBackground } from "./components/StudentProfileBackground";
import { useStudentProfile } from "./hooks/useStudentProfile";

const StudentProfile = () => {
  const profileData = useStudentProfile();
  const [activeSection, setActiveSection] = useState("personal");

  const handleImageUpdate = (image: string) => {
    // Handle image update - this would typically call an API
    console.log("Image updated:", image);
  };

  return (
    <PageContainer withBackground fullWidth fullHeight className="min-h-screen relative overflow-hidden">
      <StudentProfileBackground />
      
      <motion.div 
        className="relative z-10 min-h-screen flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <StudentProfileContainer 
          profile={profileData}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          handleImageUpdate={handleImageUpdate}
        />
      </motion.div>
    </PageContainer>
  );
};

export default StudentProfile;
