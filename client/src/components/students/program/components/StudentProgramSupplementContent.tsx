
import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import StudentSupplementSelector from "../supplement-selector";
import { Pill } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentProgramSupplementContentProps {
  selectedSupplements: number[];
  setSelectedSupplements: React.Dispatch<React.SetStateAction<number[]>>;
  selectedVitamins: number[];
  setSelectedVitamins: React.Dispatch<React.SetStateAction<number[]>>;
  supplements: any[];
  currentDay: number;
  setCurrentDay: React.Dispatch<React.SetStateAction<number>>;
}

const StudentProgramSupplementContent: React.FC<StudentProgramSupplementContentProps> = ({
  selectedSupplements,
  setSelectedSupplements,
  selectedVitamins,
  setSelectedVitamins,
  supplements,
  currentDay,
  setCurrentDay,
}) => {
  const [activeTab, setActiveTab] = useState<'supplement' | 'vitamin'>('supplement');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
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
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <TabsContent value="supplement" className="m-0 h-full text-right" dir="rtl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-4 h-full flex flex-col text-right"
        dir="rtl"
      >
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-between mb-4 gap-2 text-right" dir="rtl">
          <h3 className="font-semibold text-lg text-right">
            مکمل و ویتامین
          </h3>
        </motion.div>
        
        {/* Tab Selector for Supplement vs Vitamin */}
        <motion.div variants={itemVariants} className="mb-4 text-right" dir="rtl">
          <div className="flex bg-muted/20 rounded-lg p-1 w-full sm:w-auto justify-center">
            <button
              onClick={() => setActiveTab('supplement')}
              className={cn(
                "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                activeTab === 'supplement'
                  ? "bg-white text-purple-700 shadow-sm" 
                  : "text-gray-600 hover:bg-white/50"
              )}
            >
              مکمل‌ها
            </button>
            <button
              onClick={() => setActiveTab('vitamin')}
              className={cn(
                "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                activeTab === 'vitamin'
                  ? "bg-white text-purple-700 shadow-sm" 
                  : "text-gray-600 hover:bg-white/50"
              )}
            >
              ویتامین‌ها
            </button>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex-1 overflow-auto text-right" dir="rtl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full text-right"
              dir="rtl"
            >
              <Card className="border border-border/40 bg-white/90 backdrop-blur-sm shadow-sm h-full text-right" dir="rtl">
                <div className="p-4 h-full text-right" dir="rtl">
                  <StudentSupplementSelector 
                    supplements={supplements}
                    selectedSupplements={selectedSupplements}
                    setSelectedSupplements={setSelectedSupplements}
                    selectedVitamins={selectedVitamins}
                    setSelectedVitamins={setSelectedVitamins}
                    activeTab={activeTab}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4 text-muted-foreground text-sm text-center" dir="rtl">
          <div className="flex items-center justify-center gap-2" dir="rtl">
            <Pill className="h-4 w-4" />
            <span className="text-right">
              {activeTab === 'supplement' 
                ? `${toPersianNumbers(selectedSupplements.length)} مکمل انتخاب شده` 
                : `${toPersianNumbers(selectedVitamins.length)} ویتامین انتخاب شده`}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </TabsContent>
  );
};

export default StudentProgramSupplementContent;
