import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import { useRouter } from 'next/router';

import SDGs from 'containers/sdgs/component';

import LayoutContainer from 'components/layout-container';

import { OpenCallFundingImpactProps } from '.';

export const OpenCallFundingImpact: FC<OpenCallFundingImpactProps> = ({
  openCall,
  allSdgs,
  instrumentTypes,
}) => {
  const { locale } = useRouter();

  const {
    impact_description,
    sdgs,
    maximum_funding_per_project,
    funding_priorities,
    funding_exclusions,
  } = openCall;

  const openCallSdgs = allSdgs.filter((sdg) => sdgs.includes(Number(sdg.id)));

  return (
    <>
      <LayoutContainer>
        <LayoutContainer>
          <h2 className="mb-10 font-serif text-4xl font-bold">
            <FormattedMessage defaultMessage="Funding information" id="mEYG82" />
          </h2>
        </LayoutContainer>
        <LayoutContainer className="p-6 text-white lg:p-16 bg-green-dark rounded-2xl">
          <div>
            <h3 className="font-serif text-3xl font-semibold sm:w-1/2">
              <FormattedMessage defaultMessage="Funding available per project" id="+USuwC" />
            </h3>
            <div className="flex flex-col gap-6 mt-10 lg:gap-56 sm:flex-row">
              <div>
                <p className="mb-2 text-2xl font-semibold">
                  ${maximum_funding_per_project?.toLocaleString(locale)}
                </p>
                <p className="text-base">
                  <FormattedMessage defaultMessage="Maximum value" id="sfFhiy" />
                </p>
              </div>
              <div>
                <div className="flex-wrap gap-x-4 sm:flex">
                  {instrumentTypes?.map((instrumentType, index) => (
                    <>
                      <p key={instrumentType} className="mb-2 text-2xl font-semibold">
                        {instrumentType}
                      </p>
                      {index !== instrumentTypes.length - 1 && (
                        <span className="hidden text-2xl sm:inline">&#183;</span>
                      )}
                    </>
                  ))}
                </div>
                <p className="text-base">
                  <FormattedMessage
                    defaultMessage="{numInstrumentTypes, plural, one {Instrument type} other {Instrument types}}"
                    id="eFJIPT"
                    values={{
                      numInstrumentTypes: instrumentTypes?.length || 0,
                    }}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-20 gap-14 sm:flex-row">
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

      <LayoutContainer className="my-20 sm:my-36">
        {!!openCallSdgs.length ? (
          <LayoutContainer>
            <div>
              <h2 className="mb-10 font-serif text-4xl font-bold">
                <FormattedMessage defaultMessage="Impact" id="W2JBdp" />
              </h2>
            </div>
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
                <SDGs sdgs={openCallSdgs} />
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
