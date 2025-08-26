import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, Target, Users, Dumbbell, 
  Apple, Pill, TrendingUp, Clock, Award,
  AlertCircle, CheckCircle, Star
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useQuery } from "@tanstack/react-query";
// Removed databaseStorage import - using API endpoints instead
import ProgramTabsHeader from "./components/ProgramTabsHeader";
import ProgramTabsContent from "./components/ProgramTabsContent";

interface StudentProgram {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  duration: string;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  exercises: any[];
  meals: any[];
  supplements: any[];
  goals: string[];
  trainerNotes: string;
}

const StudentProgram = () => {
  const [currentStudent, setCurrentStudent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Get current student data from API
  const { data: currentStudentData } = useQuery({
    queryKey: ['/api/current-student'],
    queryFn: async () => {
      const response = await fetch('/api/current-student', {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Failed to fetch current student');
      return response.json();
    }
  });

  useEffect(() => {
    if (currentStudentData) {
      setCurrentStudent(currentStudentData);
    }
  }, [currentStudentData]);

  // Fetch student program from API
  const { data: studentProgram, isLoading: isLoadingProgram, error: programError } = useQuery({
    queryKey: ['student-program', currentStudent?.id],
    queryFn: async () => {
      if (!currentStudent?.id) {
        console.log('No current student ID, using default student ID 5');
        // If no currentStudent, use default student ID 5 for testing
        const studentId = 5;
        const response = await fetch(`/api/student-program/${studentId}`, {
          credentials: 'include'
        });
        
        if (!response.ok) {
          console.error('Failed to fetch student program:', response.status, response.statusText);
          throw new Error('Failed to fetch student program');
        }
        
        const data = await response.json();
        console.log('Student program data received:', data);
        console.log('Meals count in program data:', data.meals?.length || 0);
        return data;
      }
      
      console.log('Fetching student program for student ID:', currentStudent.id);
      const response = await fetch(`/api/student-program/${currentStudent.id}`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        console.error('Failed to fetch student program:', response.status, response.statusText);
        throw new Error('Failed to fetch student program');
      }
      
      const data = await response.json();
      console.log('Student program data received:', data);
      console.log('Meals count in program data:', data.meals?.length || 0);
      return data;
    },
    enabled: true // Always enabled to test
  });

  if (programError) {
    console.error('Program query error:', programError);
  }

  // Use student program data from API (now includes meals)
  console.log('Creating programData, studentProgram is:', studentProgram);
  console.log('StudentProgram meals count:', studentProgram?.meals?.length || 0);
  console.log('isLoadingProgram:', isLoadingProgram);
  
  // If data is loading, return loading state
  if (isLoadingProgram) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری برنامه...</p>
        </div>
      </div>
    );
  }

  const programData: StudentProgram = studentProgram ? {
    ...studentProgram,
    // Ensure we keep the data from API, including meals
    meals: studentProgram.meals || [],
    exercises: studentProgram.exercises || [],
    supplements: studentProgram.supplements || []
  } : {
    // Empty fallback - show message that no program exists instead of fake data
    id: 0,
    name: "برنامه‌ای تعریف نشده است",
    startDate: "",
    endDate: "",
    duration: "",
    status: 'inactive',
    progress: 0,
    exercises: [],
    meals: [],
    supplements: [],
    goals: [],
    trainerNotes: "لطفاً با مربی خود تماس بگیرید تا برنامه مناسبی برای شما طراحی شود."
  };
  
  console.log('Final programData meals count:', programData.meals?.length || 0);

  if (!currentStudent) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <Card className="p-8 text-center">
          <CardContent>
            <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">خطا در بارگذاری</h2>
            <p className="text-gray-600">اطلاعات شاگرد یافت نشد. لطفاً دوباره وارد شوید.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'active': { label: 'فعال', color: 'bg-emerald-500' },
      'completed': { label: 'تکمیل شده', color: 'bg-sky-500' },
      'paused': { label: 'متوقف شده', color: 'bg-amber-500' }
    };
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.active;
    
    return (
      <Badge className={`${statusInfo.color} text-white px-3 py-1`}>
        {statusInfo.label}
      </Badge>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50/30 to-emerald-50/40 p-4 md:p-6 lg:p-8"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-l from-emerald-500 via-sky-500 to-emerald-600 rounded-2xl p-6 md:p-8 text-white shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{programData.name}</h1>
                  <p className="text-emerald-100">برنامه اختصاصی شما</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 mt-4">
                {getStatusBadge(programData.status)}
                <div className="flex items-center gap-2 text-emerald-100">
                  <Calendar className="w-4 h-4" />
                  <span>{programData.startDate} تا {programData.endDate}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-100">
                  <Clock className="w-4 h-4" />
                  <span>مدت: {programData.duration}</span>
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="text-3xl font-bold">{toPersianNumbers(programData.progress.toString())}%</div>
              <div className="text-emerald-100">پیشرفت کلی</div>
              <Progress 
                value={programData.progress} 
                className="w-32 h-2 mt-2 bg-white/20"
              />
            </div>
          </div>
        </motion.div>

        {/* Goals Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                اهداف برنامه
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {programData.goals.map((goal, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-sky-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">{goal}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trainer Notes */}
        {programData.trainerNotes && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-sky-500" />
                  نکات مربی
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gradient-to-r from-sky-50 to-primary/10 rounded-lg border-r-4 border-sky-500">
                  <p className="text-gray-700 leading-relaxed">{programData.trainerNotes}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Program Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <ProgramTabsHeader />
            <ProgramTabsContent 
              student={currentStudent}
              exercises={programData.exercises}
              meals={programData.meals}
              supplements={programData.supplements}
              onSaveExercises={(exercises, day) => true}
              onSaveDiet={(mealIds) => true}
              onSaveSupplements={(data) => true}
            />
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StudentProgram;