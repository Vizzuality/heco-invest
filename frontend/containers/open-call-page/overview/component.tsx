import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import LayoutContainer from 'components/layout-container';

import { OpenCallOverviewTypes } from './types';

export const Overview: FC<OpenCallOverviewTypes> = ({ openCall }) => {
  const { country, municipality, description, department } = openCall;

  return (
    <LayoutContainer className="mb-14 lg:mb-20 mt-18 space-y-36">
      <section className="p-4 mt-32 font-serif lg:flex sm:p-6 lg:mt-48 lg:p-16 rounded-2xl">
        <div className="lg:w-1/2"></div>
        <div className="lg:w-1/2">
          <div className="flex flex-col mb-12 space-y-4 lg:col-start-2">
            <h2 className="text-2xl lg:text-3xl">
              <FormattedMessage defaultMessage="Location" id="rvirM2" />
            </h2>
            <div className="flex flex-col space-y-1">
              <div className="flex space-x-2 font-sans text-base">
                <h3 className="font-semibold min-w-[130px]">
                  <FormattedMessage defaultMessage="Country" id="vONi+O" />
                </h3>
                <p>{country?.name || 'Colombia'}</p>
              </div>
              {!!department && (
                <div className="flex space-x-2 font-sans text-base">
                  <h3 className="font-semibold min-w-[130px]">
                    <FormattedMessage defaultMessage="State" id="ku+mDU" />
                  </h3>
                  <p>{department?.name}</p>
                </div>
              )}{' '}
              {!!municipality && (
                <div className="flex space-x-2 font-sans text-base">
                  <h3 className="font-semibold min-w-[130px]">
                    <FormattedMessage defaultMessage="Municipality" id="9I1zvK" />
                  </h3>
                  <p>{municipality?.name}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl lg:text-3xl">
              <FormattedMessage defaultMessage="What is the open call about" id="IHCcxL" />
            </h2>
            <p className="font-sans text-base">{description}</p>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
};

export default Overview;
