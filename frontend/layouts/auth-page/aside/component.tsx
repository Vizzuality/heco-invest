import { FC } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';

import { omit } from 'lodash-es';

import { AsideProps } from './types';

export const Aside: FC<AsideProps> = ({ props = {} }: AsideProps) => {
  const intl = useIntl();

  const { className, photo = 'side-01' } = props;

  const sidebarImage = (theme: 'mobile' | 'desktop') => (
    <Image
      className="rounded-2xl"
      src={`/images/auth/${photo}.jpg`}
      height={800}
      width={1200}
      layout={theme === 'desktop' ? 'fill' : 'responsive'}
      objectFit={theme === 'desktop' ? 'cover' : 'initial'}
      alt={intl.formatMessage({
        defaultMessage: 'Landscape photo',
        id: '9VLFbQ',
      })}
    />
  );

  return (
    <aside
      {...omit(props, ['className', 'photo'])}
      className={cx({
        'relative my-10 lg:my-0 lg:w-6/12 2xl:w-5/12': true,
        [className]: !!className,
      })}
    >
      <div className="lg:sticky lg:left-0 lg:right-0 lg:h-[calc(100vh-5rem)] lg:-mb-20 lg:top-20">
        <div className="overflow-hidden lg:absolute lg:left-0 lg:right-0 lg:top-8 lg:bottom-10 rounded-2xl">
          <span className="block overflow-hidden lg:hidden">{sidebarImage('mobile')}</span>
          <span className="hidden lg:block">{sidebarImage('desktop')}</span>

          <div className="absolute top-0 bottom-0 left-0 right-0 overflow-hidden rounded-2xl">
            <span className="absolute top-0 bottom-0 left-0 right-0 opacity-80 bg-gradient-to-t from-black via-transparent to-transparent"></span>
            <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-end gap-4 m-4 text-white md:m-10 lg:m-14 xl:m-20">
              <h2 className="mb-4 font-serif text-2xl font-extralight">
                <FormattedMessage defaultMessage="Get connected" id="/L6T3E" />
              </h2>
              <p>
                <FormattedMessage
                  defaultMessage="Discover projects that have impact in the Amazon region and get connected with investors and project developers."
                  id="P4T4Ib"
                />
              </p>
              <p className="font-semibold">
                <FormattedMessage defaultMessage="Start having impact now." id="GKONs7" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
