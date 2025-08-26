import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, TrendingUp, TrendingDown, Minus, Activity, Heart, Target, Zap, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface BMIDisplayProps {
  height: number; // in cm
  weight: number; // in kg
  name?: string;
  age?: number;
  gender?: 'male' | 'female';
}

// Advanced BMI calculation and interpretation functions
const calculateBMI = (weight: number, height: number): number => {
  if (!weight || !height || weight <= 0 || height <= 0) return 0;
  // Convert height from cm to meters
  const heightInMeters = height / 100;
  return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(2));
};

// Calculate Body Fat Percentage (using Jackson-Pollock method approximation)
const calculateBodyFat = (bmi: number, age: number, gender: 'male' | 'female'): number => {
  if (!bmi || !age) return 0;
  
  if (gender === 'male') {
    return parseFloat((1.2 * bmi + 0.23 * age - 16.2).toFixed(1));
  } else {
    return parseFloat((1.2 * bmi + 0.23 * age - 5.4).toFixed(1));
  }
};

// Calculate Lean Body Mass
const calculateLeanBodyMass = (weight: number, bodyFatPercentage: number): number => {
  if (!weight || !bodyFatPercentage) return 0;
  return parseFloat((weight * (1 - bodyFatPercentage / 100)).toFixed(1));
};

// Calculate Body Surface Area (using Mosteller formula)
const calculateBodySurfaceArea = (height: number, weight: number): number => {
  if (!height || !weight) return 0;
  return parseFloat((Math.sqrt((height * weight) / 3600)).toFixed(2));
};

// Calculate Basal Metabolic Rate (using Mifflin-St Jeor equation)
const calculateBMR = (weight: number, height: number, age: number, gender: 'male' | 'female'): number => {
  if (!weight || !height || !age) return 0;
  
  const baseBMR = 10 * weight + 6.25 * height - 5 * age;
  return Math.round(gender === 'male' ? baseBMR + 5 : baseBMR - 161);
};

// Calculate Waist-to-Height Ratio (approximate based on BMI)
const calculateWaistToHeightRatio = (bmi: number): number => {
  if (!bmi) return 0;
  // Approximation: WHtR ≈ (BMI - 18.5) * 0.015 + 0.4
  return parseFloat(Math.max(0.35, Math.min(0.7, (bmi - 18.5) * 0.015 + 0.4)).toFixed(2));
};

const getBMICategory = (bmi: number): {
  category: string;
  color: string;
  bgColor: string;
  description: string;
  icon: React.ReactNode;
  progressValue: number;
  riskLevel: string;
  recommendations: string[];
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor' | 'dangerous';
} => {
  if (bmi < 16) {
    return {
      category: "کمبود وزن شدید",
      color: "text-red-700 dark:text-red-300",
      bgColor: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700/30",
      description: "کمبود وزن خطرناک",
      icon: <AlertTriangle className="h-4 w-4" />,
      progressValue: (bmi / 16) * 10,
      riskLevel: "خطر بالا",
      recommendations: ["مراجعه فوری به پزشک متخصص", "رژیم غذایی پرکالری", "آزمایش‌های تشخیصی"],
      healthStatus: 'dangerous'
    };
  } else if (bmi >= 16 && bmi < 18.5) {
    return {
      category: "کمبود وزن",
      color: "text-blue-700 dark:text-blue-300",
      bgColor: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700/30",
      description: "وزن کمتر از حد طبیعی",
      icon: <TrendingDown className="h-4 w-4" />,
      progressValue: 10 + ((bmi - 16) / (18.5 - 16)) * 15,
      riskLevel: "خطر متوسط",
      recommendations: ["افزایش کالری دریافتی", "رژیم غذایی متعادل", "تمرینات قدرتی ملایم"],
      healthStatus: 'fair'
    };
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return {
      category: "وزن طبیعی",
      color: "text-green-700 dark:text-green-300",
      bgColor: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700/30",
      description: "وزن در محدوده سالم",
      icon: <CheckCircle2 className="h-4 w-4" />,
      progressValue: 25 + ((bmi - 18.5) / (24.9 - 18.5)) * 25,
      riskLevel: "خطر کم",
      recommendations: ["حفظ سبک زندگی فعال", "تغذیه متعادل", "ورزش منظم"],
      healthStatus: 'excellent'
    };
  } else if (bmi >= 25 && bmi <= 29.9) {
    return {
      category: "اضافه وزن",
      color: "text-orange-700 dark:text-orange-300",
      bgColor: "bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-700/30",
      description: "وزن بیش از حد طبیعی",
      icon: <TrendingUp className="h-4 w-4" />,
      progressValue: 50 + ((bmi - 25) / (29.9 - 25)) * 25,
      riskLevel: "خطر متوسط",
      recommendations: ["کاهش ۵-۱۰% وزن", "کاهش کالری روزانه", "ورزش هوازی منظم"],
      healthStatus: 'fair'
    };
  } else if (bmi >= 30 && bmi <= 34.9) {
    return {
      category: "چاقی درجه یک",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700/30",
      description: "چاقی ملایم",
      icon: <Activity className="h-4 w-4" />,
      progressValue: 75 + ((bmi - 30) / (34.9 - 30)) * 12.5,
      riskLevel: "خطر بالا",
      recommendations: ["کاهش ۱۰-۱۵% وزن", "مشاوره تغذیه", "برنامه ورزشی تحت نظارت"],
      healthStatus: 'poor'
    };
  } else if (bmi >= 35 && bmi <= 39.9) {
    return {
      category: "چاقی درجه دو",
      color: "text-red-700 dark:text-red-300",
      bgColor: "bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700/40",
      description: "چاقی متوسط",
      icon: <AlertTriangle className="h-4 w-4" />,
      progressValue: 87.5 + ((bmi - 35) / (39.9 - 35)) * 7.5,
      riskLevel: "خطر بالا",
      recommendations: ["مراجعه به متخصص", "کاهش ۱۵-۲۰% وزن", "نظارت پزشکی مداوم"],
      healthStatus: 'poor'
    };
  } else {
    return {
      category: "چاقی مفرط",
      color: "text-red-800 dark:text-red-200",
      bgColor: "bg-red-100 border-red-400 dark:bg-red-900/40 dark:border-red-600/50",
      description: "چاقی خطرناک",
      icon: <AlertTriangle className="h-4 w-4" />,
      progressValue: 95 + Math.min(((bmi - 40) / 20) * 5, 5),
      riskLevel: "خطر بسیار بالا",
      recommendations: ["مراجعه فوری به پزشک", "ممکن بودن جراحی", "درمان‌های تخصصی"],
      healthStatus: 'dangerous'
    };
  }
};

const getIdealWeight = (height: number, gender?: string): { min: number; max: number } => {
  // Using BMI range 18.5-24.9 for ideal weight calculation
  const heightInMeters = height / 100;
  const minWeight = 18.5 * heightInMeters * heightInMeters;
  const maxWeight = 24.9 * heightInMeters * heightInMeters;
  
  return {
    min: Math.round(minWeight * 10) / 10,
    max: Math.round(maxWeight * 10) / 10,
  };
};

export const BMIDisplay: React.FC<BMIDisplayProps> = ({ height, weight, name, age, gender }) => {
  const bmi = calculateBMI(weight, height);
  const bmiInfo = getBMICategory(bmi);
  const idealWeight = getIdealWeight(height);
  const bodyFat = age && gender ? calculateBodyFat(bmi, age, gender) : 0;
  const leanBodyMass = bodyFat > 0 ? calculateLeanBodyMass(weight, bodyFat) : 0;
  const bodySurfaceArea = calculateBodySurfaceArea(height, weight);
  const bmr = age && gender ? calculateBMR(weight, height, age, gender) : 0;
  const waistToHeightRatio = calculateWaistToHeightRatio(bmi);

  if (!height || !weight || height <= 0 || weight <= 0) {
    return (
      <Badge variant="outline" className="gap-2 bg-gray-50 text-gray-500 border-gray-200 dark:bg-gray-900/20 dark:border-gray-700/30 dark:text-gray-400">
        <Minus className="h-3.5 w-3.5" />
        نامشخص
      </Badge>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-2 text-xs py-1 px-3 hover:opacity-80 transition-all ${bmiInfo.bgColor} ${bmiInfo.color} border rounded-full`}
        >
          <Scale className="h-3.5 w-3.5" />
          <span className="font-bold">{toPersianNumbers(bmi.toString())}</span>
          <span className="text-xs">{bmiInfo.category}</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/20 dark:from-slate-800/60 dark:via-slate-800/40 dark:to-slate-800/20 backdrop-blur-xl rounded-xl" />
        
        <div className="relative z-10">
          <DialogHeader className="text-center space-y-4 mb-6">
            <div className="flex items-center justify-center gap-4">
              <div className={`p-4 rounded-2xl ${bmiInfo.bgColor} border-2`}>
                <Scale className={`h-8 w-8 ${bmiInfo.color}`} />
              </div>
              <div className="text-right">
                <DialogTitle className="text-2xl font-bold">
                  تحلیل پیشرفته ترکیب بدن {name ? `- ${name}` : ""}
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">
                  محاسبات دقیق و تحلیل کامل وضعیت سلامت
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Main BMI Info */}
            <div className="space-y-6">
              {/* BMI Value Display */}
              <Card className="border-0 bg-gradient-to-br from-white/40 to-white/20 dark:from-slate-800/40 dark:to-slate-800/20 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3">
                      {bmiInfo.icon}
                      <span className={`text-4xl font-bold ${bmiInfo.color}`}>
                        {toPersianNumbers(bmi.toString())}
                      </span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-base px-6 py-2 ${bmiInfo.bgColor} ${bmiInfo.color} border-current`}
                    >
                      {bmiInfo.category}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {bmiInfo.description}
                    </p>
                    <Badge 
                      variant="outline" 
                      className={`text-sm px-4 py-1 ${
                        bmiInfo.healthStatus === 'excellent' ? 'bg-green-100 text-green-800 border-green-300' :
                        bmiInfo.healthStatus === 'good' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                        bmiInfo.healthStatus === 'fair' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                        bmiInfo.healthStatus === 'poor' ? 'bg-orange-100 text-orange-800 border-orange-300' :
                        'bg-red-100 text-red-800 border-red-300'
                      }`}
                    >
                      {bmiInfo.riskLevel}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Body Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-0 bg-gradient-to-br from-emerald-50/60 to-emerald-50/30 dark:from-emerald-900/60 dark:to-emerald-900/30">
                  <CardContent className="p-4 text-center">
                    <div className="text-sm text-muted-foreground mb-2">قد</div>
                    <div className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
                      {toPersianNumbers(height.toString())} سم
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 bg-gradient-to-br from-sky-50/60 to-sky-50/30 dark:from-sky-900/60 dark:to-sky-900/30">
                  <CardContent className="p-4 text-center">
                    <div className="text-sm text-muted-foreground mb-2">وزن</div>
                    <div className="text-xl font-bold text-sky-700 dark:text-sky-300">
                      {toPersianNumbers(weight.toString())} کیلو
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Ideal Weight */}
              <Card className="border-0 bg-gradient-to-br from-amber-50/60 to-amber-50/30 dark:from-amber-900/60 dark:to-amber-900/30">
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <div className="text-sm text-muted-foreground">محدوده وزن ایده‌آل</div>
                    <div className="text-lg font-bold text-amber-700 dark:text-amber-300">
                      {toPersianNumbers(idealWeight.min.toString())} - {toPersianNumbers(idealWeight.max.toString())} کیلوگرم
                    </div>
                    <div className="text-xs text-muted-foreground">
                      بر اساس قد و استانداردهای سلامت
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Advanced Calculations */}
            <div className="space-y-6">
              {/* Advanced Body Composition */}
              {age && gender && (
                <Card className="border-0 bg-gradient-to-br from-purple-50/60 to-purple-50/30 dark:from-purple-900/60 dark:to-purple-900/30">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-center flex items-center justify-center gap-2">
                      <Target className="h-5 w-5" />
                      ترکیب بدن پیشرفته
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">درصد چربی بدن</span>
                        <span className="font-bold text-purple-700 dark:text-purple-300">
                          {toPersianNumbers(bodyFat.toString())}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">توده عضلانی</span>
                        <span className="font-bold text-purple-700 dark:text-purple-300">
                          {toPersianNumbers(leanBodyMass.toString())} کیلو
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">متابولیسم پایه (BMR)</span>
                        <span className="font-bold text-purple-700 dark:text-purple-300">
                          {toPersianNumbers(bmr.toString())} کالری
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Body Measurements */}
              <Card className="border-0 bg-gradient-to-br from-indigo-50/60 to-indigo-50/30 dark:from-indigo-900/60 dark:to-indigo-900/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-center flex items-center justify-center gap-2">
                    <Info className="h-5 w-5" />
                    اندازه‌گیری‌های بدن
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">سطح بدن (BSA)</span>
                      <span className="font-bold text-indigo-700 dark:text-indigo-300">
                        {toPersianNumbers(bodySurfaceArea.toString())} m²
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">نسبت دور کمر به قد</span>
                      <span className="font-bold text-indigo-700 dark:text-indigo-300">
                        {toPersianNumbers(waistToHeightRatio.toString())}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                      {waistToHeightRatio < 0.5 ? 'نسبت سالم' : waistToHeightRatio < 0.6 ? 'نیاز به بررسی' : 'نسبت بالا'}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Health Recommendations */}
              <Card className="border-0 bg-gradient-to-br from-teal-50/60 to-teal-50/30 dark:from-teal-900/60 dark:to-teal-900/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-center flex items-center justify-center gap-2">
                    <Heart className="h-5 w-5" />
                    توصیه‌های سلامت
                  </h3>
                  <div className="space-y-3">
                    {bmiInfo.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {recommendation}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* BMI Range Progress */}
          <div className="space-y-3 mt-6">
            <h3 className="text-lg font-semibold text-center">محدوده BMI</h3>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>کمبود وزن</span>
              <span>طبیعی</span>
              <span>اضافه وزن</span>
              <span>چاقی</span>
            </div>
            <Progress 
              value={bmiInfo.progressValue} 
              className="h-4 bg-gradient-to-r from-blue-200 via-green-200 via-orange-200 to-red-200"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{toPersianNumbers("18.5")}</span>
              <span>{toPersianNumbers("24.9")}</span>
              <span>{toPersianNumbers("29.9")}</span>
              <span>{toPersianNumbers("35+")}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};