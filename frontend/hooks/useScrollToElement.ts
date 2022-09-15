export const useScrollToElement = () => {
  const scrollToElement = (
    elementRef,
    offsetY = 0
  ): { elementRef: HTMLDivElement; offsetY: number } => {
    const element = elementRef?.current;
    if (!element || !window) return;

    const position = element.getBoundingClientRect()?.top;
    const offset = position + window.pageYOffset - offsetY;

    window.scrollTo({
      top: offset,
      behavior: 'smooth',
    });
  };

  return scrollToElement;
};
