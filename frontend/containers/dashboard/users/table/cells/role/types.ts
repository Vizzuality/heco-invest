import { User } from 'types/user';

export interface CellRoleProps {
  value: boolean;
  /** Data from each row */
  row: { original: User };
  /** Whether the current user is the account owner. Defaults to 'false */
  isOwner?: boolean;
  /** Account name */
  accountName?: string;
}
