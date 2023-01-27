import { FC, useState } from 'react';

import { motion } from 'framer-motion';
import { noop } from 'lodash-es';

import type { ExpandoProps } from './types';

export const Expando: FC<ExpandoProps> = ({
  className,
  title,
  defaultOpen = true,
  duration = 0.1,
  onChange = noop,
  children,
}: ExpandoProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  const handleChangeIsOpen = () => {
    onChange(!isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <div className={className}>
      <button
        className="w-full rounded focus-visible:outline focus-visible:outline-green-dark focus-visible:outline-2 focus-visible:outline-offset-2"
        type="button"
        onClick={handleChangeIsOpen}
      >
        <div className="flex items-center justify-center w-full">{title}</div>
      </button>
      <motion.div
        className="px-2 -mx-2 overflow-hidden"
        initial={isOpen ? 'open' : 'closed'}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ bounce: 0, duration }}
        variants={{
          open: { height: 'auto', visibility: 'visible' },
          closed: { height: 0, visibility: 'hidden' },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Expando;
