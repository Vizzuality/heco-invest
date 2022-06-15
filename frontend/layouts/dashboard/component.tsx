import { FC } from 'react';

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

  const isProjectDeveloper = user?.role === UserRoles.ProjectDeveloper;
  const isInvestor = user?.role === UserRoles.Investor;

  const { data: projectDeveloperData } = useProjectDeveloper({
    enabled: isProjectDeveloper,
  });

  const { data: investorData } = useInvestor({
    enabled: isInvestor,
  });

  const accountData = isProjectDeveloper ? projectDeveloperData : investorData;

  return (
    <ProtectedPage permissions={[UserRoles.ProjectDeveloper, UserRoles.Investor]}>
      <div className="min-h-screen bg-background-dark">
        <div className="flex flex-col lg:h-screen ">
          <div className="z-10 flex flex-col bg-radial-green-dark bg-green-dark lg:backdrop-blur-sm">
            <Header />
            <LayoutContainer className="mt-18 lg:mt-0">
              <div className="flex flex-col w-full text-white lg:flex-row">
                <div className="flex flex-grow gap-8">
                  <div className="lg:translate-y-5">
                    <AccountPicture name={accountData?.name} picture={accountData?.picture.small} />
                  </div>
                  <div className="flex flex-col justify-end pb-2 mt-5 lg:mt-0">
                    <AccountInfo userRole={user?.role} account={accountData} />
                    <Navigation className="hidden lg:flex" userRole={user?.role} />
                  </div>
                </div>
                <Navigation className="flex mt-2 lg:hidden" userRole={user?.role} />
                <div className="flex items-end justify-center">
                  <div className="flex gap-2 my-4 lg:my-0 lg:translate-y-5">{buttons}</div>
                </div>
              </div>
            </LayoutContainer>
          </div>
          <main className="h-full overflow-y-scroll bg-background-dark">
            <LayoutContainer className="py-8">{children}</LayoutContainer>
          </main>
        </div>
      </div>
    </ProtectedPage>
  );
};

export default DashboardLayout;
