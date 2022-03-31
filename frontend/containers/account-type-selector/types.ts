import type { AccountType } from 'types';

export type AccountTypeSelectorProps = {
  /** Classnames to apply to the container */
  className?: string;
  /** Callback for when an account type is selected */
  onAccountTypeSelected?: (accountTypeId: AccountType) => void;
};
