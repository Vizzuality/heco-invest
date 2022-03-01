import { IntlShape } from 'react-intl';

import { SDGType } from './sdg';

export const SDGS_SIZES = {
  small: 88,
  large: 110,
};

export const SDGS_DATA = (intl: IntlShape): SDGType[] => [
  {
    id: 'no-poverty',
    title: intl.formatMessage({ defaultMessage: 'No poverty', id: 'tHvMAr' }),
    image: '1-no-poverty.png',
  },
  {
    id: 'zero-hunger',
    title: intl.formatMessage({ defaultMessage: 'Zero hunger', id: 'pv5N69' }),
    image: '2-zero-hunger.png',
  },
  {
    id: 'good-health',
    title: intl.formatMessage({ defaultMessage: 'Good health and well-being', id: 'xNmmn5' }),
    image: '3-good-health.png',
  },
  {
    id: 'quality-education',
    title: intl.formatMessage({ defaultMessage: 'Quality education', id: 'xLg5he' }),
    image: '4-quality-education.png',
  },
  {
    id: 'gender-equality',
    title: intl.formatMessage({ defaultMessage: 'Gender equality', id: 'iGr6CX' }),
    image: '5-gender-equality.png',
  },
  {
    id: 'clean-water',
    title: intl.formatMessage({ defaultMessage: 'Clean water and sanitation', id: 'pd0DYm' }),
    image: '6-clean-water.png',
  },
  {
    id: 'clean-energy',
    title: intl.formatMessage({ defaultMessage: 'Affordable and clean energy', id: 'Ojp3nv' }),
    image: '7-clean-energy.png',
  },
  {
    id: 'decent-work',
    title: intl.formatMessage({ defaultMessage: 'Decent work and economic growth', id: '79BaYt' }),
    image: '8-decent-work.png',
  },
  {
    id: 'industry-innovation',
    title: intl.formatMessage({
      defaultMessage: 'Industry innovation and infrastructure',
      id: 'az4T7S',
    }),
    image: '9-industry-innovation.png',
  },
  {
    id: 'reduced-inequalities',
    title: intl.formatMessage({ defaultMessage: 'Reduced inequalities', id: 'tTUa21' }),
    image: '10-reduced-inequalities.png',
  },
  {
    id: 'sustainable-cities',
    title: intl.formatMessage({
      defaultMessage: 'Sustainable cities and communities',
      id: 'p0C0jy',
    }),
    image: '11-sustainable-cities.png',
  },
  {
    id: 'responsible-consumption',
    title: intl.formatMessage({
      defaultMessage: 'Responsible consumption and production',
      id: 'LgE1GN',
    }),
    image: '12-responsible-consumption.png',
  },
  {
    id: 'climate-action',
    title: intl.formatMessage({ defaultMessage: 'Climate action', id: 'wZ3iaf' }),
    image: '13-climate-action.png',
  },
  {
    id: 'life-below-water',
    title: intl.formatMessage({ defaultMessage: 'Life below water', id: 'y4v7zD' }),
    image: '14-life-below-water.png',
  },
  {
    id: 'life-on-land',
    title: intl.formatMessage({ defaultMessage: 'Life on land', id: 'lRxEk5' }),
    image: '15-life-on-land.png',
  },
  {
    id: 'peace-justice',
    title: intl.formatMessage({
      defaultMessage: 'Peace, justice and strong institutions',
      id: '208nF3',
    }),
    image: '16-peace-justice.png',
  },
  {
    id: 'partnership',
    title: intl.formatMessage({ defaultMessage: 'Partnership for the goals', id: 'Er1Y0M' }),
    image: '17-partnership.png',
  },
];
