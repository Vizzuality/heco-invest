import React from 'react';

import cx from 'classnames';

import { motion, AnimatePresence } from 'framer-motion';

import { MultiPageLayoutOutroPageProps } from './types';

export const MultiPageLayoutOutroPage: React.FC<MultiPageLayoutOutroPageProps> = ({
  className,
  children,
}: MultiPageLayoutOutroPageProps) => {
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

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
          className={cx({
            [className]: !!className,
          })}
        >
          {children}
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default MultiPageLayoutOutroPage;
