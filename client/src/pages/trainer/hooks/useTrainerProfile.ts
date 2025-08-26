
import { useState, useEffect } from "react";
import { TrainerProfile, defaultProfile, normalizeProfile } from "@/types/trainer";
import { useToast } from "@/hooks/use-toast";
// Removed databaseStorage import - using API endpoints instead

export const useTrainerProfile = () => {
  const [profile, setProfile] = useState<TrainerProfile>(defaultProfile);
  const [errors, setErrors] = useState<Partial<Record<keyof TrainerProfile, string>>>({});
  const [validFields, setValidFields] = useState<Partial<Record<keyof TrainerProfile, boolean>>>({});
  const [activeSection, setActiveSection] = useState("personal");
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load profile data from API on mount
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        // Get from database API endpoint
        const response = await fetch('/api/trainer/profile');
        if (response.ok) {
          const text = await response.text();
          if (text.trim() !== '') {
            try {
              const apiProfile = JSON.parse(text);
              if (apiProfile) {
                // Normalize the profile to ensure all fields are strings, not null/undefined
                setProfile(normalizeProfile(apiProfile));
              }
            } catch (jsonError) {
              console.warn('Failed to parse trainer profile JSON:', jsonError);
            }
          } else {
            console.warn('Empty response from /api/trainer/profile');
          }
        }
      } catch (error) {
        console.error('خطا در بارگذاری پروفایل مربی:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const validateField = (key: keyof TrainerProfile, value: string): boolean => {
    switch (key) {
      case "name":
        if (!value.trim()) {
          setErrors(prev => ({ ...prev, [key]: "نام مربی الزامی است" }));
          return false;
        }
        break;
      case "phone":
        if (!value.trim()) {
          setErrors(prev => ({ ...prev, [key]: "شماره تلفن الزامی است" }));
          return false;
        }
        if (!/^09\d{9}$/.test(value)) {
          setErrors(prev => ({ ...prev, [key]: "شماره تلفن معتبر نیست" }));
          return false;
        }
        break;
      case "gymName":
        if (!value.trim()) {
          setErrors(prev => ({ ...prev, [key]: "نام محل فعالیت الزامی است" }));
          return false;
        }
        if (value.trim().length < 2) {
          setErrors(prev => ({ ...prev, [key]: "نام محل فعالیت باید حداقل ۲ کاراکتر باشد" }));
          return false;
        }
        break;
      case "gymAddress":
        if (!value.trim()) {
          setErrors(prev => ({ ...prev, [key]: "آدرس محل فعالیت الزامی است" }));
          return false;
        }
        if (value.trim().length < 5) {
          setErrors(prev => ({ ...prev, [key]: "آدرس محل فعالیت باید حداقل ۵ کاراکتر باشد" }));
          return false;
        }
        break;
      case "bio":
        if (!value.trim()) {
          setErrors(prev => ({ ...prev, [key]: "بیوگرافی الزامی است" }));
          return false;
        }
        if (value.trim().length < 10) {
          setErrors(prev => ({ ...prev, [key]: "بیوگرافی باید حداقل ۱۰ کاراکتر باشد" }));
          return false;
        }
        break;
      case "gymDescription":
        if (!value.trim()) {
          setErrors(prev => ({ ...prev, [key]: "توضیحات محل فعالیت الزامی است" }));
          return false;
        }
        if (value.trim().length < 10) {
          setErrors(prev => ({ ...prev, [key]: "توضیحات محل فعالیت باید حداقل ۱۰ کاراکتر باشد" }));
          return false;
        }
        break;
    }

    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
    return true;
  };

  const handleUpdate = (key: keyof TrainerProfile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
    
    const isValid = validateField(key, value);
    setValidFields(prev => ({ ...prev, [key]: isValid }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Validate all required fields (all fields are now required)
      const requiredFields: (keyof TrainerProfile)[] = ['name', 'phone', 'gymName', 'gymAddress', 'bio', 'gymDescription'];
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!validateField(field, profile[field])) {
          isValid = false;
        }
      });

      if (!isValid) {
        toast({
          variant: "destructive",
          title: "خطا در اعتبارسنجی",
          description: "لطفاً تمام فیلدهای الزامی را پر کنید"
        });
        setIsSaving(false);
        return;
      }

      // Save directly to database API endpoint
      const response = await fetch('/api/trainer/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save profile to database');
      }
      
      toast({
        title: "موفقیت آمیز",
        description: "اطلاعات پروفایل با موفقیت ذخیره شد"
      });
      
      // Invalidate the cache to trigger refresh in other components
      const { queryClient } = await import('@/lib/queryClient');
      queryClient.invalidateQueries({ queryKey: ['trainerProfile'] });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطایی در ذخیره اطلاعات رخ داد"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    profile,
    errors,
    setErrors,
    validFields,
    setValidFields,
    activeSection,
    setActiveSection,
    isSaving,
    loading,
    handleUpdate,
    handleSave
  };
};
