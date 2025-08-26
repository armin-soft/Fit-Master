import { useQuery } from "@tanstack/react-query";
import { StudentProfile } from "../types/studentProfile";

interface StudentData {
  id: number;
  name: string;
  age: number;
  height: number;
  weight: number;
  image?: string;
  phone?: string;
  email?: string;
  joinDate?: string;
  fitnessGoal?: string;
  activityLevel?: string;
  medicalConditions?: string;
}

export const useStudentProfile = () => {
  // Get current student profile from API
  const { data: studentData, isLoading, error } = useQuery<StudentData>({
    queryKey: ['/api/current-student'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Calculate BMI and category from real data
  const calculateBMI = (weight: number, height: number) => {
    if (!weight || !height) return { bmi: 0, bmiCategory: "نرمال" };
    
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let bmiCategory = "نرمال";
    if (bmi < 18.5) bmiCategory = "کم وزن";
    else if (bmi >= 25) bmiCategory = "اضافه وزن";
    else if (bmi >= 30) bmiCategory = "چاق";

    return { bmi: Math.round(bmi * 10) / 10, bmiCategory };
  };

  if (!studentData || isLoading) {
    return {
      id: 0,
      name: "",
      phone: "",
      age: 0,
      weight: 0,
      height: 0,
      gender: 'male' as const,
      goalType: "",
      activityLevel: "متوسط",
      medicalConditions: "",
      emergencyContact: {
        name: "",
        phone: "",
        relationship: ""
      },
      fitnessLevel: 'beginner' as const,
      preferences: {
        exerciseTypes: [],
        dietaryRestrictions: [],
        availableDays: [],
        preferredTime: ""
      },
      measurements: {},
      joinDate: "",
      lastUpdate: "",
      avatar: "/Assets/Image/Place-Holder.svg",
      isLoading
    };
  }

  const { bmi, bmiCategory } = calculateBMI(studentData.weight, studentData.height);

  // Transform to StudentProfile format
  return {
    id: studentData.id || 0,
    name: studentData.name || "",
    phone: studentData.phone || "",
    age: studentData.age || 0,
    weight: studentData.weight || 0,
    height: studentData.height || 0,
    gender: 'male' as const,
    goalType: studentData.fitnessGoal || "",
    activityLevel: studentData.activityLevel || "متوسط",
    medicalConditions: studentData.medicalConditions || "",
    emergencyContact: {
      name: "",
      phone: "",
      relationship: ""
    },
    fitnessLevel: 'beginner' as const,
    preferences: {
      exerciseTypes: [],
      dietaryRestrictions: [],
      availableDays: [],
      preferredTime: ""
    },
    measurements: {
      bodyFatPercentage: bmi
    },
    joinDate: studentData.joinDate || "",
    lastUpdate: new Date().toISOString(),
    avatar: studentData.image || "/Assets/Image/Place-Holder.svg",
    isLoading: false
  };
};