import React, { useMemo } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

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

  const { estimated_duration_in_months } = project;

  const ticketSizeStr = useMemo(
    () => enums.ticket_size?.find(({ id }) => project.ticket_size === id)?.description,
    [enums, project]
  );

  const developmentStageStr = useMemo(
    () => enums.project_development_stage?.find(({ id }) => project.development_stage === id)?.name,
    [enums, project]
  );

  const instrumentTypesStr = useMemo(
    () =>
      enums.instrument_type
        ?.filter(({ id }) => project.instrument_types?.includes(id))
        .map(({ name }, idx) => (idx === 0 ? name : name.toLowerCase().trim()))
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
      <LayoutContainer className="px-0 mb-10 sm:mb-20 mt-18 lg:mt-36">
        <h2 className="pl-6 mb-4 font-serif text-4xl text-black sm:mb-6 lg:pl-16 lg:mb-16">
          <FormattedMessage defaultMessage="Funding & development" id="psXhQO" />
        </h2>
        <div className="flex flex-col px-4 py-6 text-white sm:px-12 sm:py-12 lg:space-x-10 lg:flex-row bg-green-dark sm:rounded-t-2xl">
          <div className="flex flex-col pb-8 space-y-8 border-white lg:pr-10 lg:pb-6 lg:w-2/5 lg:border-r">
            <h3 className="font-serif text-3xl">
              {project.looking_for_funding ? (
                <FormattedMessage defaultMessage="Currently looking for" id="sV+3z0" />
              ) : (
                <FormattedMessage defaultMessage="Currently not looking for funding" id="Ll72W/" />
              )}
            </h3>
            {project.looking_for_funding && (
              <div className="flex flex-wrap justify-between gap-6 font-sans sm:flex-nowrap lg:flex-wrap 2xl:flex-nowrap lg:gap-x-8 xl:gap-x-20">
                <div className="flex flex-col justify-end space-y-1 w-fit">
                  <p className="text-2xl font-semibold">{ticketSizeStr}</p>
                  <p className="text-base whitespace-nowrap">
                    <FormattedMessage defaultMessage="Value" id="GufXy5" />
                  </p>
                </div>
                <div className="flex flex-col justify-end space-y-1 w-fit">
                  <p className="text-2xl font-semibold">{instrumentTypesStr}</p>
                  <p className="text-base">
                    <FormattedMessage defaultMessage="Instrument type" id="fDd10o" />
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-4 lg:w-3/5">
            {project.looking_for_funding ? (
              <>
                <h3 className="font-serif text-3xl">
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
        <div className="flex items-center justify-center bg-green-light rounded-b-2xl bg-opacity-30">
          <span className="px-6 py-2 text-sm text-center text-gray-800">
            <FormattedMessage
              defaultMessage="Due to security reasons, we are not allowed to display more <b>detailed financial information</b>. Please contact the Project Developers directly in order to obtain detailed information."
              id="Ay+1nm"
              values={{
                b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
              }}
            />
          </span>
        </div>
        <LayoutContainer>
          <div className="flex flex-col mt-12 gap-y-12 sm:gap-y-16 lg:my-24 lg:mx-44">
            <div className="flex items-center gap-y-12 gap-x-4 sm:gap-y-0 sm:items-stretch sm:flex-row sm:space-x-24">
              <div>
                <Icon icon={CLOCK_SVG} className="w-16 h-16" />
              </div>
              <div className="flex flex-col w-full text-base gap-y-6 sm:flex-row">
                <div className="flex flex-col space-y-3 sm:w-1/2">
                  <p className="text-xl font-semibold">
                    <FormattedMessage
                      defaultMessage="{duration} months"
                      values={{ duration: estimated_duration_in_months }}
                      id="qcsPS9"
                    />
                  </p>
                  <h4 className="text-gray-600">
                    <FormattedMessage defaultMessage="Duration of the project" id="5kZ+j+" />
                  </h4>
                </div>
                <div className="flex flex-col space-y-3 sm:w-1/2">
                  <p className="text-xl font-semibold capitalize">{developmentStageStr}</p>
                  <h4 className="text-gray-600">
                    <FormattedMessage
                      defaultMessage="Maturity / stage of development"
                      id="Scnx6A"
                    />
                  </h4>
                </div>
              </div>
            </div>
            {FUNDING_CONTENT.map(({ id, title, description, icon }) => {
              if (!description) return;

              return (
                <div
                  key={id}
                  className="flex flex-col gap-y-6 sm:gap-y-0 sm:items-stretch sm:flex-row sm:space-x-24"
                >
                  <div className="flex gap-x-4">
                    <Icon icon={icon} className="flex-shrink-0 w-16 h-16" />
                    <h3 className="font-serif text-2xl sm:hidden sm:text-3xl">{title}</h3>
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <h3 className="hidden font-serif text-2xl sm:block sm:text-3xl">{title}</h3>
                    <p
                      className={cx('font-sans text-base text-gray-600', {
                        'break-all': id === 'relevant_links',
                      })}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </LayoutContainer>
      </LayoutContainer>
    </section>
  );
};

export default Funding;
