
export interface Student {
  id: number;
  name: string;
  phone: string;
  height: number;
  weight: number;
  image: string;
  age: number;
  gender: "male" | "female";
  programAmount?: number;
  goalType: string;
  activityLevel: string;
  medicalConditions: string;
  exercises?: number[];
  exerciseSets?: Record<number, number>;
  exerciseReps?: Record<number, string>;
  exercisesDay1?: number[];
  exerciseSetsDay1?: Record<number, number>;
  exerciseRepsDay1?: Record<number, string>;
  exercisesDay2?: number[];
  exerciseSetsDay2?: Record<number, number>;
  exerciseRepsDay2?: Record<number, string>;
  exercisesDay3?: number[];
  exerciseSetsDay3?: Record<number, number>;
  exerciseRepsDay3?: Record<number, string>;
  exercisesDay4?: number[];
  exerciseSetsDay4?: Record<number, number>;
  exerciseRepsDay4?: Record<number, string>;
  exercisesDay5?: number[];
  exerciseSetsDay5?: Record<number, number>;
  exerciseRepsDay5?: Record<number, string>;
  exercisesDay6?: number[];
  exerciseSetsDay6?: Record<number, number>;
  exerciseRepsDay6?: Record<number, string>;
  exercisesDay7?: number[];
  exerciseSetsDay7?: Record<number, number>;
  exerciseRepsDay7?: Record<number, string>;
  meals?: number[];
  mealsDay1?: number[];
  mealsDay2?: number[];
  mealsDay3?: number[];
  mealsDay4?: number[];
  mealsDay5?: number[];
  mealsDay6?: number[];
  mealsDay7?: number[];
  supplements?: number[];
  supplementsDay1?: number[];
  vitamins?: number[];
  vitaminsDay1?: number[];
  isActive?: boolean; // دسترسی فعال/غیرفعال
  createdAt?: string;
  progress?: number;
}

export type StudentFormData = Omit<Student, 'id' | 'createdAt' | 'progress'>;
