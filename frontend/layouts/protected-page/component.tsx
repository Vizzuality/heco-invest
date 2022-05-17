import React from 'react';

import { useRouter } from 'next/router';

import useMe from 'hooks/me';

import { Paths } from 'enums';
import { ProtectedProps } from 'layouts/protected-page/types';

const Protected: React.FC<ProtectedProps> = ({ permissions, children, ...rest }) => {
  const router = useRouter();
  const { user, isLoading } = useMe();

  // Not display anything when me request is on progress
  if (isLoading) return null;

  // Redirect when session doesn't exist
  if (!user) {
    router.push(Paths.SignIn);
    return null;
  }

  if (!permissions.includes(user.role)) {
    router.back();
    return null;
  }

  return <div {...rest}>{children}</div>;
};

export default Protected;
