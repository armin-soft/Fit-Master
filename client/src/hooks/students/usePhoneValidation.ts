import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

interface PhoneValidationResult {
  isValid: boolean;
  isChecking: boolean;
  isDuplicate: boolean;
  existingStudent?: any;
  message?: string;
}

export const usePhoneValidation = () => {
  const [phoneToCheck, setPhoneToCheck] = useState<string>('');
  const [shouldCheck, setShouldCheck] = useState(false);

  const { data: checkResult, isLoading: isChecking } = useQuery({
    queryKey: ['/api/students/check-phone', phoneToCheck],
    queryFn: async () => {
      if (!phoneToCheck) return null;
      
      const response = await fetch(`/api/students/check-phone/${encodeURIComponent(phoneToCheck)}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('خطا در بررسی شماره موبایل');
      }
      
      return response.json();
    },
    enabled: shouldCheck && phoneToCheck.length >= 11,
    staleTime: 5000, // Cache for 5 seconds
  });

  const validatePhone = useCallback((phone: string, editingStudentId?: number): PhoneValidationResult => {
    // Basic format validation
    const cleanPhone = phone.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
    
    if (!cleanPhone) {
      return {
        isValid: false,
        isChecking: false,
        isDuplicate: false,
        message: 'شماره موبایل الزامی است'
      };
    }
    
    if (!/^09\d{9}$/.test(cleanPhone)) {
      return {
        isValid: false,
        isChecking: false,
        isDuplicate: false,
        message: 'شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد'
      };
    }

    // Check for duplicates if the API call has completed
    if (phoneToCheck === cleanPhone && checkResult) {
      if (checkResult.exists) {
        // If we're editing a student and the phone belongs to the same student, it's valid
        if (editingStudentId && checkResult.student?.id === editingStudentId) {
          return {
            isValid: true,
            isChecking: false,
            isDuplicate: false,
            message: 'شماره موبایل قابل استفاده است'
          };
        }
        // Otherwise, it's a duplicate
        return {
          isValid: false,
          isChecking: false,
          isDuplicate: true,
          existingStudent: checkResult.student,
          message: `این شماره قبلاً برای ${checkResult.student?.name || 'شاگرد دیگری'} ثبت شده است`
        };
      } else {
        return {
          isValid: true,
          isChecking: false,
          isDuplicate: false,
          message: 'شماره موبایل قابل استفاده است'
        };
      }
    }

    // If we're in the process of checking
    if (isChecking && phoneToCheck === cleanPhone) {
      return {
        isValid: true, // Assume valid while checking
        isChecking: true,
        isDuplicate: false,
        message: 'در حال بررسی...'
      };
    }

    // Default state - format is valid but not checked for duplicates yet
    return {
      isValid: true,
      isChecking: false,
      isDuplicate: false
    };
  }, [phoneToCheck, checkResult, isChecking]);

  const checkPhoneAvailability = useCallback((phone: string) => {
    const cleanPhone = phone.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
    
    if (cleanPhone.length >= 11 && /^09\d{9}$/.test(cleanPhone)) {
      setPhoneToCheck(cleanPhone);
      setShouldCheck(true);
    } else {
      setShouldCheck(false);
      setPhoneToCheck('');
    }
  }, []);

  return {
    validatePhone,
    checkPhoneAvailability,
    isChecking
  };
};