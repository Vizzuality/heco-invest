import { FC } from 'react';

import { useRouter } from 'next/router';

import useMe from 'hooks/me';

import LayoutContainer from 'components/layout-container';
import { UserRoles } from 'enums';
import ProtectedPage from 'layouts/protected-page';

import { useProjectDeveloper, useInvestor } from 'services/account';

import AccountInfo from './account-info';
import AccountPicture from './account-picture';
import Header from './header';
import Navigation from './navigation';
import { DashboardLayoutProps } from './types';

export const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  buttons,
}: DashboardLayoutProps) => {
  const { user } = useMe();

  // We can't use hooks conditionally, even though we do know which role the user has.
  // We'll fetch both, and then assign the correct one to the `accountData` variable.
  const { data: projectDeveloperData } = useProjectDeveloper();
  const { data: investorData } = useInvestor();

  const accountData =
    user?.role === UserRoles.ProjectDeveloper ? projectDeveloperData : investorData;

  return (
    <ProtectedPage permissions={[UserRoles.ProjectDeveloper, UserRoles.Investor]}>
      <div className="flex flex-col h-screen">
        <div className="flex flex-col bg-radial-green-dark bg-green-dark backdrop-blur-sm">
          <Header />
          <LayoutContainer>
            <div className="flex w-full text-white">
              <div className="flex flex-grow gap-8">
                <div className="lg:translate-y-5">
                  <AccountPicture name={accountData?.name} picture={accountData?.picture.small} />
                </div>
                <div className="flex flex-col justify-end pb-2">
                  <AccountInfo userRole={user?.role} account={accountData} />
                  <Navigation userRole={user?.role} />
                </div>
              </div>
              <div className="flex items-end">
                <div className="flex gap-2 lg:translate-y-5">{buttons}</div>
              </div>
            </div>
          </LayoutContainer>
        </div>
        <main className="h-full overflow-y-scroll border bg-background-dark border-green-dark">
          <LayoutContainer className="py-8">{children}</LayoutContainer>
        </main>
      </div>
    </ProtectedPage>
  );
};

export default DashboardLayout;
