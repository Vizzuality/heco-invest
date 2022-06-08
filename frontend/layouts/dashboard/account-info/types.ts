import { UserRoles } from 'enums';
import { Investor } from 'types/investor';
import { ProjectDeveloper } from 'types/projectDeveloper';

export type AccountInfoProps = {
  /** Role of the user to display account info for */
  userRole: UserRoles;
  /** User account data */
  account: ProjectDeveloper | Investor;
};
