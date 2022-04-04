import React, { ReactNode } from 'react';

import { useRouter } from 'next/router';

import useMe from 'hooks/me';

interface ProtectedProps {
  children: ReactNode;
}

const Protected: React.FC = ({ children }: ProtectedProps) => {
  const router = useRouter();
  const { user, isLoading } = useMe();

  // Not display anything when me request is on progress
  if (isLoading) return null;

  // Redirect when session doesn't exist
  if (!isLoading && !user) {
    router.push(`/sign-in?callbackUrl=${window.location.origin}${router.asPath}`);
    return null;
  }

  return children;
};

export default Protected;
