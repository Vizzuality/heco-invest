import { FC, useRef } from 'react';

import LayoutContainer from 'components/layout-container';
import Loading from 'components/loading';
import { UserRoles } from 'enums';
import ProtectedPage from 'layouts/protected-page';

import { useAccount } from 'services/account';

import AccountInfo from './account-info';
import AccountPicture from './account-picture';
import Header from './header';
import Navigation from './navigation';
import { DashboardLayoutProps } from './types';

export const DashboardLayout: FC<DashboardLayoutProps> = ({
  scrollOnQuery = true,
  isLoading = false,
  buttons,
  sidebar,
  children,
}: DashboardLayoutProps) => {
  const mainContainerRef = useRef(null);

  const { user, userAccount } = useAccount({ includes: 'owner' });

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
                    <AccountPicture name={userAccount?.name} picture={userAccount?.picture.small} />
                  </div>
                  <div className="flex flex-col justify-end pb-2 mt-5 lg:mt-0">
                    <AccountInfo userRole={user?.role} account={userAccount} />
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
          <div ref={mainContainerRef} className="h-full overflow-y-auto bg-background-dark">
            <LayoutContainer className="flex flex-col gap-20 py-8 md:flex-row">
              {sidebar && (
                <aside className="relative w-3/12">
                  <div className="md:sticky md:top-8">{sidebar}</div>
                </aside>
              )}
              <main className="flex-1 h-full">
                {children}
                {isLoading && (
                  <div className="absolute flex items-center justify-center bg-background-dark top-px bottom-px left-px right-px rounded-2xl backdrop-blur-sm">
                    <Loading visible={true} iconClassName="w-10 h-10" />
                  </div>
                )}
              </main>
            </LayoutContainer>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
};

export default DashboardLayout;
