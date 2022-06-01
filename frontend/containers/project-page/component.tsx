import React from 'react';

import { useRouter } from 'next/router';

import useMe from 'hooks/me';

import { ProjectProps } from 'containers/project-page/types';

import { Paths, UserRoles } from 'enums';

const Project: React.FC<ProjectProps> = ({ permissions, children, ...rest }) => {
  const router = useRouter();
  const { user, isLoading, isError } = useMe();

  // Not display anything when me request is on progress
  if (isLoading) return null;

  // Redirect to sign-in when session doesn't exist
  if (isError) {
    router.push(Paths.SignIn);
    return null;
  }

  if (!permissions.includes(user.role)) {
    if (user.role === UserRoles.Light) {
      // Redirect to choose account type if the user have a Light account
      router.push(Paths.AccountType);
      return null;
    }
    // Redirect to the last route (go back) if the user have a different kind of account
    router.back();
    return null;
  }

  return <div {...rest}>{children}</div>;
};

export default Project;
