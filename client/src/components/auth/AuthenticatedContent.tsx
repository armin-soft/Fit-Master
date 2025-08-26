
import React from 'react';

interface AuthenticatedContentProps {
  children: React.ReactNode;
}

export const AuthenticatedContent = ({ children }: AuthenticatedContentProps) => {
  return <>{children}</>;
};
