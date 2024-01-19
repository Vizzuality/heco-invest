import { FC } from 'react';

import Image from 'next/image';

import type { OurPartnersCardProps } from './types';

export const OurPartnersCard: FC<OurPartnersCardProps> = ({ logo, children }) => {
  return (
    <div className="p-4 sm:p-6 xl:p-10 bg-background-middle rounded-2xl">
      <div className="text-center">
        <Image src={logo.src} width={logo.width} height={logo.height} alt={logo.alt} />
      </div>
      {children && <p className="hidden mt-3 md:block sm:mt-6">{children}</p>}
    </div>
  );
};

export default OurPartnersCard;
