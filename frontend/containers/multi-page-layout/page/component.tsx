import { FC, useEffect, useRef } from 'react';

import cx from 'classnames';

import { motion, AnimatePresence } from 'framer-motion';

import { MultiPageLayoutPageProps } from './types';

export const MultiPageLayoutPage: FC<MultiPageLayoutPageProps> = ({
  className,
  children,
}: MultiPageLayoutPageProps) => {
  const mainRef = useRef<HTMLLIElement>(null);

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    mainRef.current.focus();
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        {...variants}
        className={cx({
          'mt-24 mb-20 md:mt-40 md:mb-40': true,
          [className]: !!className,
        })}
      >
        <main
          // TODO: tabIndex was meant to make it so that when changing pages, focus would go
          // directly to the form. However, using it causes react-aria's `useFocusRing` in the
          // form tags components to misbehave. A possible alternative may pass through setting
          // focus on the first child automatically.
          // tabIndex={-1}
          ref={mainRef}
          className={cx({
            'outline-none': true,
            [className]: !!className,
          })}
        >
          {children}
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default MultiPageLayoutPage;
