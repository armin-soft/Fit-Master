
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface StudentProfile {
  id: string;
  name: string;
  image?: string;
  profileImage?: string;
}

export const useStudentProfile = () => {
  // Fetch current student profile from API
  const { data: studentProfile, isLoading, error } = useQuery<StudentProfile | null>({
    queryKey: ['/api/current-student'],
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data: any) => {
      // Transform API data to student profile format - no fallback mock data
      if (!data) return null;
      return {
        id: data.id,
        name: data.name || '',
        image: data.image || data.profileImage || "/Assets/Image/Place-Holder.svg"
      };
    }
  });

  useEffect(() => {
    if (error) {
      console.error('خطا در بارگذاری پروفایل شاگرد:', error);
    }
  }, [error]);

  const profileImageSrc = studentProfile?.image || studentProfile?.profileImage || "/Assets/Image/Place-Holder.svg";

  return { studentProfile, profileImageSrc, isLoading };
};
