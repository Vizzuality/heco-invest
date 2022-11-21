export type BadgeNavigationType = {
  id: string;
  name: string;
  link: string;
  number?: number;
};

export type BadgeNavigationProps = {
  /** ClassNames to apply to the container */
  className?: string;
  /** Theme to use. Defaults to `default` */
  theme?: 'default' | 'simple';
  /** Format of the badges. Defaults to `square` */
  type?: 'square' | 'pill';
  /** Orientation of the navigation. Defaults to `horizontal` */
  orientation?: 'horizontal' | 'vertical';
  /** Badge position. Defaults to `right` */
  badgePosition?: 'left' | 'right';
  /** Id of the currently active navigation item */
  activeId?: string;
  /** Navigation items array */
  items: BadgeNavigationType[];
  /** Callback executed when the user clicks on an item */
  onClick?: (id: BadgeNavigationType['id']) => void;
};
