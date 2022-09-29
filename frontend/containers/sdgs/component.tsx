import { FC, Fragment } from 'react';

import cx from 'classnames';

import Image from 'next/image';

import Tooltip from 'components/tooltip';

import { SDGS_SIZES, SDGS_IMAGES } from './constants';
import { SDGsProps } from './types';

export const SDGs: FC<SDGsProps> = ({ className, size = 'small', sdgs = [] }: SDGsProps) => (
  <div className={cx('flex flex-wrap items-center gap-2', className)}>
    {sdgs.map((sdg) => (
      <Fragment key={sdg.id}>
        <Tooltip
          arrow
          arrowClassName="bg-black"
          content={
            <div className="max-w-xs p-2 font-sans text-sm font-normal text-white bg-black rounded-sm">
              {sdg.name}
            </div>
          }
        >
          <div
            // This removes an extra space displayed below the image when the container wraps
            className="flex"
          >
            <Image
              className="rounded"
              src={SDGS_IMAGES[sdg.id]}
              alt={sdg.name}
              width={SDGS_SIZES[size]}
              height={SDGS_SIZES[size]}
              layout="intrinsic"
              quality={100}
            />
          </div>
        </Tooltip>
      </Fragment>
    ))}
  </div>
);

export default SDGs;
