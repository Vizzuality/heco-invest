import React, { useMemo } from 'react';

import { useRouter } from 'next/router';

import AccountPendingApproval from 'containers/account-pending-approval';

import LayoutContainer from 'components/layout-container';
import Loading from 'components/loading';
import { Paths, ReviewStatus, UserRoles } from 'enums';
import Header from 'layouts/static-page/header';

import { useAccount } from 'services/account';

import { ProtectedProps } from './types';

const Protected: React.FC<ProtectedProps> = ({
  permissions,
  ownership = {
    allowOwner: false,
    getIsOwner: () => false,
  },
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

  const isUnapproved = userAccount?.review_status !== ReviewStatus.Approved;

  // Redirect to sign-in when session doesn't exist
  if (userIsError) {
    router.push(Paths.SignIn);
    return null;
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <Loading
          visible={true}
          className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-background-light/90 backdrop-blur-sm"
          iconClassName="w-10 h-10"
        />
      </>
    );
  }

  // If needs role permissions and has no user or the role don't match
  if (!!user && !permissions.includes(user.role)) {
    //If the role is light
    if (user.role === UserRoles.Light) {
      // Redirect to choose account type if the user have a Light account
      router.push(Paths.AccountType);
      return null;
    } else {
      // If the user has an account redirect to the the dashboard
      router.push(Paths.Dashboard);
      return null;
    }
  }

  // If the ownership of the entity is needed and the user don't have it
  if (ownership?.allowOwner) {
    if (!isOwner) {
      // Redirect to dashboard
      router.push(Paths.Dashboard);
      return null;
    }
  }

  if (isUnapproved && !allowUnapproved) {
    return (
      <>
        <Header />
        <LayoutContainer className="flex items-center h-screen">
          <AccountPendingApproval />
        </LayoutContainer>
      </>
    );
  }

  return <div {...rest}>{children}</div>;
};

export default Protected;
