
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { Student } from '@shared/schema';

export interface StudentProgram {
  studentId: number;
  exercises: any[];
  diet: any[];
  supplements: any[];
  vitamins: any[];
}

export function useStudentPrograms(studentId?: number) {
  const queryClient = useQueryClient();

  // Fetch student programs from API
  const { data: programs = [], isLoading } = useQuery({
    queryKey: ['/api/student-programs'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get current student program
  const currentStudentProgram = studentId 
    ? (programs as StudentProgram[]).find((p: StudentProgram) => p.studentId === studentId) || null
    : null;

  // Update student program mutation
  const updateStudentProgramMutation = useMutation({
    mutationFn: ({ studentId, programData }: { studentId: number; programData: Partial<StudentProgram> }) =>
      apiRequest(`/student-programs/${studentId}`, {
        method: 'PUT',
        body: programData,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/student-programs'] });
    },
  });

  const getStudentProgram = (id: number): StudentProgram | null => {
    return (programs as StudentProgram[]).find((p: StudentProgram) => p.studentId === id) || null;
  };

  const updateStudentProgram = (studentId: number, programData: Partial<StudentProgram>) => {
    updateStudentProgramMutation.mutate({ studentId, programData });
  };

  return {
    programs,
    isLoading,
    currentStudentProgram,
    getStudentProgram,
    updateStudentProgram
  };
}
