import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useScrollY } from 'hooks/use-scroll-y';

import { Paths } from 'enums';

const blackLogoPaths: string[] = [
  Paths.ForProjectDevelopers,
  Paths.ForInvestors,
  Paths.About,
  Paths.FAQ,
  Paths.TermsConditions,
];

const Logo = () => {
  const { isScrolledY } = useScrollY();
  const { pathname } = useRouter();
  const showBlackLogo = blackLogoPaths.includes(pathname);

  return (
    <Link href={Paths.Home} passHref>
      <a className="flex items-center text-sm font-semibold xl:text-base">
        {isScrolledY ? (
          <Image
            width={150}
            height={50}
            objectFit="cover"
            objectPosition="center"
            src="/images/logos/logo-heco-invest-colors.png"
            alt="Heco invest"
            className=""
          />
        ) : (
          <Image
            width={150}
            height={50}
            objectFit="cover"
            src={
              showBlackLogo
                ? '/images/logos/logo-heco-invest-black.png'
                : '/images/logos/logo-heco-invest-white.png'
            }
            alt="Heco invest"
            className="inline"
          />
        )}
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
