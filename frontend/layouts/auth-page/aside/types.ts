export interface AsideProps {
  /** Props to apply to the container */
  props?: React.ComponentProps<'aside'> & {
    /** Which sidebar photo to use. Defaults to `side-01` */
    photo?: 'side-01' | 'side-02';
  };
}
