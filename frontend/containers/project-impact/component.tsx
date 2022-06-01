import { FC, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import Combobox, { Option } from 'components/forms/combobox';
import ImpactChart from 'components/impact-chart';

import { ProjectImpactProps } from './types';

export const ProjectImpact: FC<ProjectImpactProps> = ({ project }) => {
  const { formatMessage } = useIntl();
  const { control } = useForm<{ 'impact-selector': string }>();

  const impactOptions = [
    { label: formatMessage({ defaultMessage: 'Regions', id: 'RumeRz' }), value: 'regions' },
    { label: formatMessage({ defaultMessage: 'Hidrobasins', id: '/7etcS' }), value: 'hidrobasin' },
    {
      label: formatMessage({ defaultMessage: 'Ecological units', id: 'TFiy8y' }),
      value: 'ecological_units',
    },
  ];

  const impacts = {
    regions: [
      project.municipality_biodiversity_impact,
      project.municipality_climate_impact,
      project.municipality_community_impact,
      project.municipality_water_impact,
    ],
    hidrobasin: [
      project.hydrobasin_biodiversity_impact,
      project.hydrobasin_climate_impact,
      project.hydrobasin_community_impact,
      project.hydrobasin_water_impact,
    ],
    ecological_units: [
      project.priority_landscape_biodiversity_impact,
      project.priority_landscape_climate_impact,
      project.priority_landscape_community_impact,
      project.priority_landscape_water_impact,
    ],
  };

  const [selectedImpact, setSelectedImpact] = useState<number[]>(impacts.regions);

  const handleChangeSelectedImpact = (e) => {
    setSelectedImpact(impacts[e.target.value]);
  };

  return (
    <div className="px-2 py-16 lg:justify-between sm:px-12 sm:py-20 lg:flex bg-background-greenLight rounded-2xl">
      <div>
        <Combobox
          name="impact-selector"
          id="impact-selector"
          control={control}
          controlOptions={{ disabled: false, onChange: handleChangeSelectedImpact }}
          defaultSelectedKey="regions"
        >
          {impactOptions.map(({ label, value }) => (
            <Option key={value}>{label}</Option>
          ))}
        </Combobox>
      </div>
      <ImpactChart category={project.category} impact={selectedImpact} />
    </div>
  );
};

export default ProjectImpact;
