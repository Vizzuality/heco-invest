export type BadgeNavigationType = {
  id: string;
  name: string;
  link: string;
  number?: number;
};

export type BadgeNavigationProps = {
  className?: string;
  activeId?: string;
  items: BadgeNavigationType[];
};
