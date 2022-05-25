export type ContactItemType = {
  /** Name to display in the logo alt */
  name: string;
  /** Email to display */
  email?: string;
  /** Phone number to display */
  phone?: string;
  /** Picture to display */
  picture?: string;
};

export type ContactItemProps = ContactItemType;
