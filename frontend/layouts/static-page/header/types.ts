export interface HeaderProps {
  /** Props to apply to the container */
  props?: React.ComponentProps<'header'> & {
    /** Whether the header should be transparent (when the page isn't scrolled) */
    transparent?: boolean;
  };
}
