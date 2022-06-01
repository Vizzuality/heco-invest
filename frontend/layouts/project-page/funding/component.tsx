import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';
import { FundingProps } from 'layouts/project-page/funding/types';

import CHECKLIST_SVG from 'svgs/project/funding/checklist-pen.svg';
import MONEY_SVG from 'svgs/project/funding/monetization-approve.svg';
import PRESENTATION_SVG from 'svgs/project/funding/performance-presentation-graph.svg';
import CLOCK_SVG from 'svgs/project/funding/stopwatch.svg';
import TARGET_SVG from 'svgs/project/funding/target-correct.svg';

export const Funding: React.FC<FundingProps> = ({ project }: FundingProps) => {
  const { formatMessage } = useIntl();

  const { development_stage, estimated_duration_in_months } = project;

  const FUNDING_CONTENT = [
    {
      title: formatMessage({
        id: '8MAKwj',
        defaultMessage: 'Sustainability of the project',
      }),
      icon: MONEY_SVG,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis amet ullamcorper faucibus lacus in.Erat amet, interdum erat in porttitor sed eleifend rutrum lorem. Purus lorem amet, eget venenatis ac arcu. Fusce in odio iaculis eget sed.Tristique gravida sem nunc vitae convallis sit sit tempor. Augue massa facilisis aliquet massa libero quam eget mi.Lectus tellus a bibendum purus vulputate quisque massa lacus at.Nisi, mattis amet eu enim turpis. Massa nulla non eu sit commodo. Arcu amet, aliquet mattis quis sodales tincidunt purus commodo.Non condimentum a rhoncus tellus aenean iaculis.',
    },
    {
      title: formatMessage({
        id: 'qoImFc',
        defaultMessage: 'Replicability of the project',
      }),
      icon: TARGET_SVG,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis amet ullamcorper faucibus lacus in.Erat amet, interdum erat in porttitor sed eleifend rutrum lorem. Purus lorem amet, eget venenatis ac arcu. Fusce in odio iaculis eget sed.Tristique gravida sem nunc vitae convallis sit sit tempor. Augue massa facilisis aliquet massa libero quam eget mi.Lectus tellus a bibendum purus vulputate quisque massa lacus at.Nisi, mattis amet eu enim turpis. Massa nulla non eu sit commodo. Arcu amet, aliquet mattis quis sodales tincidunt purus commodo.Non condimentum a rhoncus tellus aenean iaculis.',
    },
    {
      title: formatMessage({
        id: 'JJQfhh',
        defaultMessage: 'Progress and impact tracking',
      }),
      icon: PRESENTATION_SVG,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis amet ullamcorper faucibus lacus in.Erat amet, interdum erat in porttitor sed eleifend rutrum lorem. Purus lorem amet, eget venenatis ac arcu. Fusce in odio iaculis eget sed.Tristique gravida sem nunc vitae convallis sit sit tempor. Augue massa facilisis aliquet massa libero quam eget mi.Lectus tellus a bibendum purus vulputate quisque massa lacus at.Nisi, mattis amet eu enim turpis. Massa nulla non eu sit commodo. Arcu amet, aliquet mattis quis sodales tincidunt purus commodo.Non condimentum a rhoncus tellus aenean iaculis.',
    },
    {
      title: formatMessage({
        id: 'kX7oGR',
        defaultMessage: 'Other information',
      }),
      icon: CHECKLIST_SVG,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis amet ullamcorper faucibus lacus in.Erat amet, interdum erat in porttitor sed eleifend rutrum lorem. Purus lorem amet, eget venenatis ac arcu. Fusce in odio iaculis eget sed.Tristique gravida sem nunc vitae convallis sit sit tempor. Augue massa facilisis aliquet massa libero quam eget mi.Lectus tellus a bibendum purus vulputate quisque massa lacus at.Nisi, mattis amet eu enim turpis. Massa nulla non eu sit commodo. Arcu amet, aliquet mattis quis sodales tincidunt purus commodo.Non condimentum a rhoncus tellus aenean iaculis.',
    },
  ];

  return (
    <section>
      <LayoutContainer className="mb-20 mt-36">
        <h2 className="pl-6 mb-6 font-serif text-3xl text-black md:pl-16">
          <FormattedMessage defaultMessage="Funding & development" id="psXhQO" />
        </h2>
        <div className="flex flex-col p-16 text-white md:space-x-10 md:flex-row bg-green-dark rounded-2xl">
          <div className="flex flex-col w-1/3 pr-10 space-y-8 border-r-2 border-white">
            <h3 className="font-serif text-3xl">
              <FormattedMessage defaultMessage="Currently looking for" id="sV+3z0" />
            </h3>
            <div className="flex space-x-20 font-sans">
              <div className="flex flex-col space-y-1">
                <p className="text-2xl font-semibold">$ 24000</p>
                <p className="text-base">
                  <FormattedMessage defaultMessage="Value" id="GufXy5" />
                </p>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-2xl font-semibold">Loan</p>
                <p className="text-base">
                  <FormattedMessage defaultMessage="Instrument type" id="fDd10o" />
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:space-y-4 md:w-2/3">
            <h3 className="font-serif text-3xl">
              <FormattedMessage defaultMessage="How the money will be used" id="IkUX0b" />
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis amet ullamcorper
              faucibus lacus in. Erat amet, interdum erat in porttitor sed eleifend rutrum lorem.
              Purus lorem amet, eget venenatis ac arcu. Fusce in odio iaculis eget sed. Tristique
              gravida sem nunc vitae convallis sit sit tempor. Augue massa facilisis aliquet massa
              libero quam eget mi. Lectus tellus a bibendum purus vulputate quisque massa lacus at.
              Nisi, mattis amet eu enim turpis. Massa nulla non eu sit commodo. Arcu amet, aliquet
              mattis quis sodales tincidunt purus commodo. Non condimentum a rhoncus tellus aenean
              iaculis.
            </p>
          </div>
        </div>
        <div className="flex flex-col my-24 space-y-16 md:mx-44">
          <div className="flex space-x-12 md:space-x-24">
            <div>
              <Icon icon={CLOCK_SVG} className="w-16 h-16" />
            </div>
            <div className="flex w-full text-base">
              <div className="flex flex-col w-1/2 space-y-3">
                <p className="text-xl font-semibold">{estimated_duration_in_months} months</p>
                <h4>
                  <FormattedMessage defaultMessage="Duration of the project" id="5kZ+j+" />
                </h4>
              </div>
              <div className="flex flex-col w-1/2 space-y-3">
                <p className="text-xl font-semibold capitalize">{development_stage}</p>
                <h4>
                  <FormattedMessage defaultMessage="Maturity / stage of development" id="Scnx6A" />
                </h4>
              </div>
            </div>
          </div>
          {FUNDING_CONTENT.map((item, index) => (
            <div key={index} className="flex space-x-12 md:space-x-24">
              <div>
                <Icon icon={item.icon} className="w-16 h-16" />
              </div>
              <div className="flex flex-col space-y-4">
                <h3 className="font-serif text-3xl">{item.title}</h3>
                <p className="font-sans text-base">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
};

export default Funding;
