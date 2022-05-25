import type { ContactItemType } from './contact-item';

export type ContactInformationModalProps = {
  /** Whether the modal should be open */
  isOpen?: boolean;
  /** Callback for when the modal is dismissed */
  onDismiss?: () => void;
  /** Contacts information */
  contacts: ContactItemType | ContactItemType[];
};
