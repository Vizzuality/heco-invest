import React from 'react';

import { X as XIcon } from 'react-feather';

import Icon from 'components/icon';

import { MultiValueRemoveProps } from './types';

export const MultiValueRemove: React.FC<MultiValueRemoveProps> = ({
  innerProps: { ref, ...restInnerProps },
}: MultiValueRemoveProps) => (
  <div ref={ref} {...restInnerProps}>
    <Icon
      aria-hidden={true}
      icon={XIcon}
      className="inline-block w-4 h-4 text-current transition cursor-pointer"
    />
  </div>
);

export default MultiValueRemove;
