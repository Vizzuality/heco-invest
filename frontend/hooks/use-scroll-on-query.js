import { useEffect, useCallback } from 'react';

import { useRouter } from 'next/router';

/**
 * @param {MutableRefObject} ref Ref of the element to scroll
 * @param {boolean} autoScroll Whether to auto scroll on query change
 */
export const useScrollOnQuery = ({ ref: elementRef, autoScroll = true }) => {
  const { query } = useRouter();

  const scroll = useCallback(() => {
    const element = elementRef.current || window;
    element.scroll({ top: 0 });
  }, [elementRef]);

  useEffect(() => {
    if (!autoScroll) return;
    scroll();
  }, [autoScroll, query, scroll]);

  return { scroll };
};
