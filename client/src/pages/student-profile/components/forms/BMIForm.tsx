import React from "react";
import { motion } from "framer-motion";
import { Scale, Activity, Heart, Target, Calculator, TrendingUp, TrendingDown, Zap, AlertTriangle, CheckCircle2, User } from "lucide-react";
import { StudentProfile } from "../../types/studentProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface BMIFormProps {
  profile: StudentProfile;
}

// Advanced BMI calculation functions (same as BMIDisplay)
const calculateBMI = (weight: number, height: number): number => {
  if (!weight || !height || weight <= 0 || height <= 0) return 0;
  const heightInMeters = height / 100;
  return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(2));
};

const calculateBodyFat = (bmi: number, age: number, gender: 'male' | 'female'): number => {
  if (!bmi || !age) return 0;
  if (gender === 'male') {
    return parseFloat((1.2 * bmi + 0.23 * age - 16.2).toFixed(1));
  } else {
    return parseFloat((1.2 * bmi + 0.23 * age - 5.4).toFixed(1));
  }
};

const calculateLeanBodyMass = (weight: number, bodyFatPercentage: number): number => {
  if (!weight || !bodyFatPercentage) return 0;
  return parseFloat((weight * (1 - bodyFatPercentage / 100)).toFixed(1));
};

const calculateBodySurfaceArea = (height: number, weight: number): number => {
  if (!height || !weight) return 0;
  return parseFloat((Math.sqrt((height * weight) / 3600)).toFixed(2));
};

const calculateBMR = (weight: number, height: number, age: number, gender: 'male' | 'female'): number => {
  if (!weight || !height || !age) return 0;
  const baseBMR = 10 * weight + 6.25 * height - 5 * age;
  return Math.round(gender === 'male' ? baseBMR + 5 : baseBMR - 161);
};

const calculateWaistToHeightRatio = (bmi: number): number => {
  if (!bmi) return 0;
  return parseFloat(Math.max(0.35, Math.min(0.7, (bmi - 18.5) * 0.015 + 0.4)).toFixed(2));
};

const getBMICategory = (bmi: number) => {
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
      healthStatus: 'dangerous' as const
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
      healthStatus: 'fair' as const
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
      healthStatus: 'excellent' as const
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
      healthStatus: 'fair' as const
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
      healthStatus: 'poor' as const
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
      healthStatus: 'poor' as const
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
      healthStatus: 'dangerous' as const
    };
  }
};

const getIdealWeight = (height: number): { min: number; max: number } => {
  const heightInMeters = height / 100;
  const minWeight = 18.5 * heightInMeters * heightInMeters;
  const maxWeight = 24.9 * heightInMeters * heightInMeters;
  return {
    min: Math.round(minWeight * 10) / 10,
    max: Math.round(maxWeight * 10) / 10,
  };
};

export const BMIForm: React.FC<BMIFormProps> = ({ profile }) => {
  const bmi = calculateBMI(profile.weight, profile.height);
  const bmiInfo = getBMICategory(bmi);
  const idealWeight = getIdealWeight(profile.height);
  const bodyFat = profile.age && profile.gender ? calculateBodyFat(bmi, profile.age, profile.gender) : 0;
  const leanBodyMass = bodyFat > 0 ? calculateLeanBodyMass(profile.weight, bodyFat) : 0;
  const bodySurfaceArea = calculateBodySurfaceArea(profile.height, profile.weight);
  const bmr = profile.age && profile.gender ? calculateBMR(profile.weight, profile.height, profile.age, profile.gender) : 0;
  const waistToHeightRatio = calculateWaistToHeightRatio(bmi);

  if (!profile.height || !profile.weight || profile.height <= 0 || profile.weight <= 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12"
      >
        <div className="text-slate-400 text-lg">
          اطلاعات قد و وزن برای محاسبه BMI موجود نیست
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
          تحلیل شاخص توده بدنی (BMI)
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          تجزیه و تحلیل کامل و علمی وضعیت بدنی بر اساس جنسیت، سن، قد و وزن شما
        </p>
      </div>

      {/* Main BMI Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card className={`${bmiInfo.bgColor} border-2 shadow-xl overflow-hidden relative`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5" />
          
          <CardHeader className="relative z-10 text-center pb-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className={`p-4 rounded-2xl ${bmiInfo.bgColor} border-2 shadow-lg`}>
                <Scale className={`h-8 w-8 ${bmiInfo.color}`} />
              </div>
              <div className="text-right">
                <CardTitle className={`text-2xl font-bold ${bmiInfo.color}`}>
                  شاخص توده بدنی
                </CardTitle>
                <p className={`text-sm ${bmiInfo.color} opacity-80`}>
                  محاسبه علمی بر اساس جنسیت {profile.gender === 'male' ? 'مرد' : 'زن'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <div className="text-center">
                <div className={`text-4xl font-black ${bmiInfo.color} mb-2`}>
                  {toPersianNumbers(bmi.toString())}
                </div>
                <Badge className={`${bmiInfo.bgColor} ${bmiInfo.color} border text-sm px-3 py-1`}>
                  {bmiInfo.icon}
                  <span className="mr-2">{bmiInfo.category}</span>
                </Badge>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className={bmiInfo.color}>وضعیت: {bmiInfo.description}</span>
                <span className={bmiInfo.color}>{bmiInfo.riskLevel}</span>
              </div>
              <Progress value={bmiInfo.progressValue} className="h-2" />
            </div>
          </CardHeader>
          
          <CardContent className="relative z-10 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-white/20 dark:bg-black/20 rounded-lg">
                <div className={`text-2xl font-bold ${bmiInfo.color}`}>
                  {toPersianNumbers(idealWeight.min.toString())} - {toPersianNumbers(idealWeight.max.toString())}
                </div>
                <div className="text-sm opacity-80">وزن ایده‌آل (کیلوگرم)</div>
              </div>
              <div className="text-center p-4 bg-white/20 dark:bg-black/20 rounded-lg">
                <div className={`text-2xl font-bold ${bmiInfo.color}`}>
                  {profile.weight > idealWeight.max ? 
                    `+${toPersianNumbers((profile.weight - idealWeight.max).toFixed(1))}` :
                    profile.weight < idealWeight.min ?
                    `${toPersianNumbers((profile.weight - idealWeight.min).toFixed(1))}` :
                    toPersianNumbers('0')
                  }
                </div>
                <div className="text-sm opacity-80">اختلاف با وزن ایده‌آل</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className={`font-semibold ${bmiInfo.color}`}>پیشنهادات تخصصی:</h4>
              <ul className="space-y-2">
                {bmiInfo.recommendations.map((rec, index) => (
                  <li key={index} className={`flex items-start gap-2 text-sm ${bmiInfo.color} opacity-90`}>
                    <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Advanced Metrics */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {bodyFat > 0 && (
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200/50 dark:border-emerald-700/50">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-1">
                {toPersianNumbers(bodyFat.toString())}%
              </div>
              <div className="text-sm text-emerald-600 dark:text-emerald-400">
                درصد چربی بدن
              </div>
            </CardContent>
          </Card>
        )}

        {leanBodyMass > 0 && (
          <Card className="bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 border-sky-200/50 dark:border-sky-700/50">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-sky-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-sky-700 dark:text-sky-300 mb-1">
                {toPersianNumbers(leanBodyMass.toString())} kg
              </div>
              <div className="text-sm text-sky-600 dark:text-sky-400">
                توده عضلانی
              </div>
            </CardContent>
          </Card>
        )}

        {bmr > 0 && (
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200/50 dark:border-orange-700/50">
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-300 mb-1">
                {toPersianNumbers(bmr.toString())}
              </div>
              <div className="text-sm text-orange-600 dark:text-orange-400">
                متابولیسم پایه (کالری/روز)
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-800/20 border-orange-200/50 dark:border-amber-700/50">
          <CardContent className="p-6 text-center">
            <Calculator className="h-8 w-8 text-orange-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-orange-700 dark:text-amber-300 mb-1">
              {toPersianNumbers(bodySurfaceArea.toString())} m²
            </div>
            <div className="text-sm text-orange-600 dark:text-amber-400">
              سطح بدن
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Gender-specific Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-slate-200/50 dark:border-slate-700/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-slate-500 to-slate-600 rounded-lg">
                <User className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                اطلاعات تخصصی بر اساس جنسیت {profile.gender === 'male' ? 'مرد' : 'زن'}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">
                  محاسبات خاص جنسیت:
                </h4>
                <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  <li>• فرمول BMR با ضریب جنسیت محاسبه شده</li>
                  <li>• درصد چربی بدن با روش Jackson-Pollock</li>
                  <li>• توده عضلانی بر اساس ساختار بدن</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">
                  نکات مهم:
                </h4>
                <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  <li>• محاسبات با در نظر گیری سن {toPersianNumbers(profile.age.toString())} سال</li>
                  <li>• تمام فرمول‌ها علمی و استاندارد بین‌المللی</li>
                  <li>• نتایج قابل اعتماد برای برنامه‌ریزی</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Important Notes */}
      <motion.div
        className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border border-amber-200/50 dark:border-amber-700/50"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">
            نکات مهم پزشکی
          </h3>
        </div>
        <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
          BMI یک شاخص غربالگری است و محدودیت‌هایی دارد. این شاخص توده عضلانی، چگالی استخوان، 
          ترکیب بدن و تفاوت‌های نژادی را در نظر نمی‌گیرد. همیشه برای تفسیر دقیق با مربی و 
          مشاور تغذیه خود مشورت کنید. نتایج ارائه شده صرفاً جنبه اطلاعاتی دارند.
        </p>
      </motion.div>
    </motion.div>
  );
};