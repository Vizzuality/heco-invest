import { FC, useState } from 'react';

import { motion } from 'framer-motion';

import type { ExpandoProps } from './types';

export const Expando: FC<ExpandoProps> = ({
  className,
  title,
  defaultOpen = true,
  children,
}: ExpandoProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  return (
    <div className={className}>
      <button
        className="w-full rounded-full focus-visible:outline focus-visible:outline-green-dark focus-visible:outline-2 focus-visible:outline-offset-2"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-center w-full">{title}</div>
      </button>
      <motion.div
        className="px-2 -mx-2 overflow-hidden"
        initial={isOpen ? 'open' : 'closed'}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ bounce: 0, duration: 0.1 }}
        variants={{
          open: { height: 'auto' },
          closed: { height: 0 },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Expando;
