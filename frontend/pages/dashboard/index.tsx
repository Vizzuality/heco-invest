import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { Paths, ReviewStatus, UserRoles } from 'enums';
import DashboardLayout from 'layouts/dashboard';
import NakedLayout from 'layouts/naked';

import { useAccount } from 'services/account';

export const DashboardPage = () => {
  const router = useRouter();
  const { user, userIsLoading, userAccount, userAccountLoading } = useAccount();

  const isLoading = userIsLoading || userAccountLoading;

  useEffect(() => {
    if (isLoading) return;

    // If the user is not approved, do nothing. The `ProtectedPage`'s logic will kick in
    // and display the user the "Pending Approval" screen.
    if (userAccount?.review_status !== ReviewStatus.Approved) return;

    switch (user?.role) {
      case UserRoles.ProjectDeveloper:
        router.replace(Paths.DashboardProjects);
        break;
      case UserRoles.Investor:
        router.replace(Paths.DashboardOpenCalls);
        break;
      default:
      // Do nothing. There isn't an user, and `ProtectedPage`'s logic will kick in and
      // redirect the user to the Sign in page.
    }
  }, [isLoading, router, user, userAccount]);

  // We're returning an empty Layout to minimize flickering/an empty page.
  return <DashboardLayout />;
};

DashboardPage.layout = {
  Component: NakedLayout,
};

export default DashboardPage;
