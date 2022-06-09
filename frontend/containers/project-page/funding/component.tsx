import React, { useMemo } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import { FundingProps } from 'containers/project-page/funding/types';

import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';

import CHECKLIST_SVG from 'svgs/project/funding/checklist-pen.svg';
import MONEY_SVG from 'svgs/project/funding/monetization-approve.svg';
import PRESENTATION_SVG from 'svgs/project/funding/performance-presentation-graph.svg';
import CLOCK_SVG from 'svgs/project/funding/stopwatch.svg';
import TARGET_SVG from 'svgs/project/funding/target-correct.svg';

export const Funding: React.FC<FundingProps> = ({ project, enums }: FundingProps) => {
  const { formatMessage } = useIntl();

  const { development_stage, estimated_duration_in_months } = project;

  const ticketSizeStr = useMemo(
    () => enums.ticket_size?.find(({ id }) => project.ticket_size === id)?.description,
    [enums, project]
  );

  const instrumentTypesStr = useMemo(
    () =>
      enums.instrument_type
        ?.filter(({ id }) => project.instrument_types?.includes(id))
        .map(({ name }, idx) => (idx === 0 ? name : name.toLowerCase()))
        .join(', '),
    [enums, project]
  );

  const FUNDING_CONTENT = [
    {
      id: 'sustainability',
      title: formatMessage({
        id: '8MAKwj',
        defaultMessage: 'Sustainability of the project',
      }),
      icon: MONEY_SVG,
      description: project.sustainability,
    },
    {
      id: 'replicability',
      title: formatMessage({
        id: 'qoImFc',
        defaultMessage: 'Replicability of the project',
      }),
      icon: TARGET_SVG,
      description: project.replicability,
    },
    {
      id: 'progress_impact_tracking',
      title: formatMessage({
        id: 'JJQfhh',
        defaultMessage: 'Progress and impact tracking',
      }),
      icon: PRESENTATION_SVG,
      description: project.progress_impact_tracking,
    },
    {
      id: 'relevant_links',
      title: formatMessage({
        id: 'kX7oGR',
        defaultMessage: 'Other information',
      }),
      icon: CHECKLIST_SVG,
      description: project.relevant_links,
    },
  ];

  return (
    <section>
      <LayoutContainer className="mb-20 mt-36">
        <h2 className="pl-6 mb-6 font-serif text-2xl text-black lg:text-3xl lg:pl-16">
          <FormattedMessage defaultMessage="Funding &amp; development" id="psXhQO" />
        </h2>
        <div className="flex flex-col p-6 text-white lg:p-16 lg:space-x-10 lg:flex-row bg-green-dark rounded-2xl">
          <div className="flex flex-col pb-12 pr-10 space-y-8 border-b-2 border-white lg:pb-6 pb:10 lg:border-b-0 lg:w-1/3 lg:border-r-2">
            <h3 className="font-serif text-2xl lg:text-3xl">
              {project.looking_for_funding ? (
                <FormattedMessage defaultMessage="Currently looking for" id="sV+3z0" />
              ) : (
                <FormattedMessage defaultMessage="Currently not looking for funding" id="Ll72W/" />
              )}
            </h3>
            {project.looking_for_funding && (
              <div className="flex flex-col gap-4 font-sans lg:gap-0 lg:space-x-20 lg:flex-row">
                <div className="flex flex-col justify-end space-y-1">
                  <p className="text-xl font-semibold lg:text-2xl">{ticketSizeStr}</p>
                  <p className="text-base whitespace-nowrap">
                    <FormattedMessage defaultMessage="Value" id="GufXy5" />
                  </p>
                </div>
                <div className="flex flex-col justify-end space-y-1">
                  <p className="text-xl font-semibold lg:text-2xl">{instrumentTypesStr}</p>
                  <p className="text-base whitespace-nowrap">
                    <FormattedMessage defaultMessage="Instrument type" id="fDd10o" />
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col mt-12 space-y-4 lg:mt-0 lg:w-2/3">
            {project.looking_for_funding ? (
              <>
                <h3 className="font-serif text-2xl lg:text-3xl">
                  <FormattedMessage defaultMessage="How the money will be used" id="IkUX0b" />
                </h3>
                <p className="text-base">{project.funding_plan}</p>
              </>
            ) : (
              <>
                <p className="text-base">
                  <FormattedMessage
                    defaultMessage="This project isn’t currently looking for funding at this moment."
                    id="8xsdU1"
                  />
                </p>
                <p className="text-base">
                  <FormattedMessage
                    defaultMessage="If you have interest in this project contact the project developer to know how you can work together."
                    id="vIKTZ9"
                  />
                </p>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col my-24 space-y-16 lg:mx-44">
          <div className="flex flex-col items-center space-y-12 lg:space-y-0 lg:items-stretch lg:flex-row lg:space-x-24">
            <div>
              <Icon icon={CLOCK_SVG} className="w-16 h-16" />
            </div>
            <div className="flex w-full text-base">
              <div className="flex flex-col w-1/2 space-y-3">
                <p className="text-xl font-semibold">
                  <FormattedMessage
                    defaultMessage="{duration} months"
                    values={{ duration: estimated_duration_in_months }}
                    id="qcsPS9"
                  />
                </p>
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
          {FUNDING_CONTENT.map(({ id, title, description, icon }) => {
            if (!description) return;

            return (
              <div
                key={id}
                className="flex flex-col items-center space-y-12 lg:space-y-0 lg:items-stretch lg:flex-row lg:space-x-24"
              >
                <div>
                  <Icon icon={icon} className="w-16 h-16" />
                </div>
                <div className="flex flex-col space-y-4">
                  <h3 className="font-serif text-2xl lg:text-3xl">{title}</h3>
                  <p className="font-sans text-base">{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </LayoutContainer>
    </section>
  );
};

export default Funding;
