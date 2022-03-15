import {
  FC,
  useState,
  useMemo,
  Children,
  cloneElement,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import { debounce, times } from 'lodash-es';

import type { CarouselProps, SlideProps } from './types';

export const Carousel: FC<CarouselProps> = ({ className, children }: CarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesWrapperContainerRef = useRef<HTMLDivElement>();
  const slidesWrapperRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slideHeight, setSlideHeight] = useState<unknown>(0);

  const [pointerDown, setPointerDown] = useState<boolean>(false);
  const [pointerDownX, setPointerDownX] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);

  const numSlides = useMemo(() => Object.keys(children).length || 0, [children]);

  const previousSlide = useCallback(() => {
    if (currentSlide <= 0) return;
    setCurrentSlide(currentSlide - 1);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    if (currentSlide + 1 >= numSlides) return;
    setCurrentSlide(currentSlide + 1);
  }, [currentSlide, numSlides]);

  const handlePointerDown = useCallback((e) => {
    if (!containerRef?.current?.contains(e.target)) return;
    setPointerDownX(e.screenX);
    setPointerDown(true);
  }, []);

  const handlePointerMove = useCallback(
    (e) => {
      if (!pointerDown) return;
      setOffset(e.screenX - pointerDownX);
    },
    [pointerDown, pointerDownX]
  );

  const handlePointerUp = useCallback(() => {
    const containerWidth = containerRef.current.offsetWidth;
    const threshold = (containerWidth / 100) * 30; // 30% moved

    if (offset > threshold) {
      previousSlide();
    } else if (-offset > threshold) {
      nextSlide();
    }

    setPointerDown(false);
  }, [nextSlide, offset, previousSlide]);

  const handleResize = debounce(
    () => setSlideHeight(slidesWrapperRef?.current?.offsetHeight || '100%'),
    500
  );

  useEffect(() => {
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointermove', handlePointerMove);
      window.addEventListener('resize', handleResize);
    };
  }, [handlePointerDown, handlePointerUp, handlePointerMove, handleResize]);

  useEffect(() => {
    slidesWrapperContainerRef.current.scrollLeft = 0;
    setSlideHeight(slidesWrapperRef?.current?.offsetHeight || '100%');
  }, [currentSlide, numSlides]);

  useLayoutEffect(() => {
    if (pointerDown || offset === 0) return;
    setOffset(0);
  }, [pointerDown, offset]);

  const slides = Children.map(children, (child: React.ReactElement<SlideProps>, index: number) => {
    return cloneElement(child, {
      width: `${100 / numSlides}%`,
      height: currentSlide === index ? '100%' : 0,
      onFocus: () => setCurrentSlide(index),
    });
  });

  return (
    <div ref={containerRef} className={className}>
      <div className="relative -m-4 touch-pan-y">
        <div className="relative flex items-center w-full">
          <div
            ref={slidesWrapperContainerRef}
            className="w-full overflow-hidden transition-all ease-in-out duration-250"
            style={{
              maxHeight: `${slideHeight}px` || '100%',
              minHeight: `${slideHeight}px` || '0%',
            }}
          >
            <SlideArrowButtons
              className="absolute top-0 left-0 items-center hidden w-full h-full md:flex"
              currentSlide={currentSlide}
              numSlides={numSlides}
              onPreviousSlideClick={previousSlide}
              onNextSlideClick={nextSlide}
            />
            <div
              ref={slidesWrapperRef}
              className={cx({
                'relative overflow-visible': true,
                'transition-transform ease-out duration-500': true,
              })}
              style={{
                transform: slidesWrapperRef.current
                  ? `translateX(-${
                      (slidesWrapperRef.current.offsetWidth / numSlides) * currentSlide +
                      (!pointerDown ? offset : 0)
                    }px)`
                  : 'initial',
                width: `${numSlides * 100}%`,
              }}
            >
              <ul
                className={cx({
                  'transition-transform ease-out duration-500': !pointerDown,
                })}
                style={{ transform: `translateX(${pointerDown ? offset : 0}px)` }}
              >
                {slides}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <SlidePagingButtons
        className="flex items-center justify-center gap-1.5 mt-6"
        currentSlide={currentSlide}
        numSlides={numSlides}
        onClick={setCurrentSlide}
      />
      <SlideAriaLive currentSlide={currentSlide} numSlides={numSlides} />
    </div>
  );
};

const SlideAriaLive = ({ currentSlide, numSlides }) => {
  const intl = useIntl();

  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      <FormattedMessage
        defaultMessage="Slide {slide} out of {total}"
        values={{
          slide: currentSlide + 1,
          total: numSlides,
        }}
        id="xjBcRf"
      />
    </div>
  );
};

const SlideArrowButtons = ({
  className,
  currentSlide,
  numSlides,
  onPreviousSlideClick,
  onNextSlideClick,
}) => {
  const intl = useIntl();

  return (
    <div className={className}>
      {currentSlide > 0 && (
        <button
          aria-label={intl.formatMessage({
            defaultMessage: 'Previous slide',
            id: 'MH3koz',
          })}
          className="absolute w-8 h-8 bg-white border rounded-full shadow cursor-pointer -left-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark"
          onClick={onPreviousSlideClick}
        >
          &lt;
        </button>
      )}

      {currentSlide < numSlides - 1 && (
        <button
          aria-label={intl.formatMessage({
            defaultMessage: 'Next slide',
            id: 'Y9bYKH',
          })}
          className="absolute w-8 h-8 bg-white border rounded-full shadow cursor-pointer -right-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark"
          onClick={onNextSlideClick}
        >
          &gt;
        </button>
      )}
    </div>
  );
};

const SlidePagingButtons = ({ className, numSlides, currentSlide, onClick }) => {
  const intl = useIntl();

  return (
    <div className={className}>
      {times(numSlides, (slide) => (
        <button
          aria-label={intl.formatMessage(
            {
              defaultMessage: 'Slide {slideNumber}',
              id: 'dPuc1g',
            },
            {
              slideNumber: slide + 1,
            }
          )}
          className={cx({
            'block w-2 h-2 rounded-full cursor-pointer': true,
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark':
              true,
            'bg-beige': slide !== currentSlide,
            'bg-green-dark': slide === currentSlide,
          })}
          onClick={() => onClick(slide)}
        />
      ))}
    </div>
  );
};

export const Slide: FC<SlideProps> = ({
  className,
  width,
  height,
  onFocus,
  children,
}: SlideProps) => (
  <li
    className="inline-flex w-full transition-opacity duration-100 ease-in-out"
    style={{ width, height }}
    onFocus={onFocus}
  >
    <div className="w-full m-4">
      <div className={className}>{children}</div>
    </div>
  </li>
);

export default Carousel;
