import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import ProfileCard from 'containers/profile-card';

import LayoutContainer from 'components/layout-container';
import { Paths } from 'enums';

import { OpenCallInvestorProps } from '.';

export const OpenCallInvestor: FC<OpenCallInvestorProps> = ({ investor }) => {
  return (
    <div className="w-full py-20 bg-background-middle">
      <LayoutContainer>
        <LayoutContainer className="flex flex-col justify-between gap-12 md:flex-row">
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
    </div>
  );
};

export default OpenCallInvestor;
