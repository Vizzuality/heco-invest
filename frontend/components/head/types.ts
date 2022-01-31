export interface HeadProps {
  /** Title of the page */
  title?: string;
  /** Description of the page */
  description?: string;
  /** Elements to add to the `<head />` element */
  children?: React.ReactNode;
}
