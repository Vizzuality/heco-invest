import { useMemo } from 'react';

import { UserRoles } from 'enums';

import { useInvestor, useProjectDeveloper } from 'services/account';

import useMe from './me';

/** Hook for use the current user account, that can be of type 'Project Developer' or 'Investor' */
export const useUserAccount = () => {
  const { user } = useMe();
  const { projectDeveloper } = useProjectDeveloper({
    enabled: user?.role === UserRoles.ProjectDeveloper,
  });
  const { investor } = useInvestor({ enabled: user?.role === UserRoles.Investor });
  return useMemo(() => {
    return projectDeveloper || investor;
  }, [projectDeveloper, investor]);
};
