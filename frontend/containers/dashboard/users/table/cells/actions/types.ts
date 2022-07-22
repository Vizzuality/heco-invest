import { InvitationStatus } from 'enums';

export interface CellActionsProps {
  row: {
    original: {
      id: string;
      email: string;
      confirmed: boolean;
      first_name: string;
      last_name: string;
      invitation: InvitationStatus;
    };
  };
}
