
import React from 'react';
import { motion } from 'framer-motion';
import { SearchX, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StudentEmptyStateProps {
  searchQuery: string;
  onClearSearch: () => void;
  onAddStudent: () => void;
}

export const StudentEmptyState: React.FC<StudentEmptyStateProps> = ({
  searchQuery,
  onClearSearch,
  onAddStudent
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  if (searchQuery) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <SearchX size={50} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">نتیجه‌ای یافت نشد</h3>
        <p className="text-gray-500 mb-4">هیچ شاگردی با عبارت جستجوی «{searchQuery}» پیدا نشد.</p>
        <Button onClick={onClearSearch} variant="outline">پاک کردن جستجو</Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="text-center max-w-md mx-auto"
    >
      <motion.div variants={itemVariants}>
        <UserPlus size={50} className="mx-auto text-gray-400 mb-4" />
      </motion.div>
      <motion.h3 variants={itemVariants} className="text-lg font-medium mb-2">
        هنوز شاگردی اضافه نشده است
      </motion.h3>
      <motion.p variants={itemVariants} className="text-gray-500 mb-4">
        برای شروع، اولین شاگرد خود را اضافه کنید
      </motion.p>
      <motion.div variants={itemVariants}>
        <Button onClick={onAddStudent}>افزودن شاگرد</Button>
      </motion.div>
    </motion.div>
  );
};
