import { useMemo } from 'react';

import { useQuery } from 'react-query';

import { UserRoles, Queries } from 'enums';
import { Investor } from 'types/investor';
import { ProjectDeveloper } from 'types/projectDeveloper';

import { getInvestor } from 'services/investors/investorsService';
import { getProjectDeveloper } from 'services/project-developers/projectDevelopersService';
import { SingleRequestParams } from 'services/types';

const useOwnerAccountName = (accountType: 'investor' | 'project_developer', id: string) => {
  const getOwnerAccount = (id: string) =>
    accountType === UserRoles.ProjectDeveloper ? getProjectDeveloper(id) : getInvestor(id);

  const query = useQuery<ProjectDeveloper | Investor>(Queries.AccountOwnerName, () =>
    getOwnerAccount(id)
  );

  return useMemo(() => query.data, [query]);
};

export default useOwnerAccountName;
