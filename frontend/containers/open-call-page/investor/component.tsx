import { FC } from 'react';

import { Heart } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import ProfileCard from 'containers/profile-card';

import Button from 'components/button';
import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';
import { Paths } from 'enums';

import { OpenCallInvestorProps } from '.';

export const OpenCallInvestorAndFooter: FC<OpenCallInvestorProps> = ({
  investor,
  investorRef,
  handleApply,
  handleFavorite,
  // favourite,
}) => {
  return (
    <div ref={investorRef} className="w-full pt-20 bg-background-middle">
      <LayoutContainer>
        <LayoutContainer className="flex flex-col justify-between pb-20 gap-y-12 md:flex-row">
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
              link={`/${Paths.Investor}/${investor?.slug}`}
              name={investor?.name}
              picture={investor?.picture?.small}
              profileType="investor"
              type={investor?.type}
            />
          </div>
        </LayoutContainer>
      </LayoutContainer>
      <div className="py-20 text-center bg-green-dark">
        <h2 className="max-w-2xl mx-auto font-serif text-4xl font-semibold text-white">
          <FormattedMessage defaultMessage="Would you like to apply for this fund?" id="8KmEyC" />
        </h2>
        <div className="flex items-center justify-center gap-4 mt-14">
          <Button disabled theme="primary-white" onClick={handleApply}>
            <span className="text-lg">
              <FormattedMessage defaultMessage="Apply now" id="VR4TEV" />
            </span>
          </Button>
          <span className="text-xl text-white">
            <FormattedMessage defaultMessage="or" id="Ntjkqd" />
          </span>
          <Button disabled theme="secondary-white" onClick={handleFavorite}>
            <Icon
              icon={Heart}
              // className={cx('w-4 mr-3', { 'fill-green-dark': favourite })}
              className={cx('w-4 mr-3')}
            />
            <span className="text-lg">
              <FormattedMessage defaultMessage="Favorite" id="5Hzwqs" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OpenCallInvestorAndFooter;
