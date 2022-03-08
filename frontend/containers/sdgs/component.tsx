import { FC } from 'react';

import cx from 'classnames';

import Image from 'next/image';

import { SDGS_DATA, SDGS_SIZES } from './constants';
import { SDGsProps } from './types';

export const SDGs: FC<SDGsProps> = ({ className, size = 'small', sdgs = [] }: SDGsProps) => {
  return (
    <div className={cx('flex flex-wrap items-center gap-2', className)}>
      {sdgs.map(({ id, title }) => {
        const { image } = SDGS_DATA.find((sdg) => sdg.id === id);
        return (
          <span key={id}>
            <Image
              className="rounded"
              src={`/images/sdgs/${image}`}
              alt={title}
              width={SDGS_SIZES[size]}
              height={SDGS_SIZES[size]}
              layout="fixed"
              quality={100}
            />
          </span>
        );
      })}
    </div>
  );
};

export default SDGs;
