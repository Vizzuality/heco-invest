export interface HeaderProps {
  /** Props to apply to the container */
  props?: React.ComponentProps<'header'> & {
    /** Page type (will update the header message accordingly). Defaults to `sign-in` */
    pageType?: 'sign-in' | 'sign-up' | 'forgot-password';
  };
}
