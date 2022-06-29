import { useEffect } from 'react';

import { useRouter } from 'next/router';

import useMe from 'hooks/me';

import { UserRoles, Paths } from 'enums';
import DashboardLayout from 'layouts/dashboard';
import NakedLayout from 'layouts/naked';

export const DashboardPage = () => {
  const router = useRouter();
  const { user, isLoading } = useMe();

  useEffect(() => {
    if (isLoading) return;

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
  }, [isLoading, router, user]);

  // We're returning an empty Layout to minimize flickering/an empty page.
  return <DashboardLayout />;
};

DashboardPage.layout = {
  Component: NakedLayout,
};

export default DashboardPage;
