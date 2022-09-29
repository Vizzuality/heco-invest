import { FC } from 'react';

import cx from 'classnames';

import Image from 'next/image';

import { SDGS_SIZES, SDGS_IMAGES } from './constants';
import { SDGsProps } from './types';

export const SDGs: FC<SDGsProps> = ({ className, size = 'small', sdgs = [] }: SDGsProps) => {
  return (
    <div className={cx('flex flex-wrap items-center gap-2', className)}>
      {sdgs.map(({ id, name }) => (
        <span
          key={id}
          // This removes an extra space displayed below the image when the container wraps
          className="flex"
        >
          <Image
            className="rounded"
            src={SDGS_IMAGES[id]}
            alt={name}
            title={name}
            width={SDGS_SIZES[size]}
            height={SDGS_SIZES[size]}
            layout="fixed"
            quality={100}
          />
        </span>
      ))}
    </div>
  );
};

export default SDGs;
