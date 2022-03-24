export type SlideProps = React.PropsWithChildren<{
  /** Classnames to apply the wrapper element*/
  className?: string;
  /** Width of the slide. Defaults to `100%` */
  width?: string | number;
  /** Height of the slide. Defaults to `100%` */
  height?: string | number;
  /** Slide's opacity. Defaults to 1 */
  opacity?: number;
  /** onFocus handler */
  onFocus?: () => void;
}>;
