import { useIntl } from 'react-intl';

import { compact } from 'lodash-es';

import { SortingOptionType } from 'components/sorting-buttons';

/** Returns the sorting-by types array with translated labels  */
export const useSortingByOptions = (target?: 'projects' | 'openCalls'): SortingOptionType[] => {
  const { formatMessage } = useIntl();

  const sortingOptions = {
    general: [
      { key: 'name', label: formatMessage({ defaultMessage: 'Name', id: 'HAlOn1' }) },
      { key: 'created_at', label: formatMessage({ defaultMessage: 'Date', id: 'P7PLVj' }) },
    ],
    projects: [
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
    ],
    openCalls: [
      {
        key: 'instrument_type',
        label: formatMessage({ defaultMessage: 'Instrument type', id: 'fDd10o' }),
      },
    ],
  };

  return compact([
    ...sortingOptions['general'],
    ...(sortingOptions[target] || []),
  ]) as SortingOptionType[];
};
