import React, { useMemo } from 'react';

import { useRouter } from 'next/router';

import { Paths, UserRoles } from 'enums';
import { ProtectedProps } from 'layouts/protected-page/types';

import { useAccount } from 'services/account';

const Protected: React.FC<ProtectedProps> = ({
  permissions,
  ownership = {
    allowOwner: false,
    getIsOwner: () => false,
  },
  allowConfirmed = false,
  children,
  ...rest
}) => {
  const router = useRouter();

  const { user, userIsLoading, userAccount, userIsError, userAccountLoading } = useAccount();

  const isOwner = useMemo(
    () => ownership?.getIsOwner(user, userAccount),
    [ownership, user, userAccount]
  );

  // Not display anything when me request is on progress
  if (userIsLoading) return null;

  // Redirect to sign-in when session doesn't exist
  if (userIsError) {
    router.push(Paths.SignIn);
    return null;
  }

  // If needs role permissions and has no user or the role don't match
  if (!!user && !permissions.includes(user.role)) {
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
      if (!userIsLoading && !userAccountLoading && !isOwner) {
        // Redirect to dashboard
        router.push(Paths.Dashboard);
        return null;
      }
    }
  }

  return <div {...rest}>{children}</div>;
};

export default Protected;
