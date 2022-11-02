import { FC, Fragment } from 'react';

import cx from 'classnames';

import Image from 'next/image';

import { useBreakpoint } from 'hooks/use-breakpoint';

import Tooltip from 'components/tooltip';

import { SDGS_SIZES, SDGS_IMAGES } from './constants';
import { SDGsProps } from './types';

export const SDGs: FC<SDGsProps> = ({ className, size = 'small', sdgs = [] }: SDGsProps) => {
  const screenLargerThanSm = useBreakpoint()('sm');

  return (
    <div className={cx('grid grid-cols-3 sm:flex sm:flex-wrap sm:items-center gap-2', className)}>
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
              className="sm:flex"
            >
              <Image
                className="rounded"
                src={SDGS_IMAGES[sdg.id]}
                alt={sdg.name}
                width={SDGS_SIZES[size]}
                height={SDGS_SIZES[size]}
                layout={screenLargerThanSm ? 'intrinsic' : 'responsive'}
                quality={100}
              />
            </div>
          </Tooltip>
        </Fragment>
      ))}
    </div>
  );
};

export default SDGs;
