import React from 'react';

import { FormattedMessage } from 'react-intl';

import LayoutContainer from 'components/layout-container';
import Map from 'components/map';
import { OverviewProps } from 'layouts/project-page/overview/types';

export const Overview: React.FC<OverviewProps> = ({ project }: OverviewProps) => {
  const { country, municipality } = project;

  return (
    <LayoutContainer className="mb-20 mt-18 space-y-36">
      <section className="p-16 mt-48 font-serif text-white bg-green-dark rounded-2xl">
        <div className="relative grid w-full grid-cols-2 gap-12">
          <Map
            className="absolute z-10 -mb-32 border-8 border-white h-96 -top-44 lg:overflow-hidden rounded-xl"
            onMapViewportChange={() => console.log('onMapViewportChange')}
          />
          <div className="flex flex-col col-start-2 space-y-4">
            <h2 className="text-3xl">Location</h2>
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
              <div className="flex space-x-2 font-sans text-base">
                <h3 className="font-semibold">
                  <FormattedMessage defaultMessage="HeCo priority landscape" id="kPq9Kx" />
                </h3>
                <p>{municipality.parent.name}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="text-3xl">The problem we are solving</h2>
            <p className="font-sans text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis amet ullamcorper
              faucibus lacus in. Erat amet, interdum erat in porttitor sed eleifend rutrum lorem.
              Purus lorem amet, eget venenatis ac arcu.
            </p>
            <p className="font-sans text-base">
              Fusce in odio iaculis eget sed. Tristique gravida sem nunc vitae convallis sit sit
              tempor. Augue massa facilisis aliquet massa libero quam eget mi. Lectus tellus a
              bibendum purus vulputate quisque massa lacus at. Nisi, mattis amet eu enim turpis.
              Massa nulla non eu sit commodo. Arcu amet, aliquet mattis quis sodales tincidunt purus
              commodo. Non condimentum a rhoncus tellus aenean iaculis.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="text-3xl">The solution proposed</h2>
            <p className="font-sans text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis amet ullamcorper
              faucibus lacus in. Erat amet, interdum erat in porttitor sed eleifend rutrum lorem.
              Purus lorem amet, eget venenatis ac arcu.
            </p>
            <p className="font-sans text-base">
              Fusce in odio iaculis eget sed. Tristique gravida sem nunc vitae convallis sit sit
              tempor. Augue massa facilisis aliquet massa libero quam eget mi. Lectus tellus a
              bibendum purus vulputate quisque massa lacus at. Nisi, mattis amet eu enim turpis.
              Massa nulla non eu sit commodo. Arcu amet, aliquet mattis quis sodales tincidunt purus
              commodo. Non condimentum a rhoncus tellus aenean iaculis.
            </p>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
};

export default Overview;
