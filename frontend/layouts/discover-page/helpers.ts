import { useIntl } from 'react-intl';

import { SortingOptionType } from 'components/sorting-buttons';

/** Returns the sorting-by types array with translated labels  */
export const useSortingByOptions = (): SortingOptionType[] => {
  const { formatMessage } = useIntl();
  return [
    { key: 'name', label: formatMessage({ defaultMessage: 'Name', id: 'HAlOn1' }) },
    { key: 'created_at', label: formatMessage({ defaultMessage: 'Date', id: 'P7PLVj' }) },
    {
      key: 'total_impact',
      label: formatMessage({ defaultMessage: 'Impact score', id: '2GBpne' }),
    },
    {
      key: 'biodiversity_impact',
      label: formatMessage({ defaultMessage: 'Biodiversity impact', id: 'BvO1iK' }),
    },
    {
      key: 'climate_impact',
      label: formatMessage({ defaultMessage: 'Climate impact', id: 'TUFmRM' }),
    },
    {
      key: 'water_impact',
      label: formatMessage({ defaultMessage: 'Water impact', id: 'W5x0GV' }),
    },
    {
      key: 'community_impact',
      label: formatMessage({ defaultMessage: 'Community impact', id: 'PGlFh/' }),
    },
  ];
};
