export type ArrowsProps = {
  /** Classnames to apply the wrapper element*/
  className?: string;
  /** Total number of slides */
  numSlides: number;
  /** Current slide index */
  currentSlide: number;
  /** Callback to execute when the previous arrow button is clicked */
  onPreviousSlideClick?: () => void;
  /** Callback to execute when the next arrow button is clicked */
  onNextSlideClick?: () => void;
};
