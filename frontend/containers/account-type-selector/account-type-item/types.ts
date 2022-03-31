import type { AccountType } from 'types';

export type AccountTypeItemProps = {
  /** Account type id */
  accountTypeId: AccountType;
  /** Name of the account type */
  name: string;
  /** Description of the account type */
  description: string;
  /** Image to display on the account type "button" */
  imageSrc: string;
  /** Text to display on the image in case it fails to load, and also for screen readers  */
  imageTitle: string;
  /** Callback for when the item is clicked */
  onClick?: (accountTypeId: AccountType) => void;
};
