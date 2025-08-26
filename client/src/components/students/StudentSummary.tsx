
import { toPersianNumbers } from "@/lib/utils/numbers";
import { UserRound, Ruler, Weight, Phone, Dumbbell, Apple, Pill } from "lucide-react";
import { motion } from "framer-motion";

interface StudentSummaryProps {
  student: {
    id: number;
    name: string;
    phone: string;
    height: string;
    weight: string;
    exercises?: number[];
    meals?: number[];
    supplements?: number[];
    vitamins?: number[];
  } | null;
  exercises: any[];
  meals: any[];
  supplements: any[];
}

export const StudentSummary = ({ 
  student, 
  exercises, 
  meals, 
  supplements 
}: StudentSummaryProps) => {
  if (!student) return null;
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      className="grid gap-6 py-4"
      variants={container}
      initial="hidden"
      animate="show"
      dir="rtl"
    >
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-brand-500/5 dark:bg-brand-500/10 rounded-xl p-4 border border-brand-500/20 dark:border-brand-500/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-8 rounded-full bg-brand-500/10 dark:bg-brand-500/20 flex items-center justify-center">
              <UserRound className="size-4 text-brand-600 dark:text-brand-400" />
            </div>
            <div className="text-sm font-medium text-brand-700 dark:text-brand-500">نام:</div>
          </div>
          <div className="text-base text-slate-700 dark:text-slate-300 font-medium pr-11">{student?.name || '-'}</div>
        </div>
        
        <div className="bg-info-500/5 dark:bg-info-500/10 rounded-xl p-4 border border-info-500/20 dark:border-info-500/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-8 rounded-full bg-info-500/10 dark:bg-info-500/20 flex items-center justify-center">
              <Phone className="size-4 text-info-600 dark:text-info-500" />
            </div>
            <div className="text-sm font-medium text-info-700 dark:text-info-500">شماره موبایل:</div>
          </div>
          <div className="text-base text-slate-700 dark:text-slate-300 font-medium pr-11 persian-numbers">
            {student?.phone ? toPersianNumbers(student.phone) : '-'}
          </div>
        </div>
        
        <div className="bg-brand-600/5 dark:bg-brand-600/10 rounded-xl p-4 border border-brand-600/20 dark:border-brand-600/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-8 rounded-full bg-brand-600/10 dark:bg-brand-600/20 flex items-center justify-center">
              <Ruler className="size-4 text-brand-700 dark:text-brand-600" />
            </div>
            <div className="text-sm font-medium text-brand-700 dark:text-brand-600">قد:</div>
          </div>
          <div className="text-base text-slate-700 dark:text-slate-300 font-medium pr-11 persian-numbers">
            {student?.height ? toPersianNumbers(student.height) : '-'} سانتی‌متر
          </div>
        </div>
        
        <div className="bg-info-500/5 dark:bg-info-500/10 rounded-xl p-4 border border-info-500/20 dark:border-info-500/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-8 rounded-full bg-info-500/10 dark:bg-info-500/20 flex items-center justify-center">
              <Weight className="size-4 text-info-600 dark:text-info-500" />
            </div>
            <div className="text-sm font-medium text-info-700 dark:text-info-500">وزن:</div>
          </div>
          <div className="text-base text-slate-700 dark:text-slate-300 font-medium pr-11 persian-numbers">
            {student?.weight ? toPersianNumbers(student.weight) : '-'} کیلوگرم
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={item} className="bg-info-500/5 dark:bg-info-500/10 rounded-xl p-5 border border-info-500/20 dark:border-info-500/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-8 rounded-full bg-info-500/10 dark:bg-info-500/20 flex items-center justify-center">
            <Dumbbell className="size-4 text-info-600 dark:text-info-500" />
          </div>
          <div className="text-sm font-medium text-info-700 dark:text-info-500">برنامه تمرینی:</div>
        </div>
        {student?.exercises && student.exercises.length > 0 ? (
          <ul className="list-none text-sm text-slate-700 dark:text-slate-300 space-y-2">
            {exercises
              .filter(exercise => student.exercises?.includes(exercise.id))
              .map(exercise => (
                <li key={exercise.id} className="flex items-center gap-2 bg-white/50 dark:bg-slate-900/50 p-2 rounded-lg border border-info-500/20 dark:border-info-500/30">
                  <div className="size-6 rounded-full bg-info-500/10 dark:bg-info-500/20 flex items-center justify-center flex-shrink-0">
                    <Dumbbell className="size-3 text-info-600 dark:text-info-500" />
                  </div>
                  <span>{exercise.name}</span>
                </li>
              ))}
          </ul>
        ) : (
          <div className="text-sm text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50 p-3 rounded-lg border border-info-500/20 dark:border-info-500/30">
            هیچ برنامه تمرینی‌ای برای این شاگرد ثبت نشده است.
          </div>
        )}
      </motion.div>
      
      <motion.div variants={item} className="bg-success-500/5 dark:bg-success-500/10 rounded-xl p-5 border border-success-500/20 dark:border-success-500/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-8 rounded-full bg-success-500/10 dark:bg-success-500/20 flex items-center justify-center">
            <Apple className="size-4 text-success-600 dark:text-success-500" />
          </div>
          <div className="text-sm font-medium text-success-700 dark:text-success-500">برنامه غذایی:</div>
        </div>
        {student?.meals && student.meals.length > 0 ? (
          <ul className="list-none text-sm text-slate-700 dark:text-slate-300 space-y-2">
            {meals
              .filter(meal => student.meals?.includes(meal.id))
              .map(meal => (
                <li key={meal.id} className="flex items-center gap-2 bg-white/50 dark:bg-slate-900/50 p-2 rounded-lg border border-success-500/20 dark:border-success-500/30">
                  <div className="size-6 rounded-full bg-success-500/10 dark:bg-success-500/20 flex items-center justify-center flex-shrink-0">
                    <Apple className="size-3 text-success-600 dark:text-success-500" />
                  </div>
                  <span>{meal.name}</span>
                </li>
              ))}
          </ul>
        ) : (
          <div className="text-sm text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50 p-3 rounded-lg border border-success-500/20 dark:border-success-500/30">
            هیچ برنامه غذایی‌ای برای این شاگرد ثبت نشده است.
          </div>
        )}
      </motion.div>
      
      <motion.div variants={item} className="bg-purple-50/50 dark:bg-purple-950/30 rounded-xl p-5 border border-purple-100 dark:border-purple-900/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
            <Pill className="size-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-sm font-medium text-purple-700 dark:text-purple-400">مکمل‌ها و ویتامین‌ها:</div>
        </div>
        {(student?.supplements && student.supplements.length > 0) ||
        (student?.vitamins && student.vitamins.length > 0) ? (
          <ul className="list-none text-sm text-slate-700 dark:text-slate-300 space-y-2">
            {supplements
              .filter(
                item =>
                  student.supplements?.includes(item.id) ||
                  student.vitamins?.includes(item.id)
              )
              .map(item => (
                <li key={item.id} className="flex items-center gap-2 bg-white/50 dark:bg-slate-900/50 p-2 rounded-lg border border-purple-100/50 dark:border-purple-800/30">
                  <div className="size-6 rounded-full bg-purple-100 dark:bg-purple-900/70 flex items-center justify-center flex-shrink-0">
                    <Pill className="size-3 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span>{item.name}</span>
                  <span className="text-xs text-purple-600 dark:text-purple-400 mr-auto bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded-full">
                    {item.type === 'supplement' ? 'مکمل' : 'ویتامین'}
                  </span>
                </li>
              ))}
          </ul>
        ) : (
          <div className="text-sm text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50 p-3 rounded-lg border border-purple-100/50 dark:border-purple-800/30">
            هیچ مکمل یا ویتامینی برای این شاگرد ثبت نشده است.
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
