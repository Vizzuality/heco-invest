import { useMemo } from 'react';

import { useIntl } from 'react-intl';

import { Enum } from 'types/enums';
import { Locations } from 'types/locations';
import { Interest } from 'types/projectDeveloper';

interface InterestItems {
  categoryEnums?: Enum[];
  impactEnums?: Enum[];
  priorityLandscapes?: Locations[];
}

export enum InterestNames {
  Categories = 'categories',
  Impacts = 'impacts',
  PriorityLandscapes = 'priority_landscape_ids',
}

const useInterests = ({
  categoryEnums,
  impactEnums,
  priorityLandscapes,
}: InterestItems): Interest[] => {
  const { formatMessage } = useIntl();
  return useMemo(
    () => [
      {
        title: formatMessage({
          defaultMessage: 'Select the topics/sector categories that you work on',
          id: 'LmHPHR',
        }),
        name: InterestNames.Categories,
        items: categoryEnums,
        required: true,
        infoText: '',
      },
      {
        title: formatMessage({ defaultMessage: 'Expect to have impact on', id: 'YB8bt5' }),
        name: InterestNames.Impacts,
        items: impactEnums,
        required: true,
        infoText: '',
      },
      {
        title: formatMessage({
          defaultMessage:
            'Select HeCo priority landscapes on which you will have impact (optional)',
          id: 'piBsTx',
        }),
        name: InterestNames.PriorityLandscapes,
        items: priorityLandscapes,
        infoText: formatMessage({
          defaultMessage:
            'Geographic spaces of unique biodiversity conditions with sustainability and management plans developed by Heritage Colombia to ensure the provisioning of quality ecosystem services.',
          id: '19fAm7',
        }),
        required: false,
      },
    ],
    [formatMessage, categoryEnums, impactEnums, priorityLandscapes]
  );
};

export default useInterests;
