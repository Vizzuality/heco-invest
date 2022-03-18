export type PagingProps = {
  /** Classnames to apply the wrapper element*/
  className?: string;
  /** Total number of slides */
  numSlides: number;
  /** Current slide index */
  currentSlide: number;
  /** onClick handler */
  onClick?: (slideIndex: number) => void;
};
