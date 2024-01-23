import { FC, useState } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import type { OurPartnersCardProps } from './types';

export const OurPartnersCard: FC<OurPartnersCardProps> = ({
  logo,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  const handleCardClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      type="button"
      className="py-6 px-4 bg-background-middle rounded-2xl focus-visible:outline focus-visible:outline-green-dark focus-visible:outline-2 focus-visible:outline-offset-2"
      onClick={handleCardClick}
    >
      <div className="text-center">
        <Image src={logo.src} width={logo.width} height={logo.height} alt={logo.alt} />
      </div>
      {children && (
        <motion.div
          className="overflow-hidden"
          initial={isOpen ? 'open' : 'closed'}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ bounce: 0, duration: 0.1 }}
          variants={{
            open: { height: 'auto', visibility: 'visible' },
            closed: { height: 0, visibility: 'hidden' },
          }}
        >
          <p className="mt-3 sm:mt-6">{children}</p>
        </motion.div>
      )}
    </button>
  );
};

export default OurPartnersCard;
