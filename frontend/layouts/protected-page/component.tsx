import React from 'react';

import { useRouter } from 'next/router';

import useMe from 'hooks/me';

import { Paths, UserRoles } from 'enums';
import { ProtectedProps } from 'layouts/protected-page/types';

import { useCurrentInvestor } from 'services/investors/investorsService';
import { useCurrentProjectDeveloper } from 'services/project-developers/projectDevelopersService';

const Protected: React.FC<ProtectedProps> = ({
  permissions,
  ownership = {
    allowOwner: false,
  },
  allowConfirmed = false,
  children,
  ...rest
}) => {
  const router = useRouter();
  const { user, isLoading, isError } = useMe();
  const { projectDeveloper } = useCurrentProjectDeveloper(user);
  const { investor } = useCurrentInvestor(user);
  const userAccount = projectDeveloper || investor;

  // Not display anything when me request is on progress
  if (isLoading) return null;

  // Redirect to sign-in when session doesn't exist
  if (isError) {
    router.push(Paths.SignIn);
    return null;
  }

  // If needs role permissions and has no user or the role don't match
  if (!permissions.includes(user.role)) {
    //If the role is light
    if (user.role === UserRoles.Light) {
      // Redirect to choose account type if the user have a Light account
      router.push(Paths.AccountType);
      return null;
    }
    // Redirect to the last route (go back) if the user have a different kind of account
    router.back();
    return null;
  } else {
    // If the account confirmation is needed and the account is not confirmed
    if (allowConfirmed && !user.confirmed) {
      // Redirect to pending approval page
      router.push(
        user.role === UserRoles.Investor ? Paths.PendingInvestor : Paths.PendingProjectDeveloper
      );
      return null;
    }
    // If the ownership of the entity is needed and the user don't have it
    if (ownership?.allowOwner) {
      const isOwner = ownership.getIsOwner(user, userAccount);
      if (!isOwner) {
        // Redirect to dashboard
        router.push(Paths.Dashboard);
        return null;
      }
    }
  }

  return <div {...rest}>{children}</div>;
};

export default Protected;
