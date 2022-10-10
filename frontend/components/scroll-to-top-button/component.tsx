import { FC } from 'react';

import { ArrowUp } from 'react-feather';

import cx from 'classnames';

import { useScrollY } from 'hooks/use-scroll-y';

import Button from 'components/button';

import { ScrollToTopProps } from './types';

export const ScrollToTop: FC<ScrollToTopProps> = ({ className }) => {
  const { scrollY } = useScrollY();

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  console.log(scrollY);

  return (
    <Button
      theme="primary-white"
      size="smallest"
      className={cx(
        'scroll-top z-50 fixed justify-center w-10 h-10 !shadow-xl bottom-4  transition-opacity duration-700',
        {
          // 'opacity-0 w-0 h-0': scrollY < 56,
          [className]: !!className,
        }
      )}
      icon={() => <ArrowUp className="mr-0" />}
      onClick={scrollToTop}
    />
  );
};

export default ScrollToTop;
