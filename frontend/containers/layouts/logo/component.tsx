import Link from 'next/link';

import { Paths } from 'enums';

const BetaVersionDisclaimer = () => {
  return (
    <Link href={Paths.Home}>
      <a className="font-semibold">
        HeCo Invest
        <span className="bg-white text-green-dark text-sm ml-1 px-1 py-0.5 rounded-[4px]">
          βeta
        </span>
      </a>
    </Link>
  );
};

export default BetaVersionDisclaimer;
