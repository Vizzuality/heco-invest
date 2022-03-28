import type { ListState } from 'react-stately';

import type { Node } from '@react-types/shared';

export interface OptionProps {
  item: Node<unknown>;
  state: ListState<unknown>;
}
