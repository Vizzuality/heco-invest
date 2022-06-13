import React from 'react';

import { FormattedMessage } from 'react-intl';

import { OverviewProps } from 'containers/project-page/overview/types';

import LayoutContainer from 'components/layout-container';
import Map from 'components/map';

export const Overview: React.FC<OverviewProps> = ({ project }: OverviewProps) => {
  const { country, municipality, priority_landscape } = project;

  return (
    <LayoutContainer className="mb-14 lg:mb-20 mt-18 space-y-36">
      <section className="p-6 mt-32 font-serif text-white lg:mt-48 lg:p-16 bg-green-dark rounded-2xl">
        <div className="relative grid w-full grid-cols-1 gap-12 lg:grid-cols-2">
          <Map
            className="absolute z-10 -mb-20 border-8 border-white lg:-mb-32 drop-shadow-xl h-96 -top-24 lg:-top-44 lg:overflow-hidden rounded-xl"
            onMapViewportChange={() => console.log('onMapViewportChange')}
          />
          <div className="flex flex-col space-y-4 lg:col-start-2">
            <h2 className="text-2xl lg:text-3xl">
              <FormattedMessage defaultMessage="Location" id="rvirM2" />
            </h2>
            <div className="flex flex-col space-y-1">
              <div className="flex space-x-2 font-sans text-base">
                <h3 className="font-semibold">
                  <FormattedMessage defaultMessage="Country" id="vONi+O" />
                </h3>
                <p>{country.name}</p>
              </div>
              <div className="flex space-x-2 font-sans text-base">
                <h3 className="font-semibold">
                  <FormattedMessage defaultMessage="Municipality" id="9I1zvK" />
                </h3>
                <p>{municipality.name}</p>
              </div>

              {!!priority_landscape && (
                <div className="flex flex-wrap font-sans text-base sm:space-x-2 sm:flex-nowrap">
                  <h3 className="font-semibold whitespace-pre">
                    <FormattedMessage defaultMessage="HeCo priority landscape" id="kPq9Kx" />
                  </h3>
                  <p>{priority_landscape.name}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl lg:text-3xl">
              <FormattedMessage defaultMessage="The problem we are solving" id="MXykbb" />
            </h2>
            <p className="font-sans text-base">{project.problem}</p>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl lg:text-3xl">
              <FormattedMessage defaultMessage="The solution proposed" id="9CDBQg" />
            </h2>
            <p className="font-sans text-base">{project.solution}</p>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
};

export default Overview;
