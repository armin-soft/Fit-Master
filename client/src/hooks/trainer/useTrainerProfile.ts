import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TrainerProfile } from '@/types/trainer';

interface UseTrainerProfileReturn {
  profile: TrainerProfile | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useTrainerProfile = (): UseTrainerProfileReturn => {
  const [profile, setProfile] = useState<TrainerProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading, error: queryError, refetch } = useQuery({
    queryKey: ['trainerProfile'],
    queryFn: async () => {
      // Fetch directly from the database API instead of storage
      try {
        const response = await fetch('/api/trainer/profile', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const text = await response.text();
          if (text.trim() === '') {
            // Empty response, return default profile
            return {
              name: '',
              bio: '',
              phone: '',
              image: '/Assets/Image/Place-Holder.svg',
              gymName: '',
              gymDescription: '',
              gymAddress: '',
              instagram: '',
              website: ''
            };
          }
          try {
            const profileData = JSON.parse(text);
            return profileData;
          } catch (jsonError) {
            console.error('JSON parsing error:', jsonError);
            // Return default profile if JSON parsing fails
            return {
              name: '',
              bio: '',
              phone: '',
              image: '/Assets/Image/Place-Holder.svg',
              gymName: '',
              gymDescription: '',
              gymAddress: '',
              instagram: '',
              website: ''
            };
          }
        } else {
          // Check if response has content before trying to parse
          const text = await response.text();
          if (text.trim() !== '') {
            try {
              const errorData = JSON.parse(text);
              console.error('API Error:', errorData);
            } catch (jsonError) {
              console.error('Non-JSON error response:', text);
            }
          }
          // Return default profile if API fails
          return {
            name: '',
            bio: '',
            phone: '',
            image: '/Assets/Image/Place-Holder.svg',
            gymName: '',
            gymDescription: '',
            gymAddress: '',
            instagram: '',
            website: ''
          };
        }
      } catch (error) {
        console.error('Failed to fetch trainer profile:', error);
        // Return default profile on error
        return {
          name: '',
          bio: '',
          phone: '',
          image: '/Assets/Image/Place-Holder.svg',
          gymName: '',
          gymDescription: '',
          gymAddress: '',
          instagram: '',
          website: ''
        };
      }
    },
    retry: 2,
    staleTime: 1 * 60 * 1000, // 1 minute to ensure fresh data
  });

  useEffect(() => {
    if (data) {
      setProfile({
        name: data.name || '',
        bio: data.bio || '',
        phone: data.phone || '',
        image: data.image || '/Assets/Image/Place-Holder.svg',
        gymName: data.gymName || '',
        gymDescription: data.gymDescription || '',
        gymAddress: data.gymAddress || '',
        instagram: data.instagram || '',
        website: data.website || ''
      });
      setError(null);
    } else if (queryError) {
      setError(queryError.message);
    }
  }, [data, queryError]);

  return {
    profile,
    isLoading,
    error,
    refetch
  };
};