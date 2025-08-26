
import React from 'react';

interface StudentAuthenticatedContentProps {
  children: React.ReactNode;
}

export const StudentAuthenticatedContent = ({ children }: StudentAuthenticatedContentProps) => {
  return <>{children}</>;
};
