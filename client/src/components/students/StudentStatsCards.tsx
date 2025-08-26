
import React, { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Student } from '@/components/students/StudentTypes';
import { UserRound, Dumbbell, Apple, Pill, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { toPersianNumbers } from '@/lib/utils/numbers';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  className?: string;
  valueClassName?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, className = '', valueClassName = '' }) => (
  <Card className={`p-4 backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-gray-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
    <div className="flex items-center">
      <div className="p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className={`text-2xl font-semibold ${valueClassName}`}>{value}</p>
      </div>
    </div>
  </Card>
);

interface StudentStatsCardsProps {
  students: Student[];
}

export const StudentStatsCards: React.FC<StudentStatsCardsProps> = ({ students }) => {
  const stats = useMemo(() => {
    const totalStudents = students.length;
    
    const withExercises = students.filter(s => 
      (s.exercises && Array.isArray(s.exercises) && s.exercises.length > 0) || 
      (s.exercisesDay1 && Array.isArray(s.exercisesDay1) && s.exercisesDay1.length > 0) || 
      (s.exercisesDay2 && Array.isArray(s.exercisesDay2) && s.exercisesDay2.length > 0) || 
      (s.exercisesDay3 && Array.isArray(s.exercisesDay3) && s.exercisesDay3.length > 0) || 
      (s.exercisesDay4 && Array.isArray(s.exercisesDay4) && s.exercisesDay4.length > 0)
    ).length;
    
    const withDiet = students.filter(s => s.meals && Array.isArray(s.meals) && s.meals.length > 0).length;
    
    const withSupplements = students.filter(s => 
      (s.supplements && Array.isArray(s.supplements) && s.supplements.length > 0) || 
      (s.vitamins && Array.isArray(s.vitamins) && s.vitamins.length > 0)
    ).length;
    
    return { totalStudents, withExercises, withDiet, withSupplements };
  }, [students]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible" 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    >
      <motion.div variants={itemVariants}>
        <StatCard
          title="تعداد شاگردان"
          value={toPersianNumbers(stats.totalStudents)}
          icon={<UserRound className="h-5 w-5 text-gray-900 dark:text-gray-100" />}
          valueClassName="text-gray-900 dark:text-gray-100"
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <StatCard
          title="برنامه تمرینی"
          value={toPersianNumbers(stats.withExercises)}
          icon={<Dumbbell className="h-5 w-5 text-orange-600 dark:text-orange-400" />}
          valueClassName="text-orange-600 dark:text-orange-400"
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <StatCard
          title="برنامه غذایی"
          value={toPersianNumbers(stats.withDiet)}
          icon={<Apple className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />}
          valueClassName="text-yellow-600 dark:text-yellow-400"
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <StatCard
          title="مکمل و ویتامین"
          value={toPersianNumbers(stats.withSupplements)}
          icon={<Pill className="h-5 w-5 text-gray-700 dark:text-gray-300" />}
          valueClassName="text-gray-700 dark:text-gray-300"
        />
      </motion.div>
    </motion.div>
  );
};
