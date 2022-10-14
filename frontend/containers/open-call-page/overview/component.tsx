import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import LayoutContainer from 'components/layout-container';

import { OpenCallOverviewTypes } from './types';

export const Overview: FC<OpenCallOverviewTypes> = ({ openCall }) => {
  const { country, department } = openCall;

  return (
    <LayoutContainer id="overview" className="mt-8">
      <LayoutContainer>
        <div className="flex flex-col sm:flex-row gap-x-8 gap-y-2">
          <div className="flex gap-2 font-sans text-base">
            <h3 className="font-semibold">
              <FormattedMessage defaultMessage="Country" id="vONi+O" />
            </h3>
            <p>{country?.name}</p>
          </div>
          {!!department && (
            <div className="flex gap-2 font-sans text-base">
              <h3 className="font-semibold">
                <FormattedMessage defaultMessage="State" id="ku+mDU" />
              </h3>
              <p>{department?.name}</p>
            </div>
          )}
        </div>
      </LayoutContainer>
    </LayoutContainer>
  );
};

export default Overview;
