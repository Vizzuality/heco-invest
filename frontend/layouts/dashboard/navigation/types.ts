import { UserRoles } from 'enums';

export type NavigationProps = {
  /** Classes to apply to the container */
  className?: string;
  /** Role of the user to display a navigation for */
  userRole: UserRoles;
};
