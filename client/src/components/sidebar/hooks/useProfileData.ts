
import { useState, useCallback } from "react";
import { TrainerProfile } from "../../modern-sidebar/types";

export const useProfileData = () => {
  const [trainerProfile, setTrainerProfile] = useState<TrainerProfile>({
    name: "مربی حرفه‌ای",
    phone: "",
    image: "",
    gymName: "",
    status: 'active',
    membersSince: "۱۴۰۲"
  });

  const loadProfile = useCallback(async () => {
    try {
      const response = await fetch('/api/trainer/profile', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const text = await response.text();
        if (text) {
          const profileData = JSON.parse(text);
          setTrainerProfile({
            name: profileData.name || "مربی حرفه‌ای",
            phone: profileData.phone || "",
            image: profileData.image || "",
            gymName: profileData.gymName || "",
            status: 'active',
            membersSince: "۱۴۰۲"
          });
        }
      } else {
        console.log('Profile API response not ok:', response.status);
      }
    } catch (error) {
      console.error('Error loading profile from API:', error);
    }
  }, []);

  return {
    trainerProfile,
    loadProfile
  };
};
