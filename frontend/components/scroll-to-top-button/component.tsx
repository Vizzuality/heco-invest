import { FC, useEffect, useMemo, useState } from 'react';

import { ArrowUp } from 'react-feather';
import { useIntl } from 'react-intl';

import cx from 'classnames';

import { useScrollY } from 'hooks/use-scroll-y';

import Button from 'components/button';

import { ScrollToTopProps } from './types';

export const ScrollToTop: FC<ScrollToTopProps> = ({ containerRef, className }) => {
  const { formatMessage } = useIntl();
  const { scrollY } = useScrollY();
  const [containerScrollY, setContainerScrollY] = useState(0);

  const scrollToTop = () => {
    (containerRef?.current || window).scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (containerRef) {
      const container = containerRef?.current;
      const containerScrollListener = () => {
        setContainerScrollY(container?.scrollTop);
      };
      container?.addEventListener('scroll', containerScrollListener);
      return () => {
        container?.removeEventListener('scroll', containerScrollListener);
      };
    }
  }, [containerRef]);

  const notScrolled = useMemo(() => {
    // MIN_SCROLL is the height of the scroll button (40px) + the button bottom position (16px)
    const MIN_SCROLL = 56;
    return !!containerRef ? containerScrollY < MIN_SCROLL : scrollY < MIN_SCROLL;
  }, [containerRef, containerScrollY, scrollY]);

  return (
    <Button
      theme="primary-white"
      size="smallest"
      className={cx(
        'z-50 fixed justify-center w-10 h-10 px-2 !shadow-xl bottom-4 transition-opacity duration-500',
        {
          'opacity-0 w-0 h-0 !px-0 py-0 border-none': notScrolled,
          [className]: !!className,
        }
      )}
      icon={() => <ArrowUp className="mr-0" />}
      onClick={scrollToTop}
      aria-label={formatMessage({ defaultMessage: 'Scroll to top', id: 'lIJKZh' })}
    />
  );
};

export default ScrollToTop;
