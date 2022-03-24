import React, { useRef } from 'react';

import { useListBox } from 'react-aria';

import Option from '../option';

import { ListboxProps } from './types';

export function Listbox(props: ListboxProps) {
  const ref = useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul {...listBoxProps} ref={listBoxRef} className="overflow-y-auto outline-none max-h-72">
      {Array.from(state.collection).map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ul>
  );
}

export default Listbox;
