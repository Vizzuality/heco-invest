import { UserRoles } from 'enums';
import { Investor } from 'types/investor';
import { ProjectDeveloper } from 'types/projectDeveloper';
import { User } from 'types/user';

export type ProtectedProps = React.PropsWithChildren<
  React.ComponentProps<'div'> & {
    /** User roles allowed */
    permissions: UserRoles[];
    /** Allow just confirmed account users */
    allowConfirmed?: boolean;
    /** Allow for owner */
    ownership?: {
      /** Whether the user is required to be the owner/creator of the entity that the page displays. For example: project/[project-slug]/edit - must be the project owner. Default = 'false' */
      allowOwner: boolean;
      /** Function to compare the entity (on the page) and the user accounts (on the protected layout). If true, the page is displayed */
      getIsOwner: (user: User, userAccount: ProjectDeveloper | Investor) => boolean;
    };
  }
>;
