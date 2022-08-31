import { OpenCallApplication } from 'types/open-call-applications';
import { OpenCall } from 'types/open-calls';

export type WithdrawApplicationModalProps = {
  /** Open call application */
  openCallApplication: OpenCallApplication;
  /** Open call */
  openCall: OpenCall;
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback executed when the user accepts the action */
  onAccept: () => void;
  /** Callback executed when the user dismisses the prompt */
  onDismiss: () => void;
};
