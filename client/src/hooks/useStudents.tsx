
import { useQuery } from '@tanstack/react-query';
import type { Student } from '../../../shared/schema';

export const useStudents = () => {
  const { data: students = [], isLoading, error } = useQuery({
    queryKey: ['/api/students'],
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return { 
    students, 
    isLoading, 
    error 
  };
};
