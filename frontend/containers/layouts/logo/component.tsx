import cx from 'classnames';

import Link from 'next/link';

import { useScrollY } from 'hooks/use-scroll-y';

import { Paths } from 'enums';

const Logo = () => {
  const { isScrolledY } = useScrollY();
  return (
    <Link href={Paths.Home}>
      <a className="font-semibold">
        HeCo Invest
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
