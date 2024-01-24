import { FC } from 'react';

import Image from 'next/image';

import Tooltip from 'components/tooltip';

import { OurAlliesLogoType } from './';

export const OurAlliesLogo: FC<OurAlliesLogoType> = ({ logo }) => {
  return (
    <span>
      <Tooltip
        arrow
        arrowClassName="bg-black"
        content={
          <div className="max-w-xs p-2 font-sans text-sm font-normal text-white bg-black rounded-sm">
            {logo.alt}
          </div>
        }
      >
        <span className="flex py-1 sm:py-0">
          <Image src={logo.src} width={logo.width} height={logo.height} alt={logo.alt} />
        </span>
      </Tooltip>
    </span>
  );
};

export default OurAlliesLogo;
