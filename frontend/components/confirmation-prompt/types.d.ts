import { IconProps } from 'components/icon';
import { ModalProps } from 'components/modal';

export interface ConfirmationPromptProps {
  /**
   * Title of the prompt
   */
  title: string;
  /**
   * Description displayed below the title
   */
  description?: string | ReactNode;
  /**
   * Whether the prompt is diplayed
   */
  open: ModalProps['open'];
  /**
   * Whether the user can close the prompt without having to accept nor refuse
   */
  dismissible?: ModalProps['dismissable'];
  /**
   * Optional icon to display in the prompt. It is not displayed on narrow screens (< 640px).
   */
  icon?: IconProps['icon'];
  /**
   * Callback executed when the user accepts the action
   */
  onAccept: () => void;
  /**
   * Whether the onAccept function is loading. Defauts to 'false'
   */
  onAcceptLoading?: boolean;
  /** Message of the error triggered by the confirmation the action. */
  confirmationError?: string;
  /**
   * Callback executed when the user refuses the action
   */
  onRefuse: () => void;
  /**
   * Callback executed when the user dismisses the prompt. Only relevant if `dismissible` is true or
   * unset.
   */
  onDismiss: ModalProps['onDismiss'];
}
