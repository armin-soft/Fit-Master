import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const NotFoundHandler = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [redirectTo, setRedirectTo] = useState('/');

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        // Check trainer/management authentication
        const trainerAuthResponse = await fetch('/api/auth/status', {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });

        let trainerLoggedIn = false;
        if (trainerAuthResponse.ok) {
          const trainerAuthData = await trainerAuthResponse.json();
          trainerLoggedIn = trainerAuthData.isLoggedIn;
        }

        // If trainer is logged in, redirect to management dashboard
        if (trainerLoggedIn) {
          console.log('NotFoundHandler: Trainer is logged in, redirecting to Management');
          setRedirectTo('/Management');
          setIsChecking(false);
          return;
        }

        // Check student authentication
        const studentAuthResponse = await fetch('/api/student/auth/status', {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });

        let studentLoggedIn = false;
        if (studentAuthResponse.ok) {
          const studentAuthData = await studentAuthResponse.json();
          studentLoggedIn = studentAuthData.isLoggedIn;
        }

        // If student is logged in, redirect to student dashboard
        if (studentLoggedIn) {
          console.log('NotFoundHandler: Student is logged in, redirecting to Student');
          setRedirectTo('/Student');
          setIsChecking(false);
          return;
        }

        // If no one is logged in, redirect to home (user type selection)
        console.log('NotFoundHandler: No one is logged in, redirecting to home');
        setRedirectTo('/');
        setIsChecking(false);

      } catch (error) {
        console.error('NotFoundHandler: Error checking authentication:', error);
        // On error, default to home page
        setRedirectTo('/');
        setIsChecking(false);
      }
    };

    checkAuthAndRedirect();
  }, []);

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-info-100 dark:from-brand-950 dark:to-info-950">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-600 dark:text-brand-400 font-medium">در حال بررسی...</p>
        </div>
      </div>
    );
  }

  return <Navigate to={redirectTo} replace />;
};