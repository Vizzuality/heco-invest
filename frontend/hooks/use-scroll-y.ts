import { useWindowScrollPosition, useOnWindowScroll } from 'rooks';

export const useScrollY = () => {
  const { scrollY }: ReturnType<typeof useWindowScrollPosition> =
    // The `window` check is required because the hook is not SSR-ready yet:
    // https://github.com/imbhargav5/rooks/issues/559
    // eslint-disable-next-line react-hooks/rules-of-hooks
    typeof window === 'undefined' ? { scrollY: 0, scrollX: 0 } : useWindowScrollPosition();

  return {
    scrollY: scrollY,
    isScrolledY: scrollY > 0,
  };
};
