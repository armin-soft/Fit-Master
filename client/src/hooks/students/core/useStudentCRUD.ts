
import { useState } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";

export const useStudentCRUD = (
  students: Student[], 
  setStudents: (students: Student[]) => void,
  addHistoryEntry?: (entry: any) => Promise<void>
) => {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (studentId: number) => {
    try {
      setIsDeleting(true);
      console.log("Deleting student with ID:", studentId);
      
      // Call API DELETE endpoint
      const response = await fetch(`/api/students/${studentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Failed to delete student');
      }
      
      // Refresh the students list from database
      const studentsResponse = await fetch('/api/students');
      if (studentsResponse.ok) {
        const updatedStudents = await studentsResponse.json();
        setStudents(updatedStudents);
      }

      // یک event واحد برای بروزرسانی sidebar
      window.dispatchEvent(new CustomEvent('studentsUpdated'));

      toast({
        title: "حذف موفق",
        description: "شاگرد با موفقیت حذف شد",
      });
      
      console.log("Student deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting student:", error);
      toast({
        title: "خطا در حذف",
        description: "مشکلی در حذف شاگرد پیش آمد",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSave = async (studentData: any, existingStudent?: Student) => {
    try {
      console.log("Saving student data:", studentData);
      console.log("Existing student:", existingStudent);
      
      let savedStudent;
      
      if (existingStudent) {
        // ویرایش شاگرد موجود - call API PUT endpoint
        const response = await fetch(`/api/students/${existingStudent.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(studentData)
        });
        
        if (!response.ok) {
          // Try to get the actual error message from the server
          let errorMessage = 'مشکلی در ویرایش شاگرد پیش آمد';
          let isPhoneDuplicate = false;
          
          try {
            const errorText = await response.text();
            if (errorText.trim() !== '') {
              const errorData = JSON.parse(errorText);
              if (errorData.error === "Duplicate phone number" || errorData.message) {
                isPhoneDuplicate = true;
                errorMessage = errorData.message || 'این شماره موبایل قبلاً برای شاگرد دیگری ثبت شده است';
              } else if (errorData.error) {
                errorMessage = errorData.error;
              }
            }
          } catch (parseError) {
            console.warn('Could not parse error response:', parseError);
          }
          
          // Show appropriate toast for duplicate phone
          if (isPhoneDuplicate) {
            toast({
              title: "خطا در ویرایش شاگرد",
              description: errorMessage,
              variant: "destructive",
            });
            return false; // Return false to indicate failure
          }
          
          throw new Error(errorMessage);
        }
        
        const text = await response.text();
        if (text.trim() === '') {
          throw new Error('Empty response from server');
        }
        try {
          savedStudent = JSON.parse(text);
        } catch (jsonError) {
          console.error('JSON parsing error:', jsonError);
          throw new Error('Invalid response format from server');
        }
        console.log("Updated student:", savedStudent);

        toast({
          title: "ویرایش موفق",
          description: "اطلاعات شاگرد با موفقیت ویرایش شد",
        });
      } else {
        // افزودن شاگرد جدید - call API POST endpoint
        const response = await fetch('/api/students', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(studentData)
        });
        
        if (!response.ok) {
          // Try to get the actual error message from the server
          let errorMessage = 'مشکلی در ایجاد شاگرد پیش آمد';
          let isPhoneDuplicate = false;
          
          try {
            const errorText = await response.text();
            if (errorText.trim() !== '') {
              const errorData = JSON.parse(errorText);
              if (errorData.error === "Duplicate phone number" || errorData.message) {
                isPhoneDuplicate = true;
                errorMessage = errorData.message || 'این شماره موبایل قبلاً ثبت شده است';
              } else if (errorData.error) {
                errorMessage = errorData.error;
              }
            }
          } catch (parseError) {
            console.warn('Could not parse error response:', parseError);
          }
          
          // Show appropriate toast for duplicate phone
          if (isPhoneDuplicate) {
            toast({
              title: "خطا در ثبت شاگرد",
              description: errorMessage,
              variant: "destructive",
            });
            return false; // Return false to indicate failure
          }
          
          throw new Error(errorMessage);
        }
        
        const text = await response.text();
        if (text.trim() === '') {
          throw new Error('Empty response from server');
        }
        try {
          savedStudent = JSON.parse(text);
        } catch (jsonError) {
          console.error('JSON parsing error:', jsonError);
          throw new Error('Invalid response format from server');
        }
        console.log("Created new student:", savedStudent);
        
        toast({
          title: "افزودن موفق",
          description: "شاگرد جدید با موفقیت اضافه شد",
        });
      }
      
      // Refresh the students list from database
      const studentsResponse = await fetch('/api/students', {
        credentials: 'include'
      });
      if (studentsResponse.ok) {
        const text = await studentsResponse.text();
        if (text.trim() !== '') {
          try {
            const updatedStudents = JSON.parse(text);
            setStudents(updatedStudents);
          } catch (jsonError) {
            console.error('Failed to parse students list:', jsonError);
          }
        }
      }
      
      // یک event واحد برای بروزرسانی sidebar
      window.dispatchEvent(new CustomEvent('studentsUpdated'));
      
      return true;
    } catch (error) {
      console.error("Error saving student:", error);
      
      // Display specific error message or generic one
      let errorDescription = "مشکلی در ذخیره‌سازی اطلاعات شاگرد پیش آمد";
      if (error instanceof Error && error.message) {
        // Check for specific error types and provide appropriate Persian messages
        if (error.message.includes('شاگردی با شماره تلفن') || error.message.includes('قبلاً ثبت شده است')) {
          errorDescription = error.message;
        } else if (error.message.includes('Failed to create student') || error.message.includes('Failed to update student')) {
          errorDescription = "خطا در ارتباط با سرور. لطفا دوباره تلاش کنید";
        } else {
          errorDescription = error.message;
        }
      }
      
      toast({
        title: "خطا در ذخیره‌سازی",
        description: errorDescription,
        variant: "destructive",
      });
      return false;
    }
  };

  const refreshData = async () => {
    // Refresh data from database API
    console.log("Refreshing student data...");
    try {
      const response = await fetch('/api/students', {
        credentials: 'include'
      });
      if (response.ok) {
        const text = await response.text();
        if (text.trim() !== '') {
          try {
            const savedStudents = JSON.parse(text);
            if (Array.isArray(savedStudents)) {
              setStudents(savedStudents);
              console.log("Data refreshed successfully");
            }
          } catch (jsonError) {
            console.error('Failed to parse students data:', jsonError);
          }
        }
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  const handleToggleAccess = async (student: Student) => {
    try {
      console.log("Toggling access for student:", student.name, "Current status:", student.isActive);
      
      const newStatus = !student.isActive;
      
      // Call API PATCH endpoint for access control
      const response = await fetch(`/api/students/${student.id}/access`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: newStatus })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Failed to update access');
      }
      
      // Refresh the students list from database
      const studentsResponse = await fetch('/api/students');
      if (studentsResponse.ok) {
        const updatedStudents = await studentsResponse.json();
        setStudents(updatedStudents);
      }

      // یک event واحد برای بروزرسانی sidebar
      window.dispatchEvent(new CustomEvent('studentsUpdated'));

      toast({
        title: "تغییر دسترسی موفق",
        description: `دسترسی شاگرد ${newStatus ? 'فعال' : 'غیرفعال'} شد`,
      });
      
      console.log("Student access updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating student access:", error);
      toast({
        title: "خطا در تغییر دسترسی",
        description: "مشکلی در تغییر دسترسی شاگرد پیش آمد",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    handleDelete,
    handleSave,
    handleToggleAccess,
    refreshData,
    isDeleting
  };
};
