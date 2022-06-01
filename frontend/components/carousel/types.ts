export type CarouselProps = React.PropsWithChildren<{
  /** Classnames to apply the wrapper element*/
  className?: string;
  /** Initial slide index. Default to `0`. */
  defaultSlide?: number;
}>;
