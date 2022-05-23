import { UserRoles } from 'enums';

export type ProtectedProps = React.PropsWithChildren<
  React.ComponentProps<'div'> & {
    permissions: UserRoles[];
  }
>;
