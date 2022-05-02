import { useMemo } from 'react';

import { useIntl } from 'react-intl';

import { Enum } from 'types/enums';

interface InterestItems {
  category?: Enum[];
  impact?: Enum[];
  mosaic?: Enum[];
}

export enum InterestNames {
  Categories = 'categories',
  Impacts = 'impacts',
  Mosaics = 'mosaics',
}

const useInterests = ({ category, impact, mosaic }: InterestItems) => {
  const { formatMessage } = useIntl();
  return useMemo(
    () => [
      {
        title: formatMessage({
          defaultMessage: 'Select the topics/sector categories that you work on',
          id: 'LmHPHR',
        }),
        name: InterestNames.Categories,
        items: category,
        required: true,
      },
      {
        title: formatMessage({ defaultMessage: 'Expect to have impact on', id: 'YB8bt5' }),
        name: InterestNames.Impacts,
        items: impact,
        required: true,
      },
      {
        title: formatMessage({
          defaultMessage:
            'Select HeCo priority landscapes on which you will have impact (optional)',
          id: 'piBsTx',
        }),
        name: InterestNames.Mosaics,
        items: mosaic,
        infoText: formatMessage({
          defaultMessage:
            'Geographic spaces of unique biodiversity conditions with sustainability and management plans developed by Herencia Colombia to ensure the provisioning of quality ecosystem services.',
          id: 'whbx7G',
        }),
        required: false,
      },
    ],
    [category, impact, mosaic, formatMessage]
  );
};

export default useInterests;
