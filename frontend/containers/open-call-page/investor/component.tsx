import { FC, useState } from 'react';

import { Heart } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import OpenCallApplicationModal from 'containers/open-call-application-modal';
import ProfileCard from 'containers/profile-card';

import Button from 'components/button';
import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';
import { OpenCallStatus, Paths, UserRoles } from 'enums';
import { logEvent } from 'lib/analytics/ga';

import { useAccount } from 'services/account';
import { useFavoriteOpenCall } from 'services/open-call/open-call-service';

import { OpenCallInvestorProps } from '.';

export const OpenCallInvestorAndFooter: FC<OpenCallInvestorProps> = ({ openCall }) => {
  const { userAccount } = useAccount();
  const favoriteOpenCall = useFavoriteOpenCall();
  const [showApplicationModal, setShowApplicationModal] = useState<boolean>(false);

  const { investor } = openCall;

  const handleFavoriteClick = () => {
    if (!openCall.favourite) {
      logEvent('click_favorite', { category_name: 'open-call', slug: openCall.slug });
    }

    // This mutation uses a 'DELETE' request when the isFavorite is true, and a 'POST' request when
    // is false.
    favoriteOpenCall.mutate({ id: openCall.id, isFavourite: openCall.favourite });
  };

  return (
    <>
      <div className="w-full pt-10 sm:pt-20 bg-background-middle">
        <LayoutContainer className="px-0">
          <LayoutContainer className="flex flex-col justify-between pb-10 sm:pb-20 gap-y-8 sm:gap-y-12 md:flex-row">
            <div className="w-full">
              <h2 className="mb-4 font-serif text-4xl font-bold">
                <FormattedMessage defaultMessage="Investor" id="nEvNJb" />
              </h2>
              <p className="text-gray-700">
                <FormattedMessage defaultMessage="Who is financing this open call" id="Knhvmr" />
              </p>
            </div>
            <div className="w-full">
              <ProfileCard
                className="min-w-full"
                description={investor?.about}
                link={`${Paths.Investor}/${investor?.slug}`}
                name={investor?.name}
                picture={investor?.picture?.small}
                profileType="investor"
                type={investor?.type}
              />
            </div>
          </LayoutContainer>
        </LayoutContainer>
        <div className="text-center py-14 sm:py-20 bg-green-dark">
          <LayoutContainer>
            <h2 className="max-w-2xl mx-auto font-serif text-3xl font-semibold text-white lg:text-4xl">
              <FormattedMessage
                defaultMessage="Would you like to apply for this fund?"
                id="8KmEyC"
              />
            </h2>
            <div className="flex flex-col items-center justify-center gap-4 mt-8 sm:flex-row sm:mt-14">
              <Button
                theme="primary-white"
                className="flex justify-center w-full sm:w-auto"
                disabled={
                  !userAccount ||
                  userAccount.type !== UserRoles.ProjectDeveloper ||
                  openCall.status !== OpenCallStatus.Launched
                }
                onClick={() => setShowApplicationModal(true)}
              >
                <span className="text-lg">
                  <FormattedMessage defaultMessage="Apply now" id="VR4TEV" />
                </span>
              </Button>
              <span className="text-xl text-white">
                <FormattedMessage defaultMessage="or" id="Ntjkqd" />
              </span>
              <Button
                className="flex justify-center w-full sm:w-auto"
                disabled={!userAccount}
                theme="secondary-white"
                onClick={handleFavoriteClick}
              >
                <Icon
                  icon={Heart}
                  className={cx('w-4 mr-3', {
                    'fill-green-dark': !openCall.favourite,
                    'fill-white': openCall.favourite,
                  })}
                />
                <span className="text-lg">
                  <FormattedMessage defaultMessage="Favorite" id="5Hzwqs" />
                </span>
              </Button>
            </div>
          </LayoutContainer>
        </div>
      </div>
      <OpenCallApplicationModal
        openCallId={openCall.id}
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
      />
    </>
  );
};

export default OpenCallInvestorAndFooter;
