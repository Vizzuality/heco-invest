import { FC, Fragment } from 'react';

import { FormattedMessage } from 'react-intl';

import SDGs from 'containers/sdgs/component';

import LayoutContainer from 'components/layout-container';

import { OpenCallFundingImpactProps } from '.';

export const OpenCallFundingImpact: FC<OpenCallFundingImpactProps> = ({ openCall, allSdgs }) => {
  const { impact_description, sdgs, funding_priorities, funding_exclusions } = openCall;

  const openCallSdgs = allSdgs.filter((sdg) => sdgs.includes(Number(sdg.id)));

  return (
    <>
      <LayoutContainer className="mt-18 sm:mt-28">
        <LayoutContainer>
          <h2 className="mb-4 font-serif text-4xl font-bold sm:mb-10">
            <FormattedMessage defaultMessage="Funding information" id="mEYG82" />
          </h2>
        </LayoutContainer>
        <LayoutContainer className="p-6 text-white lg:py-14 lg:px-15 bg-green-dark rounded-2xl">
          <div className="flex flex-col gap-14 sm:flex-row">
            <div className="sm:w-1/2">
              <h3 className="mb-2 font-serif text-3xl font-semibold">
                <FormattedMessage defaultMessage="Funding priorities" id="P1f6hp" />
              </h3>
              <p>{funding_priorities}</p>
            </div>
            <div className="sm:w-1/2">
              <h3 className="mb-2 font-serif text-3xl font-semibold">
                <FormattedMessage defaultMessage="Funding exclusions" id="gQ16Mj" />
              </h3>
              <p>{funding_exclusions}</p>
            </div>
          </div>
        </LayoutContainer>
      </LayoutContainer>

      <LayoutContainer className="my-18 sm:mt-20 sm:mb-24">
        {!!openCallSdgs.length ? (
          <LayoutContainer>
            <h2 className="mb-4 font-serif text-4xl font-bold sm:mb-10">
              <FormattedMessage defaultMessage="Impact" id="W2JBdp" />
            </h2>
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-28">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">
                  <FormattedMessage defaultMessage="Expected impact" id="XgaRPC" />
                </h3>
                <p className="mt-6">{impact_description}</p>
              </div>
              <div className="flex-1">
                <h3 className="mb-6 text-xl font-semibold">
                  <FormattedMessage defaultMessage="SDG's" id="d3TPmn" />
                </h3>
                <SDGs sdgs={openCallSdgs} size="large" />
              </div>
            </div>
          </LayoutContainer>
        ) : (
          <LayoutContainer className="flex flex-col sm:flex-row">
            <div className="flex-1">
              <h2 className="mb-10 font-serif text-4xl font-bold">
                <FormattedMessage defaultMessage="Impact" id="W2JBdp" />
              </h2>
            </div>
            <div className="flex flex-col flex-1 gap-12 lg:flex-row lg:gap-28">
              <p className="mt-6">{impact_description}</p>
            </div>
          </LayoutContainer>
        )}
      </LayoutContainer>
    </>
  );
};

export default OpenCallFundingImpact;
