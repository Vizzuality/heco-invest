import type { ListState } from 'react-stately';

import type { AriaListBoxOptions } from '@react-aria/listbox';

export interface ListboxProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state: ListState<unknown>;
}
