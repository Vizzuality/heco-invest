import { useIntl } from 'react-intl';

import { compact } from 'lodash-es';

import { SortingOptionType } from 'components/sorting-buttons';
import { SortingOptionKey, SortingOrderType } from 'components/sorting-buttons/types';
import { Queries } from 'enums';

export type SortingByTargetType = Queries.Project;

export const defaultSorting = {
  sortBy: 'created_at' as SortingOptionKey,
  sortOrder: 'desc' as SortingOrderType,
};

/** Returns the sorting-by types array with translated labels  */
export const useSortingByOptions = (target?: SortingByTargetType): SortingOptionType[] => {
  const { formatMessage } = useIntl();

  const sortingOptions = {
    general: [
      { key: 'name', label: formatMessage({ defaultMessage: 'Name', id: 'HAlOn1' }) },
      { key: 'created_at', label: formatMessage({ defaultMessage: 'Date', id: 'P7PLVj' }) },
    ],
    [Queries.Project]: [
      {
        key: 'municipality_biodiversity_impact',
        label: formatMessage({ defaultMessage: 'Biodiversity impact', id: 'BvO1iK' }),
      },
      {
        key: 'municipality_climate_impact',
        label: formatMessage({ defaultMessage: 'Climate impact', id: 'TUFmRM' }),
      },
      {
        key: 'municipality_water_impact',
        label: formatMessage({ defaultMessage: 'Water impact', id: 'W5x0GV' }),
      },
      {
        key: 'municipality_community_impact',
        label: formatMessage({ defaultMessage: 'Community impact', id: 'PGlFh/' }),
      },
    ],
  };

  return compact([
    ...sortingOptions['general'],
    ...(sortingOptions[target] || []),
  ]) as SortingOptionType[];
};
