export type LeaveFormModalProps = {
  title: string;
  isOpen: boolean;
  showSignupLink?: boolean;
  close: () => void;
  handleLeave: () => void;
};
