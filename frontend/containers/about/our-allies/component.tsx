import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';

import { useAlliesLogos, useSupportedByLogos } from './data';
import Logo from './logo/component';

export const OurAllies = () => {
  const alliesLogos = useAlliesLogos();
  const supportedByLogos = useSupportedByLogos();

  return (
    <div className="text-center">
      <div>
        <h2 className="font-serif text-3xl font-bold md:text-4xl">
          <FormattedMessage defaultMessage="Our allies" id="SmmWBo" />
        </h2>
        <div className="flex flex-col mt-8">
          {alliesLogos.map((row, idx) => {
            return (
              <div
                key={idx}
                className={cx({
                  'flex flex-wrap items-center justify-center gap-6': true,
                  'mb-8': idx === 0,
                })}
              >
                {row.map((logo) => {
                  return <Logo key={logo.src} logo={logo} />;
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="font-serif text-2xl font-bold md:text-3xl">
          <FormattedMessage defaultMessage="Supported by" id="oA5Cj7" />
        </h3>
        <div className="flex flex-col mt-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {supportedByLogos.map((logo) => {
              return <Logo key={logo.src} logo={logo} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OurAllies;
