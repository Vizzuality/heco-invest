export type OpenCallApplicationModalProps = {
  /** ID of the open call to apply to */
  openCallId: string;
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback executed when the user closes the modal */
  onClose: () => void;
};
