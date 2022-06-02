import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { useBreakpoint } from 'hooks/use-breakpoint';

import ImpactModal from 'containers/modals/impact';
import Score from 'containers/project-page/impact/score/component';
import { ImpactProps } from 'containers/project-page/impact/types';
import SDGs from 'containers/sdgs/component';

import Combobox, { Option } from 'components/forms/combobox';
import ImpactChart from 'components/impact-chart';
import LayoutContainer from 'components/layout-container';
import Tag from 'components/tag';
import sdgsMock from 'mockups/sdgs.json';
import { Enum } from 'types/enums';

export const Impact: React.FC<ImpactProps> = ({ project }: ImpactProps) => {
  const [impactLocation, setImpactLocation] = useState<string>('Municipality');
  const [impactModalOpen, setImpactModalOpen] = useState<boolean>(false);
  const { control } = useForm();
  const breakpoint = useBreakpoint();

  // TODO: Change for real project attibute
  const projectImpact = [4, 6, 8, 3];

  const { target_groups: tags, expected_impact: expected } = project;

  const sdgs = sdgsMock.filter(({ id }) => project.sdgs.includes(parseInt(id)));

  const formatCapitalizeDashedString = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');
  };

  const formatDashedString = (s) => {
    return s.replace(/-/g, ' ');
  };

  const OPTIONS = [
    { key: 'municipality', label: 'Municipality' },
    { key: 'hydrobasin', label: 'Hydrobasin' },
    { key: 'heco-priority-landscape', label: 'HeCo priority landscape' },
  ];

  return (
    <section>
      <LayoutContainer className="mb-20 space-y-6 lg:mt-36">
        <h2 className="pl-6 font-serif text-2xl text-black lg:text-3xl lg:pl-16">
          <FormattedMessage defaultMessage="Impact" id="W2JBdp" />
        </h2>
        <div className="flex-col p-6 space-y-24 font-sans lg:p-16 lg:justify-between lg:flex bg-background-greenLight rounded-2xl">
          <div className="flex flex-col justify-between space-y-6 lg:space-y-0 lg:space-x-32 lg:flex-row">
            <div className="flex flex-col space-y-6 lg:w-1/2">
              <div className="flex flex-col space-y-6">
                <h3 className="text-xl font-semibold">
                  <FormattedMessage defaultMessage="Target group(s)" id="ilgFAX" />
                </h3>
                <div>
                  {tags.map((tag) => (
                    <Tag
                      key={tag}
                      className="mb-2 mr-2 text-xs text-black bg-white lg:text-sm"
                      size="small"
                    >
                      {formatCapitalizeDashedString(tag)}
                    </Tag>
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-6">
                <h3 className="text-xl font-semibold">
                  <FormattedMessage defaultMessage="Expected Impact" id="8rIwwr" />
                </h3>
                <p className="text-base">{expected}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-6 lg:w-1/2">
              <h3 className="text-xl font-semibold">
                <FormattedMessage defaultMessage="SDG'S" id="vTJ8GJ" />
              </h3>
              <SDGs sdgs={sdgs as Enum[]} size="large" />
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
                  <Combobox
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
                  </Combobox>
                </div>
                <p className="py-4">
                  <FormattedMessage
                    defaultMessage="In the {impactLocation} the the project has higher impact on Water
                    and has an impact score of 30."
                    id="eVJMyI"
                    values={{ impactLocation: formatDashedString(impactLocation), score: 30 }}
                  />
                </p>
                <button
                  onClick={() => setImpactModalOpen(true)}
                  type="button"
                  className="underline hover:no-underline text-green-dark pointer"
                >
                  <FormattedMessage defaultMessage="How is the impact calculated?" id="9cE0nR" />
                </button>
              </div>
              {breakpoint('lg') && <Score />}
            </div>
            <div className="my-24 lg:w-1/2">
              <ImpactChart category={project.category} impact={projectImpact} />
            </div>
            {!breakpoint('lg') && <Score />}
          </div>
        </div>
      </LayoutContainer>
      <ImpactModal impactModalOpen={impactModalOpen} setImpactModalOpen={setImpactModalOpen} />
    </section>
  );
};

export default Impact;
