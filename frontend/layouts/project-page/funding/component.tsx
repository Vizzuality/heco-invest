import React from 'react';

import { FormattedMessage } from 'react-intl';

import Icon from 'components/icon';
import { FundingProps } from 'layouts/project-page/funding/types';

import CHECKLIST_SVG from 'svgs/project/funding/checklist-pen.svg';
import MONEY_SVG from 'svgs/project/funding/monetization-approve.svg';
import PRESENTATION_SVG from 'svgs/project/funding/performance-presentation-graph.svg';
import CLOCK_SVG from 'svgs/project/funding/stopwatch.svg';
import TARGET_SVG from 'svgs/project/funding/target-correct.svg';

export const Funding: React.FC<FundingProps> = ({ project }: FundingProps) => {
  console.log({ project });
  return (
    <section>
      <h2 className="font-serif text-3xl text-black">
        <FormattedMessage defaultMessage="Funding & development" id="psXhQO" />
      </h2>
      <div className="flex p-16 space-x-10 text-white bg-green-dark rounded-2xl">
        <div className="flex flex-col w-1/3 space-y-4 border-r-2 border-white">
          <h3 className="font-serif text-3xl">
            <FormattedMessage defaultMessage="Currently looking for" id="sV+3z0" />
          </h3>
          <div className="flex space-x-20">
            <div className="flex flex-col">
              <p className="font-semibold">$ 24000</p>
              <p>
                <FormattedMessage defaultMessage="Value" id="GufXy5" />
              </p>
            </div>
            <div className="flex-col">
              <p className="font-semibold">Loan</p>
              <p>
                <FormattedMessage defaultMessage="Instrument type" id="fDd10o" />
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-2/3 space-y-4">
          <h3 className="font-serif text-3xl">
            <FormattedMessage defaultMessage="How the money will be used" id="IkUX0b" />
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis amet ullamcorper faucibus
            lacus in. Erat amet, interdum erat in porttitor sed eleifend rutrum lorem. Purus lorem
            amet, eget venenatis ac arcu. Fusce in odio iaculis eget sed. Tristique gravida sem nunc
            vitae convallis sit sit tempor. Augue massa facilisis aliquet massa libero quam eget mi.
            Lectus tellus a bibendum purus vulputate quisque massa lacus at. Nisi, mattis amet eu
            enim turpis. Massa nulla non eu sit commodo. Arcu amet, aliquet mattis quis sodales
            tincidunt purus commodo. Non condimentum a rhoncus tellus aenean iaculis.
          </p>
        </div>
      </div>
      <div className="flex flex-col my-24 space-y-16 mx-44">
        <div className="flex space-x-24">
          <div>
            <Icon icon={CLOCK_SVG} className="w-16 h-16" />
          </div>
          <div className="flex w-full text-base">
            <div className="flex flex-col w-1/2 space-y-3">
              <p className="text-xl font-semibold">12 months</p>
              <h4>
                <FormattedMessage defaultMessage="Duration of the project" id="5kZ+j+" />
              </h4>
            </div>
            <div className="flex flex-col w-1/2 space-y-3">
              <p className="text-xl font-semibold">Scaling</p>
              <h4>
                <FormattedMessage defaultMessage="Maturity / stage of development" id="Scnx6A" />
              </h4>
            </div>
          </div>
        </div>
        <div className="flex space-x-24">
          <div>
            <Icon icon={MONEY_SVG} className="w-16 h-16" />
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="font-serif text-3xl">
              <FormattedMessage defaultMessage="Sustainability of the project" id="8MAKwj" />
            </h3>
            <p className="font-sans text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis amet ullamcorper
              faucibus lacus in. Erat amet, interdum erat in porttitor sed eleifend rutrum lorem.
              Purus lorem amet, eget venenatis ac arcu.
            </p>
            <p>
              Fusce in odio iaculis eget sed. Tristique gravida sem nunc vitae convallis sit sit
              tempor. Augue massa facilisis aliquet massa libero quam eget mi. Lectus tellus a
              bibendum purus vulputate quisque massa lacus at. Nisi, mattis amet eu enim turpis.
              Massa nulla non eu sit commodo. Arcu amet, aliquet mattis quis sodales tincidunt purus
              commodo. Non condimentum a rhoncus tellus aenean iaculis.
            </p>
          </div>
        </div>
        <div className="flex space-x-24">
          <div>
            <Icon icon={TARGET_SVG} className="w-16 h-16" />
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="font-serif text-3xl">
              <FormattedMessage defaultMessage="Replicability of the project" id="qoImFc" />
            </h3>
            <p className="font-sans text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis amet ullamcorper
              faucibus lacus in. Erat amet, interdum erat in porttitor sed eleifend rutrum lorem.
              Purus lorem amet, eget venenatis ac arcu.
            </p>
            <p>
              Fusce in odio iaculis eget sed. Tristique gravida sem nunc vitae convallis sit sit
              tempor. Augue massa facilisis aliquet massa libero quam eget mi. Lectus tellus a
              bibendum purus vulputate quisque massa lacus at. Nisi, mattis amet eu enim turpis.
              Massa nulla non eu sit commodo. Arcu amet, aliquet mattis quis sodales tincidunt purus
              commodo. Non condimentum a rhoncus tellus aenean iaculis.
            </p>
          </div>
        </div>
        <div className="flex space-x-24">
          <div>
            <Icon icon={PRESENTATION_SVG} className="w-16 h-16" />
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="font-serif text-3xl">
              <FormattedMessage defaultMessage="Progress and impact tracking" id="JJQfhh" />
            </h3>
            <p className="font-sans text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis amet ullamcorper
              faucibus lacus in. Erat amet, interdum erat in porttitor sed eleifend rutrum lorem.
              Purus lorem amet, eget venenatis ac arcu.
            </p>
            <p>
              Fusce in odio iaculis eget sed. Tristique gravida sem nunc vitae convallis sit sit
              tempor. Augue massa facilisis aliquet massa libero quam eget mi. Lectus tellus a
              bibendum purus vulputate quisque massa lacus at. Nisi, mattis amet eu enim turpis.
              Massa nulla non eu sit commodo. Arcu amet, aliquet mattis quis sodales tincidunt purus
              commodo. Non condimentum a rhoncus tellus aenean iaculis.
            </p>
          </div>
        </div>
        <div className="flex space-x-24">
          <div>
            <Icon icon={CHECKLIST_SVG} className="w-16 h-16" />
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="font-serif text-3xl">Other information</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Funding;
