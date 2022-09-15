import { FC, useRef } from 'react';

import useMe from 'hooks/me';

import LayoutContainer from 'components/layout-container';
import Loading from 'components/loading';
import { UserRoles } from 'enums';
import ProtectedPage from 'layouts/protected-page';

import AccountPicture from '../dashboard/account-picture';
import Header from '../dashboard/header';

import Navigation from './navigation';
import { SettingsLayoutProps } from './types';

export const SettingsLayout: FC<SettingsLayoutProps> = ({
  isLoading = false,
  children,
  buttons,
}: SettingsLayoutProps) => {
  const mainContainerRef = useRef(null);

  const { user } = useMe();

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
                    <AccountPicture name={user?.first_name} picture={user?.avatar.small} />
                  </div>
                  <div className="flex flex-col justify-end pb-2 mt-5 lg:mt-0">
                    <p className="text-sm leading-5 text-gray-600">
                      {user?.first_name} {user?.last_name}
                    </p>
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
          <main ref={mainContainerRef} className="h-full overflow-y-auto bg-background-dark">
            {isLoading ? (
              <div className="absolute flex items-center justify-center bg-background-dark top-px bottom-px left-px bg-opacity-20 right-px rounded-2xl backdrop-blur-sm">
                <Loading visible={true} iconClassName="w-10 h-10" />
              </div>
            ) : (
              <LayoutContainer className="py-8">{children}</LayoutContainer>
            )}
          </main>
        </div>
      </div>
    </ProtectedPage>
  );
};

export default SettingsLayout;
