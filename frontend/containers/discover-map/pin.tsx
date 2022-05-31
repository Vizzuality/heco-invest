import { FC } from 'react';

import { MapPin as MapPinIcon } from 'react-feather';
import { Marker } from 'react-map-gl';

import cx from 'classnames';

import Icon from 'components/icon';

import { MapPinProps } from './types';

export const MapPin: FC<MapPinProps> = ({ projectMap: { latitude, longitude, category } }) => {
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <Icon
        icon={MapPinIcon}
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
    </Marker>
  );
};

export default MapPin;
