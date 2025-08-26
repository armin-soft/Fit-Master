
import { Student } from "@/components/students/StudentTypes";

export const isValidStudentPhone = (phone: string, students: Student[]): boolean => {
  console.log('validation: Checking phone:', phone);
  console.log('validation: Available students:', students.length);
  
  if (students.length === 0) {
    console.log('validation: No students loaded yet');
    return false;
  }
  
  const foundStudent = students.find(student => {
    const studentPhone = student.phone?.trim();
    const inputPhone = phone?.trim();
    console.log(`Comparing: "${studentPhone}" === "${inputPhone}"`);
    return studentPhone === inputPhone;
  });
  
  console.log('validation: Found student:', foundStudent);
  return !!foundStudent;
};

export const findStudentByPhone = (phone: string, students: Student[]): Student | undefined => {
  return students.find(s => s.phone === phone);
};
