import React from 'react';

import { useRouter } from 'next/router';

import useMe from 'hooks/me';

import { ProtectedProps } from 'layouts/protected-page/types';

const Protected: React.FC<ProtectedProps> = ({ children, ...rest }) => {
  const router = useRouter();
  const { user, isLoading } = useMe();

  // Not display anything when me request is on progress
  if (isLoading) return null;

  // Redirect when session doesn't exist
  if (!isLoading && !user) {
    router.push(`/sign-in?callbackUrl=${window.location.origin}${router.asPath}`);
    return null;
  }

  return <div {...rest}>{children}</div>;
};

export default Protected;
