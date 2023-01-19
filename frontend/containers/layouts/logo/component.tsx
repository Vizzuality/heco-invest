import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';

import { useScrollY } from 'hooks/use-scroll-y';

import { Paths } from 'enums';

import { LogoProps } from './types';

const Logo: React.FC<LogoProps> = ({ defaultWĥite = false }: LogoProps) => {
  const { isScrolledY } = useScrollY();
  const imagePath =
    !isScrolledY && defaultWĥite
      ? '/images/logos/heco_logo_white.png'
      : '/images/logos/heco_logo_color.png';

  return (
    <Link href={Paths.Home} passHref>
      <a className="flex items-center text-sm font-semibold xl:text-base">
        <span className="w-32 sm:w-40">
          <Image
            width={160}
            height={37}
            objectFit="contain"
            objectPosition="left"
            layout="responsive"
            src={imagePath}
            priority
            alt="Heco invest"
          />
        </span>
        <span
          className={cx('text-sm ml-1 px-1 py-0.5 rounded-[4px]', {
            'bg-white text-green-dark': !isScrolledY,
            'text-white bg-green-dark': isScrolledY,
          })}
        >
          βeta
        </span>
      </a>
    </Link>
  );
};

export default Logo;
