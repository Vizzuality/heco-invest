import React from 'react';

import { FormattedMessage } from 'react-intl';

import { OverviewProps } from 'layouts/project-page/overview/types';

export const Overview: React.FC<OverviewProps> = ({ project }: OverviewProps) => {
  const { country, municipality } = project;

  return (
    <section className="p-16 font-serif text-white lg:justify-between lg:flex bg-green-dark rounded-2xl">
      <div className="grid w-full grid-cols-2 gap-12">
        <div className="flex flex-col col-start-2 mb-16 space-y-4">
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis amet ullamcorper faucibus
            lacus in. Erat amet, interdum erat in porttitor sed eleifend rutrum lorem. Purus lorem
            amet, eget venenatis ac arcu.
          </p>
          <p className="font-sans text-base">
            Fusce in odio iaculis eget sed. Tristique gravida sem nunc vitae convallis sit sit
            tempor. Augue massa facilisis aliquet massa libero quam eget mi. Lectus tellus a
            bibendum purus vulputate quisque massa lacus at. Nisi, mattis amet eu enim turpis. Massa
            nulla non eu sit commodo. Arcu amet, aliquet mattis quis sodales tincidunt purus
            commodo. Non condimentum a rhoncus tellus aenean iaculis.
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="text-3xl">The solution proposed</h2>
          <p className="font-sans text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis amet ullamcorper faucibus
            lacus in. Erat amet, interdum erat in porttitor sed eleifend rutrum lorem. Purus lorem
            amet, eget venenatis ac arcu.
          </p>
          <p className="font-sans text-base">
            Fusce in odio iaculis eget sed. Tristique gravida sem nunc vitae convallis sit sit
            tempor. Augue massa facilisis aliquet massa libero quam eget mi. Lectus tellus a
            bibendum purus vulputate quisque massa lacus at. Nisi, mattis amet eu enim turpis. Massa
            nulla non eu sit commodo. Arcu amet, aliquet mattis quis sodales tincidunt purus
            commodo. Non condimentum a rhoncus tellus aenean iaculis.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Overview;
