export interface StudentProfile {
  id: number;
  name: string;
  phone: string;
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female';
  goalType?: string;
  activityLevel?: string;
  medicalConditions?: string;
  goals?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
  preferences?: {
    exerciseTypes: string[];
    dietaryRestrictions: string[];
    availableDays: string[];
    preferredTime: string;
  };
  measurements?: {
    chest?: number;
    waist?: number;
    hip?: number;
    bodyFatPercentage?: number;
  };
  joinDate?: string;
  lastUpdate?: string;
  avatar?: string;
  trainer?: {
    id: number;
    name: string;
    phone: string;
  };
}

export interface ProfileFormData {
  name: string;
  age: number;
  weight: number;
  height: number;
  goals: string[];
  medicalConditions: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  preferences: {
    exerciseTypes: string[];
    dietaryRestrictions: string[];
    availableDays: string[];
    preferredTime: string;
  };
  measurements: {
    chest?: number;
    waist?: number;
    hip?: number;
    bodyFatPercentage?: number;
  };
}