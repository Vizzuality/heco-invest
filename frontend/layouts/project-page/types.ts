import { UserRoles } from 'enums';

export type ProjectProps = React.PropsWithChildren<
  React.ComponentProps<'div'> & {
    permissions: UserRoles[];
  }
>;
