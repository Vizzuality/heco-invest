import { FormattedMessage } from 'react-intl';

import Link from 'next/link';

import LanguageSelector from 'containers/layouts/language-selector';

import { Paths } from 'enums';

export const AuthPageFooter = () => {
  return (
    <div className="fixed bottom-0 sm:bottom-[3vh] flex items-center gap-x-8">
      <LanguageSelector className="text-sm text-gray-600" />
      <Link href={Paths.FAQ} passHref>
        <a className="text-sm text-gray-600">
          <FormattedMessage defaultMessage="FAQ's" id="Mp68c+" />
        </a>
      </Link>
      <Link href={Paths.FAQ} passHref>
        <a className="text-sm text-gray-600">
          <FormattedMessage defaultMessage="Privacy policy" id="cPwv2c" />
        </a>
      </Link>
    </div>
  );
};

export default AuthPageFooter;
