import { FC } from 'react';

import cx from 'classnames';

import Icon from 'components/icon';

import MapPinIcon from 'svgs/project/marker.svg';
import TrustedMapPinIcon from 'svgs/project/trusted-marker.svg';

import { MapPinProps } from './types';

export const MapPin: FC<MapPinProps> = (props) => {
  const { category, trusted } = props;

  return (
    <Icon
      icon={trusted ? TrustedMapPinIcon : MapPinIcon}
      className={cx({
        'fill-category-tourism text-category-tourism': category === 'tourism-and-recreation',
        'fill-category-production text-category-production':
          category === 'non-timber-forest-production',
        'fill-category-agrosystems text-category-agrosystems':
          category === 'sustainable-agrosystems',
        'fill-category-forestry text-category-forestry': category === 'forestry-and-agroforestry',
        'fill-category-human text-category-human': category === 'human-capital-and-inclusion',
      })}
    />
  );
};

export default MapPin;
