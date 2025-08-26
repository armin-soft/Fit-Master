
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { StudentForm } from "@/components/students/StudentForm";
import { Student } from "@/components/students/StudentTypes";
import { useStudents } from "@/hooks/students";
import { PageContainer } from "@/components/ui/page-container";
import { 
  ArrowLeft, 
  UserPlus, 
  UserRound 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AddEditStudent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [student, setStudent] = useState<Student | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  
  const { 
    students, 
    handleSave
  } = useStudents();

  useEffect(() => {
    if (id) {
      const studentId = parseInt(id);
      const foundStudent = students.find((s) => s.id === studentId);
      
      if (foundStudent) {
        setStudent(foundStudent);
      } else {
        // Student not found, show error toast and navigate back
        toast({
          title: "خطا",
          description: "شاگرد مورد نظر یافت نشد",
          variant: "destructive",
        });
        navigate("/students");
      }
    }
    
    setIsLoading(false);
  }, [id, students, navigate, toast]);

  const handleSaveStudent = async (data: any) => {
    // Fix: Call handleSave with the correct signature
    const success = await (handleSave as any)(data, student);
    
    if (success) {
      toast({
        title: student ? "ویرایش موفق" : "افزودن موفق",
        description: student 
          ? "اطلاعات شاگرد با موفقیت ویرایش شد" 
          : "شاگرد جدید با موفقیت اضافه شد",
      });
      navigate("/students");
    }
  };

  const handleCancel = () => {
    navigate("/students");
  };

  // Page animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1
      } 
    },
    exit: { opacity: 0, y: -20 }
  };

  const headerVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <PageContainer withBackground fullHeight>
      <div className="container px-4 py-6 md:py-8">
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="flex flex-col"
        >
          {/* Header with back button */}
          <motion.div 
            variants={headerVariants}
            className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8"
          >
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate("/students")} 
                className="h-9 w-9 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                {id ? (
                  <>
                    <UserRound className="h-7 w-7 text-transparent bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text" />
                    ویرایش اطلاعات شاگرد
                  </>
                ) : (
                  <>
                    <UserPlus className="h-7 w-7 text-transparent bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text" />
                    افزودن شاگرد جدید
                  </>
                )}
              </h1>
            </div>
          </motion.div>

          {/* Form Container */}
          <div className="w-full">
            <div className="rounded-xl sm:rounded-3xl backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200/70 dark:border-gray-800/70 shadow-lg shadow-gray-200/20 dark:shadow-black/10 overflow-hidden transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-emerald-600 to-sky-600 -z-10" />
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <div className="flex items-center justify-center p-12">
                    <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-600 rounded-full animate-spin" />
                  </div>
                ) : (
                  <StudentForm 
                    student={student} 
                    onSave={handleSaveStudent} 
                    onCancel={handleCancel}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default AddEditStudent;
