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
  /** Orientation of the navigation. Defaults to `horizontal` */
  orientation?: 'horizontal' | 'vertical';
  /** Badge position. Defaults to `right` */
  badgePosition?: 'left' | 'right';
  /** Id of the currently active navigation item */
  activeId?: string;
  /** Navigation items array */
  items: BadgeNavigationType[];
};
