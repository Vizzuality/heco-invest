import React from 'react';

import cx from 'classnames';

import { useMenuSection } from '@react-aria/menu';
import { useSeparator } from '@react-aria/separator';

import Item from '../item';

import { SectionProps } from './types';

export const Section: React.FC<SectionProps> = ({
  section,
  state,
  onAction,
  onClose,
  hidden,
}: SectionProps) => {
  const { itemProps, groupProps } = useMenuSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  const { separatorProps } = useSeparator({
    elementType: 'li',
  });

  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <li {...separatorProps} className="h-px mx-2.5 bg-background-dark" />
      )}
      <li
        {...itemProps}
        className={
          hidden &&
          cx({
            [hidden === 'all' ? 'hidden' : `${hidden}:hidden`]: !!hidden,
          })
        }
      >
        <ul {...groupProps}>
          {Array.from(section.childNodes).map((item) => (
            <Item key={item.key} item={item} state={state} onAction={onAction} onClose={onClose} />
          ))}
        </ul>
      </li>
    </>
  );
};

export default Section;
