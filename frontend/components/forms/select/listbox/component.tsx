import React, { useRef } from 'react';

import { useListBox } from 'react-aria';

import cx from 'classnames';

import Option from '../option';

import { ListboxProps } from './types';

export function Listbox(props: ListboxProps) {
  const ref = useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state, height = 'default' } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      className={cx({
        'overflow-y-auto outline-none': true,
        'max-h-72': height === 'default',
        'max-h-48': height === 'small',
      })}
    >
      {Array.from(state.collection).map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ul>
  );
}

export default Listbox;
