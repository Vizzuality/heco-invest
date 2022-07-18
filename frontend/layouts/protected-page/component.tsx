import React, { useMemo } from 'react';

import { useRouter } from 'next/router';

import Loading from 'components/loading';
import { Paths, ReviewStatus, UserRoles } from 'enums';
import { ProtectedProps } from 'layouts/protected-page/types';

import { useAccount } from 'services/account';

const Protected: React.FC<ProtectedProps> = ({
  permissions,
  ownership = {
    allowOwner: false,
    getIsOwner: () => false,
  },
  allowConfirmed = false,
  allowUnapproved = false,
  children,
  ...rest
}) => {
  const router = useRouter();

  const { user, userIsLoading, userAccount, userIsError, userAccountLoading } = useAccount();

  const isLoading = userIsLoading || userAccountLoading;

  const isOwner = useMemo(
    () => ownership?.getIsOwner(user, userAccount),
    [ownership, user, userAccount]
  );

  if (isLoading) {
    return (
      <Loading
        visible={true}
        className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-background-dark"
        iconClassName="w-10 h-10"
      />
    );
  }

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
    // If the account is not yet approved and approval is needed
    if (!allowUnapproved && userAccount && userAccount?.review_status !== ReviewStatus.Approved) {
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
