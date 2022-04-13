import { TreeState } from '@react-stately/tree';
import { Node } from '@react-types/shared';

export interface SectionProps {
  /** State of the menu item */
  state: TreeState<{}>;
  /** Menu section */
  section: Node<{}>;
  /** Callback executed when the popup is closed */
  onClose: () => void;
  /** Callback executed when the user clicks on a menu's item */
  onAction: (key: string | number) => void;
  /** Hide section when true */
  hidden?: 'all' | 'sm' | 'md' | 'lg';
}
