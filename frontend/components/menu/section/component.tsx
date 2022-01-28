import React from 'react';

import { useMenuSection } from '@react-aria/menu';
import { useSeparator } from '@react-aria/separator';

import Item from '../item';

import { SectionProps } from './types';

export const Section: React.FC<SectionProps> = ({
  section,
  state,
  onAction,
  onClose,
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
      <li {...itemProps}>
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
