import { useMemo } from 'react';

import { useIntl } from 'react-intl';

import { Enum } from 'types/enums';
import { Locations } from 'types/locations';

interface InterestItems {
  category: Enum[];
  impact: Enum[];
  mosaics: Locations[];
}

export enum InterestNames {
  categories = 'categories',
  impacts = 'impacts',
  mosaics = 'mosaics',
}

const useInterests = ({ category, impact, mosaics }: InterestItems) => {
  const { formatMessage } = useIntl();
  return useMemo(
    () => [
      {
        title: formatMessage({
          defaultMessage: 'Select the categories that interests you',
          id: 'k5KxPA',
        }),
        name: InterestNames.categories,
        items: category,
        required: true,
        infoText: undefined,
      },
      {
        title: formatMessage({ defaultMessage: 'Expect to have impact on', id: 'YB8bt5' }),
        name: InterestNames.impacts,
        items: impact,
        required: true,
        infoText: undefined,
      },
      {
        title: formatMessage({
          defaultMessage:
            'Select HeCo priority landscapes on which you will have impact (optional)',
          id: 'piBsTx',
        }),
        name: InterestNames.mosaics,
        items: mosaics,
        infoText: formatMessage({
          defaultMessage:
            'Geographic spaces of unique biodiversity conditions with sustainability and management plans developed by Herencia Colombia to ensure the provisioning of quality ecosystem services.',
          id: 'whbx7G',
        }),
        required: false,
      },
    ],
    [category, impact, mosaics, formatMessage]
  );
};

export default useInterests;
