
import { toPersianNumbers, formatNumber } from "@/lib/utils/numbers";
import { Student } from "@/components/students/StudentTypes";



/**
 * Format measurements with Persian numbers
 */
export function formatMeasurement(value: string | number | undefined, unit: string): string {
  if (!value) return '';
  
  try {
    const persianValue = toPersianNumbers(value);
    return `${persianValue} ${unit}`;
  } catch (error) {
    console.error("Error formatting measurement:", error);
    return `${value} ${unit}`;
  }
}

/**
 * Calculate BMI
 */
export function calculateBMI(weight: string | number, height: string | number): number | null {
  if (!weight || !height) return null;
  
  const weightValue = parseFloat(weight.toString());
  const heightValue = parseFloat(height.toString()) / 100; // Convert to meters
  
  if (isNaN(weightValue) || isNaN(heightValue) || heightValue <= 0) return null;
  
  const bmi = weightValue / (heightValue * heightValue);
  return Math.round(bmi * 10) / 10; // Round to 1 decimal place
}

/**
 * Get BMI category in Persian
 */
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'کمبود وزن';
  if (bmi < 25) return 'وزن طبیعی';
  if (bmi < 30) return 'اضافه وزن';
  if (bmi < 35) return 'چاقی درجه ۱';
  if (bmi < 40) return 'چاقی درجه ۲';
  return 'چاقی شدید';
}

/**
 * Calculate student progress percentage based on profile completion
 */
export function getStudentProgress(student: Student): number {
  // Define the required fields for a complete profile
  const requiredFields = ['name', 'phone', 'height', 'weight'];
  const optionalFields = ['image', 'exercises', 'meals', 'supplements', 'vitamins'];
  
  // Count how many required fields are filled
  const requiredCount = requiredFields.filter(field => 
    student[field as keyof Student] && 
    String(student[field as keyof Student]).trim() !== ''
  ).length;
  
  // Count how many optional fields are filled
  const optionalCount = optionalFields.filter(field => {
    const value = student[field as keyof Student];
    if (Array.isArray(value)) return value.length > 0;
    return value && String(value).trim() !== '';
  }).length;
  
  // Calculate basic profile completion percentage (based on required fields)
  const basicProgress = (requiredCount / requiredFields.length) * 70;
  
  // Calculate extra profile completion percentage (based on optional fields)
  const extraProgress = (optionalCount / optionalFields.length) * 30;
  
  // Total progress
  const totalProgress = Math.min(100, Math.round(basicProgress + extraProgress));
  
  return totalProgress;
}

/**
 * Get appropriate color for progress bar based on completion percentage
 */
export function getProgressColor(progress: number): string {
  if (progress < 30) return 'text-destructive';
  if (progress < 60) return 'text-primary';
  if (progress < 80) return 'text-secondary-foreground';
  if (progress < 100) return 'text-info-600';
  return 'text-brand-500';
}
