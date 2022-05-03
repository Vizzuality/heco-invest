export type ContactInformationType = {
  /** Email to display */
  email?: string;
  /** Phone number to display */
  phone?: string;
};

export type ContactInformationModalProps = {
  /** Whether the modal should be open */
  isOpen?: boolean;
  /** Callback for when the modal is dismissed */
  onDismiss?: () => void;
  /** Contact information */
  contact?: ContactInformationType;
};
