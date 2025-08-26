import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { 
  Dumbbell, 
  Calendar, 
  Clock, 
  Target, 
  Trophy,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Timer,
  Weight,
  Activity,
  TrendingUp,
  Star
} from "lucide-react";

// Days of the week in Persian
const DAYS = [
  { id: 1, name: 'شنبه', short: 'ش' },
  { id: 2, name: 'یکشنبه', short: 'ی' },
  { id: 3, name: 'دوشنبه', short: 'د' },
  { id: 4, name: 'سه‌شنبه', short: 'س' },
  { id: 5, name: 'چهارشنبه', short: 'چ' },
  { id: 6, name: 'پنج‌شنبه', short: 'پ' },
  { id: 7, name: 'جمعه', short: 'ج' }
];

// Exercise difficulty colors
const DIFFICULTY_COLORS: Record<string, string> = {
  'beginner': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  'intermediate': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  'advanced': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
};

// Rest timer component
const RestTimer: React.FC<{ seconds: number; onComplete: () => void; isActive: boolean }> = ({ 
  seconds, 
  onComplete, 
  isActive 
}) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  
  useEffect(() => {
    if (!isActive) return;
    
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, isActive, onComplete]);
  
  const progress = ((seconds - timeLeft) / seconds) * 100;
  
  return (
    <div className="text-center space-y-3">
      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
        {toPersianNumbers(Math.floor(timeLeft / 60))}:{toPersianNumbers(String(timeLeft % 60).padStart(2, '0'))}
      </div>
      <Progress value={progress} className="h-2" />
      <p className="text-sm text-muted-foreground">زمان استراحت</p>
    </div>
  );
};

const StudentExercises = () => {
  const [selectedDay, setSelectedDay] = useState<number>(1); // شروع از روز اول برنامه
  const [activeExercise, setActiveExercise] = useState<number | null>(null);
  const [completedSets, setCompletedSets] = useState<Record<number, number>>({});
  const [showRestTimer, setShowRestTimer] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const deviceInfo = useDeviceInfo();

  // Get current student data
  const { data: currentStudent, isLoading: isLoadingStudent } = useQuery<any>({
    queryKey: ['/api/current-student'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch student exercise programs
  const { data: exercisePrograms = [], isLoading: isLoadingExercises } = useQuery<any[]>({
    queryKey: [`/api/students/${currentStudent?.id}/exercise-programs`],
    enabled: !!currentStudent?.id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Filter exercises for selected day
  const todayExercises = exercisePrograms.filter((program: any) => 
    program.dayOfWeek === selectedDay || program.day === selectedDay
  );

  // Calculate progress
  const totalExercises = todayExercises.length;
  const completedExercises = Object.keys(completedSets).length;
  const progressPercentage = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;

  // Get selected day name
  const selectedDayName = DAYS.find(day => day.id === selectedDay)?.name || 'امروز';

  // Handle set completion
  const handleSetComplete = (exerciseId: number, restTime: number) => {
    const currentCompleted = completedSets[exerciseId] || 0;
    const exercise = todayExercises.find((ex: any) => ex.id === exerciseId);
    const totalSets = exercise?.sets || 1;
    
    if (currentCompleted < totalSets) {
      setCompletedSets(prev => ({
        ...prev,
        [exerciseId]: currentCompleted + 1
      }));
      
      if (restTime > 0 && currentCompleted + 1 < totalSets) {
        setShowRestTimer(exerciseId);
        setTimerActive(true);
      }
    }
  };

  // Handle rest timer completion
  const handleRestComplete = () => {
    setShowRestTimer(null);
    setTimerActive(false);
  };

  // Reset completed sets when day changes
  useEffect(() => {
    setCompletedSets({});
    setActiveExercise(null);
    setShowRestTimer(null);
    setTimerActive(false);
  }, [selectedDay]);

  // Responsive classes
  const containerPadding = deviceInfo.isMobile ? "p-4" : deviceInfo.isTablet ? "p-6" : "p-8";
  const cardPadding = deviceInfo.isMobile ? "p-4" : deviceInfo.isTablet ? "p-5" : "p-6";
  const gridCols = deviceInfo.isMobile ? "grid-cols-1" : deviceInfo.isTablet ? "grid-cols-2" : "grid-cols-3";

  if (isLoadingStudent || isLoadingExercises) {
    return (
      <div className={cn("min-h-screen flex items-center justify-center", containerPadding)} dir="rtl">
        <Card className={cn("text-center max-w-md w-full", cardPadding)}>
          <CardContent>
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">در حال بارگذاری برنامه تمرینی...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentStudent) {
    return (
      <div className={cn("min-h-screen flex items-center justify-center", containerPadding)} dir="rtl">
        <Card className={cn("text-center max-w-md w-full", cardPadding)}>
          <CardContent>
            <Dumbbell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">خطا در دریافت اطلاعات</h3>
            <p className="text-gray-600">اطلاعات شاگرد یافت نشد.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800", containerPadding)} dir="rtl">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              برنامه تمرینی
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {selectedDayName} - {toPersianNumbers(totalExercises)} تمرین برنامه‌ریزی شده
            </p>
          </div>
          <div className="text-left">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {toPersianNumbers(Math.round(progressPercentage))}%
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">پیشرفت امروز</p>
          </div>
        </div>

        {/* Progress Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
          <CardContent className={cardPadding}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8" />
                <div>
                  <h3 className="text-lg font-semibold">پیشرفت تمرین</h3>
                  <p className="text-blue-100">
                    {toPersianNumbers(completedExercises)} از {toPersianNumbers(totalExercises)} تمرین تکمیل شده
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{toPersianNumbers(completedExercises)}</div>
                <div className="text-sm text-blue-100">تکمیل شده</div>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-3 bg-white/20" />
          </CardContent>
        </Card>
      </motion.div>

      {/* Day Selection */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex gap-2 overflow-x-auto pb-2">
          {DAYS.map((day) => {
            const dayExerciseCount = exercisePrograms.filter((program: any) => 
              program.dayOfWeek === day.id || program.day === day.id
            ).length;
            
            return (
              <Button
                key={day.id}
                variant={selectedDay === day.id ? "default" : "outline"}
                className={cn(
                  "flex-shrink-0 min-w-[80px] h-16 flex-col gap-1",
                  selectedDay === day.id && "bg-blue-600 hover:bg-blue-700"
                )}
                onClick={() => setSelectedDay(day.id)}
                data-testid={`button-day-${day.id}`}
              >
                <span className="font-bold">{day.short}</span>
                <span className="text-xs">{toPersianNumbers(dayExerciseCount)}</span>
              </Button>
            );
          })}
        </div>
      </motion.div>

      {/* Rest Timer Modal */}
      {showRestTimer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => {
            setShowRestTimer(null);
            setTimerActive(false);
          }}
        >
          <Card className="w-80 mx-4" onClick={(e) => e.stopPropagation()}>
            <CardContent className="text-center p-8">
              <Timer className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <RestTimer 
                seconds={todayExercises.find((ex: any) => ex.id === showRestTimer)?.restTime || 60}
                onComplete={handleRestComplete}
                isActive={timerActive}
              />
              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={handleRestComplete}
                  className="flex-1"
                  data-testid="button-skip-rest"
                >
                  رد کردن
                </Button>
                <Button
                  onClick={() => setTimerActive(!timerActive)}
                  className="flex-1"
                  data-testid="button-toggle-timer"
                >
                  {timerActive ? <Pause className="w-4 h-4 ml-2" /> : <Play className="w-4 h-4 ml-2" />}
                  {timerActive ? 'توقف' : 'ادامه'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Exercises Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={cn("grid gap-6", gridCols)}
      >
        {todayExercises.length === 0 ? (
          <div className="col-span-full">
            <Card className={cardPadding}>
              <CardContent className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">تمرینی برای {selectedDayName} تعریف نشده</h3>
                <p className="text-gray-600">روز دیگری را انتخاب کنید یا با مربی خود تماس بگیرید.</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          todayExercises.map((exercise: any, index: number) => {
            const isCompleted = (completedSets[exercise.id] || 0) >= (exercise.sets || 1);
            const currentSets = completedSets[exercise.id] || 0;
            
            return (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className={cn(
                    "transition-all duration-300 hover:shadow-lg cursor-pointer border-2",
                    isCompleted ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : "hover:border-blue-200 dark:hover:border-blue-700",
                    activeExercise === exercise.id && "ring-2 ring-blue-500 ring-offset-2"
                  )}
                  onClick={() => setActiveExercise(activeExercise === exercise.id ? null : exercise.id)}
                  data-testid={`card-exercise-${exercise.id}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
                          {exercise.exerciseName || exercise.name || `تمرین ${index + 1}`}
                        </CardTitle>
                        <div className="flex items-center gap-2 flex-wrap">
                          {exercise.bodyPart && (
                            <Badge variant="secondary" className="text-xs">
                              {exercise.bodyPart}
                            </Badge>
                          )}
                          {exercise.difficulty && (
                            <Badge 
                              className={cn("text-xs", DIFFICULTY_COLORS[exercise.difficulty] || DIFFICULTY_COLORS.intermediate)}
                              variant="secondary"
                            >
                              {exercise.difficulty === 'beginner' ? 'مبتدی' : 
                               exercise.difficulty === 'intermediate' ? 'متوسط' : 'پیشرفته'}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-left">
                        {isCompleted ? (
                          <CheckCircle2 className="w-8 h-8 text-green-500" />
                        ) : (
                          <Target className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Exercise Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Activity className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-muted-foreground">ست</span>
                        </div>
                        <div className="font-bold text-lg">
                          {toPersianNumbers(currentSets)}/{toPersianNumbers(exercise.sets || 1)}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-muted-foreground">تکرار</span>
                        </div>
                        <div className="font-bold text-lg">
                          {toPersianNumbers(exercise.reps || 1)}
                        </div>
                      </div>
                      
                      {exercise.weight && (
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Weight className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-muted-foreground">وزن</span>
                          </div>
                          <div className="font-bold text-lg">
                            {toPersianNumbers(exercise.weight)} کیلو
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Exercise Progress */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">پیشرفت ست‌ها</span>
                        <span className="text-sm font-medium">
                          {toPersianNumbers(Math.round(((currentSets) / (exercise.sets || 1)) * 100))}%
                        </span>
                      </div>
                      <Progress value={((currentSets) / (exercise.sets || 1)) * 100} className="h-2" />
                    </div>

                    {/* Rest Time Info */}
                    {exercise.restTime && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>استراحت: {toPersianNumbers(exercise.restTime)} ثانیه</span>
                      </div>
                    )}

                    {/* Exercise Notes */}
                    {exercise.notes && (
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          {exercise.notes}
                        </p>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="pt-2">
                      {!isCompleted ? (
                        <Button
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetComplete(exercise.id, exercise.restTime || 0);
                          }}
                          disabled={showRestTimer !== null}
                          data-testid={`button-complete-set-${exercise.id}`}
                        >
                          <CheckCircle2 className="w-4 h-4 ml-2" />
                          تکمیل ست {toPersianNumbers(currentSets + 1)}
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          className="w-full bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                          disabled
                        >
                          <Star className="w-4 h-4 ml-2" />
                          تمرین تکمیل شد
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        )}
      </motion.div>
    </div>
  );
};

export default StudentExercises;