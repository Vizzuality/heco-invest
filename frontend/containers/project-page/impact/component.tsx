import React, { useState, useMemo } from 'react';

import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import { projectImpact } from 'helpers/project';

import ImpactChart from 'containers/impact-chart';
import ImpactText from 'containers/impact-text';
import ImpactModal from 'containers/modals/impact';
import { ImpactProps } from 'containers/project-page/impact/types';
import SDGs from 'containers/sdgs/component';

import Button from 'components/button';
import Select, { Option } from 'components/forms/select';
import LayoutContainer from 'components/layout-container';
import Tag from 'components/tag';
import Tooltip from 'components/tooltip';
import { ImpactAreas } from 'enums';

export const Impact: React.FC<ImpactProps> = ({ project, enums }: ImpactProps) => {
  const [impactLocation, setImpactLocation] = useState<ImpactAreas>(ImpactAreas.Municipality);
  const [impactModalOpen, setImpactModalOpen] = useState<boolean>(false);
  const { control } = useForm();
  const intl = useIntl();

  const impact = useMemo(() => projectImpact(project)[impactLocation], [impactLocation, project]);
  const impactScore = useMemo(
    () => (impact?.total ? Math.round(impact?.total * 10) : null),
    [impact]
  );
  const targetGroups = enums?.project_target_group?.filter((targetGroup) =>
    project.target_groups?.includes(targetGroup.id)
  );
  const sdgs = enums.sdg.filter(({ id }) => project.sdgs.includes(parseInt(id)));

  const OPTIONS = [
    {
      key: ImpactAreas.Municipality,
      label: intl.formatMessage({ defaultMessage: 'Municipality', id: '9I1zvK' }),
    },
    {
      key: ImpactAreas.Hydrobasin,
      label: intl.formatMessage({ defaultMessage: 'Hydrobasin', id: 'VVlH2M' }),
    },
    {
      key: ImpactAreas.PriorityLandscape,
      label: intl.formatMessage({ defaultMessage: 'HeCo priority landscape', id: 'kPq9Kx' }),
    },
  ];

  return (
    <section>
      <LayoutContainer className="space-y-6 lg:mt-36">
        <h2 className="pl-6 font-serif text-2xl text-black lg:text-4xl lg:pl-16 lg:mb-10">
          <FormattedMessage defaultMessage="Impact" id="W2JBdp" />
        </h2>
        <div className="flex-col p-6 space-y-8 font-sans lg:space-y-24 lg:p-16 lg:justify-between lg:flex bg-background-greenLight rounded-2xl">
          <div className="flex flex-col justify-between space-y-6 lg:space-y-0 lg:space-x-32 lg:flex-row">
            <div className="flex flex-col space-y-6 lg:w-1/2">
              <div className="flex flex-col space-y-6">
                <h3 className="text-xl font-semibold">
                  <FormattedMessage defaultMessage="Target group(s)" id="ilgFAX" />
                </h3>
                <div>
                  {targetGroups?.map(({ id, name }) => (
                    <Tag
                      key={id}
                      className="mb-2 mr-2 text-xs text-black bg-white lg:text-sm"
                      size="small"
                    >
                      {name}
                    </Tag>
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-6">
                <h3 className="text-xl font-semibold">
                  <FormattedMessage defaultMessage="Expected Impact" id="8rIwwr" />
                </h3>
                <p className="text-base">{project.expected_impact}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-6 lg:w-1/2">
              <h3 className="text-xl font-semibold">
                <FormattedMessage defaultMessage="SDG'S" id="vTJ8GJ" />
              </h3>
              <SDGs sdgs={sdgs} size="large" />
            </div>
          </div>

          <div className="flex flex-col justify-between h-full lg:flex-row">
            <div className="flex flex-col justify-between">
              <div className="flex flex-col items-start space-y-6 lg:w-3/4 md:pr-24">
                <h3 className="text-xl font-semibold">
                  <FormattedMessage defaultMessage="Estimated Impact" id="PheCRL" />
                </h3>
                <div className="flex flex-col space-y-2.5 w-full">
                  <label htmlFor="impact-location" className="text-sm text-gray-800">
                    <FormattedMessage defaultMessage="Display impact on" id="ufxVRM" />
                  </label>
                  <Select
                    id="impact-location"
                    name="impact-location"
                    aria-describedby="country-error"
                    control={control}
                    controlOptions={{
                      value: impactLocation,
                      disabled: false,
                      onChange: (e) => setImpactLocation(e.target.value),
                    }}
                  >
                    {OPTIONS.map(({ key, label }) => (
                      <Option key={key}>{label}</Option>
                    ))}
                  </Select>
                </div>
                <ImpactText className="my-4" area={impactLocation as ImpactAreas} impact={impact} />
                <button
                  onClick={() => setImpactModalOpen(true)}
                  type="button"
                  className="underline hover:no-underline text-green-dark pointer"
                >
                  <FormattedMessage defaultMessage="How is the impact calculated?" id="9cE0nR" />
                </button>
                <div
                  className={cx('transition-all ease-in-out duration-300', {
                    'h-0 opacity-0': impactLocation !== ImpactAreas.PriorityLandscape,
                    'h-auto opacity-100': impactLocation === ImpactAreas.PriorityLandscape,
                  })}
                  aria-hidden={impactLocation !== ImpactAreas.PriorityLandscape}
                >
                  <p>
                    <FormattedMessage
                      defaultMessage="<n>HeCo priority landscapes</n> are geographic spaces of unique biodiversity conditions with sustainability and management plans developed by Herencia Colombia to ensure the provisioning of quality ecosystems"
                      id="0WEEzi"
                      values={{
                        n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
                      }}
                    />
                  </p>
                  <Button
                    theme="naked"
                    className="py-0 px-0 mt-4 text-green-dark font-normal text-small underline inline !items-start"
                    to="/images/mosaics.png"
                    size="small"
                    external
                  >
                    <FormattedMessage defaultMessage="Landscapes location" id="4HIQfn" />
                  </Button>
                </div>
              </div>
              {/* DESKTOP */}
              {impactScore && (
                <div className="flex-col items-center hidden p-6 font-semibold bg-white lg:flex w-52 rounded-xl">
                  <p className=" text-green-dark">
                    <span className="text-2xl">{impactScore}</span>/ 100
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-base text-gray-800">
                      <FormattedMessage defaultMessage="Impact score" id="2GBpne" />
                    </p>

                    <Tooltip
                      placement="right"
                      arrow
                      arrowClassName="bg-black"
                      content={
                        <div className="max-w-md p-2 font-sans text-sm font-normal text-white bg-black rounded-sm w-72">
                          <FormattedMessage
                            defaultMessage="Integration of project impact in each dimension (climate, biodiversity, water community) into a single score, ranging from 0 to 100."
                            id="sFn7MX"
                          />
                        </div>
                      }
                    >
                      <button
                        type="button"
                        className="box-border flex items-center justify-center w-4 h-4 text-gray-800 border border-gray-800 rounded-full pointer"
                      >
                        <p className="text-xs">i</p>
                      </button>
                    </Tooltip>
                  </div>
                </div>
              )}
            </div>
            <div className="my-8 lg:my-24 lg:w-1/2">
              <ImpactChart category={project.category} impact={impact} />
            </div>
            {/* MOBILE */}
            {impactScore && (
              <div className="flex flex-col items-center p-6 font-semibold bg-white lg:hidden w-52 rounded-xl">
                <p className="text-green-dark">
                  <span className="text-2xl">{impactScore}</span>/ 100
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-base text-gray-800">
                    <FormattedMessage defaultMessage="Impact score" id="2GBpne" />
                  </p>

                  <Tooltip
                    placement="right"
                    arrow
                    arrowClassName="bg-black"
                    content={
                      <div className="max-w-md p-2 font-sans text-sm font-normal text-white bg-black rounded-sm w-72">
                        <FormattedMessage
                          defaultMessage="Integration of project impact in each dimension (climate, biodiversity, water community) into a single score, ranging from 0 to 100."
                          id="sFn7MX"
                        />
                      </div>
                    }
                  >
                    <button
                      type="button"
                      className="box-border flex items-center justify-center w-4 h-4 text-gray-800 border border-gray-800 rounded-full pointer"
                    >
                      <p className="text-xs">i</p>
                    </button>
                  </Tooltip>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutContainer>
      <ImpactModal impactModalOpen={impactModalOpen} setImpactModalOpen={setImpactModalOpen} />
    </section>
  );
};

export default Impact;
