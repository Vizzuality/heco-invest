import {
  FC,
  useState,
  useMemo,
  Children,
  cloneElement,
  useEffect,
  useRef,
  useCallback,
} from 'react';

import cx from 'classnames';

import { debounce } from 'lodash-es';

import AriaLive from './aria-live';
import Arrows from './arrows';
import Paging from './paging';
import { SlideProps } from './slide';
import type { CarouselProps } from './types';

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

  useEffect(() => {
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
            <Arrows
              className="absolute flex items-center m-8 left-4 right-4 -bottom-11 md:top-0 md:bottom-auto md:left-0 md:right-0 md:h-full md:m-0"
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
      <Paging
        className="flex items-center justify-center gap-1.5 mt-6"
        currentSlide={currentSlide}
        numSlides={numSlides}
        onClick={setCurrentSlide}
      />
      <AriaLive currentSlide={currentSlide} numSlides={numSlides} />
    </div>
  );
};

export default Carousel;
