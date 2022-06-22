import { useMemo } from 'react';

import { useIntl } from 'react-intl';

import { Enum } from 'types/enums';
import { Interest } from 'types/projectDeveloper';

interface InterestItems {
  categoryEnums?: Enum[];
  impactEnums?: Enum[];
  mosaicEnums?: Enum[];
}

export enum InterestNames {
  Categories = 'categories',
  Impacts = 'impacts',
  Mosaics = 'mosaics',
}

const useInterests = ({ categoryEnums, impactEnums, mosaicEnums }: InterestItems): Interest[] => {
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
        name: InterestNames.Mosaics,
        items: mosaicEnums,
        infoText: formatMessage({
          defaultMessage:
            'Geographic spaces of unique biodiversity conditions with sustainability and management plans developed by Herencia Colombia to ensure the provisioning of quality ecosystem services.',
          id: 'whbx7G',
        }),
        required: false,
      },
    ],
    [formatMessage, categoryEnums, impactEnums, mosaicEnums]
  );
};

export default useInterests;
