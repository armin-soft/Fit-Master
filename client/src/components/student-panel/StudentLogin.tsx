
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { StudentLoginForm } from "./login/StudentLoginForm";

interface StudentLoginProps {
  onLoginSuccess: (phone: string, rememberMe?: boolean) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

export const StudentLogin: React.FC<StudentLoginProps> = ({ onLoginSuccess }) => {
  // بررسی وضعیت ورود شاگرد در لود اولیه
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const { getStorageItem } = await import('@/utils/databaseStorage');
        const isStudentLoggedIn = await getStorageItem("studentLoggedIn", "false") === "true";
        const loggedInStudentId = await getStorageItem("loggedInStudentId", null);
        
        console.log('StudentLogin: Checking login status on mount');
        console.log('StudentLogin: isStudentLoggedIn:', isStudentLoggedIn);
        console.log('StudentLogin: loggedInStudentId:', loggedInStudentId);
        
        if (isStudentLoggedIn && loggedInStudentId) {
          console.log('StudentLogin: Student already logged in, calling success callback');
          onLoginSuccess(loggedInStudentId);
        }
      } catch (error) {
        console.error('Error checking student login status:', error);
      }
    };
    
    checkLoginStatus();
  }, [onLoginSuccess]);

  const handleLoginSuccess = (phone: string, rememberMe: boolean = false) => {
    console.log('StudentLogin: Login successful for phone:', phone);
    onLoginSuccess(phone, rememberMe);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen w-full"
    >
      <StudentLoginForm onLoginSuccess={handleLoginSuccess} />
    </motion.div>
  );
};
