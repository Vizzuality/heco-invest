import { FC, useRef } from 'react';

import { Check as CheckIcon } from 'react-feather';
import { useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';

import { useToggleButton } from '@react-aria/button';
import { useToggleState } from '@react-stately/toggle';

import { SDGS_DATA, SDGS_SIZES } from '../constants';

import { SDGProps } from './types';

export const SDG: FC<SDGProps> = ({ id, size, selectable, ...rest }: SDGProps) => {
  const intl = useIntl();
  const ref = useRef();
  let state = useToggleState(rest);
  let { buttonProps } = useToggleButton({ isDisabled: !selectable, ...rest }, state, ref);
  const { title, image } = SDGS_DATA(intl).find((item) => item.id === id);

  return (
    <button
      aria-label={title}
      className={cx({
        'relative text-[0] rounded transition-all': true,
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark':
          true,
        'cursor-pointer': selectable,
      })}
      style={{
        width: SDGS_SIZES[size],
        height: SDGS_SIZES[size],
      }}
      {...buttonProps}
    >
      <Image
        className="rounded"
        src={`/images/sdgs/${image}`}
        alt={title}
        width={SDGS_SIZES[size]}
        height={SDGS_SIZES[size]}
        layout="fixed"
        quality={100}
      />
      {selectable && (
        <>
          <span
            className={cx({
              'absolute top-0 right-0 flex items-center justify-center': true,
              'translate-x-1/2 -translate-y-1/2': true,
              'bg-white rounded-full drop-shadow transition-all': true,
              'w-6 h-6': size === 'large',
              'w-5 h-5': size === 'small',
              'opacity-0': !state.isSelected,
              'opacity-100': state.isSelected,
            })}
          >
            <CheckIcon
              className={cx({
                'text-green-dark': true,
                'w-4 h-4': size === 'large',
                'w-3 h-3': size === 'small',
              })}
            />
          </span>
          <span
            className={cx({
              'absolute top-0 bottom-0 left-0 right-0 bg-gray-800 rounded opacity-40 transition-all':
                true,
              'opacity-0': state.isSelected,
              'opacity-100': !state.isSelected,
            })}
          />
        </>
      )}
    </button>
  );
};

export default SDG;
