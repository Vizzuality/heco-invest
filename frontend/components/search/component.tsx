import { FC, useRef } from 'react';

import cx from 'classnames';

// react aria
import { useButton } from '@react-aria/button';
import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';

import Icon from 'components/icon';

import SEARCH_SVG from 'svgs/ui/search.svg';
import xIcon from 'svgs/x.svg';

import { SIZES, THEME } from './constants';
import type { SearchProps } from './types';

export const Search: FC<SearchProps> = ({
  theme = 'dark',
  size = 'base',
  ...rest
}: SearchProps) => {
  const { placeholder } = rest;
  const state = useSearchFieldState(rest);

  const ref = useRef();
  const { inputProps, clearButtonProps } = useSearchField(rest, state, ref);
  const { buttonProps } = useButton(clearButtonProps, null);

  return (
    <div
      className={cx('flex w-full relative text-base', {
        [THEME[theme]]: true,
        [SIZES[size]]: true,
      })}
    >
      <Icon
        icon={SEARCH_SVG}
        className={cx({
          'absolute top-1/2 left-3 w-5 h-5 transform -translate-y-1/2 opacity-60': true,
          [THEME[theme]]: true,
        })}
      />

      <input
        {...inputProps}
        ref={ref}
        placeholder={placeholder}
        type="search"
        style={{ background: 'transparent' }}
        className={cx(
          'w-full font-sans px-12 truncate leading-4 placeholder:text-gray-800 placeholder:text-base focus-visible:outline-green-dark',
          {
            [THEME[theme]]: true,
            [SIZES[size]]: true,
          }
        )}
      />

      <button
        {...buttonProps}
        className={cx({
          'absolute z-10 flex items-center self-center justify-center w-5 h-5 right-3 r-2': true,
          hidden: state.value === '',
        })}
        type="button"
      >
        <Icon icon={xIcon} className="inline-block w-5 h-5" />
      </button>
    </div>
  );
};

export default Search;
