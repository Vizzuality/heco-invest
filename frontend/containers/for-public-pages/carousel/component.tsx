import { FC, useState } from 'react';

import { ChevronLeft, ChevronRight } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';

import { useBreakpoint } from 'hooks/use-breakpoint';

import Button from 'components/button';
import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';
import { Paths } from 'enums';

import { useAccount } from 'services/account';

import { PublicPageCarouselProps } from '.';

export const ForPublicPagesCarousel: FC<PublicPageCarouselProps> = ({
  texts,
  images,
  subtitle,
  title = <FormattedMessage defaultMessage="What HeCo Invest can do for you" id="2sU5tO" />,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { userAccount, userAccountLoading, accountIsError, userIsError } = useAccount();

  const breakpoint = useBreakpoint();
  const isMd = breakpoint('sm');
  const isXl = breakpoint('xl');

  return (
    <div className="py-20 mt-20 bg-green-dark">
      <LayoutContainer>
        <div className="flex flex-col items-center text-center text-white">
          <h2 className="mb-6 font-serif text-3xl font-bold lg:text-4xl">{title}</h2>
          <p className="max-w-xl mb-12 lg:text-lg">{subtitle}</p>
          <div className="w-[calc(100vw-20px)] overflow-hidden bg-green-dark mb-0 lg:mb-12">
            <div
              className={cx(
                'flex lg:gap-6 2xl:gap-10 w-[500vw] lg:w-[183vw] transition-all ease-in-out duration-700',
                {
                  'translate-x-0 lg:translate-x-24': selectedImageIndex === 0,
                  'translate-x-[calc(-100vw+20px)] lg:translate-x-[calc(-33.33vw+88px)]':
                    selectedImageIndex === 1,
                  'translate-x-[calc(-200vw+40px)] lg:translate-x-[calc(-66.66vw+78px)]':
                    selectedImageIndex === 2,
                }
              )}
            >
              {images.map((imageSrc, index) => {
                return (
                  <div
                    key={imageSrc + index}
                    className={cx(
                      'overflow-hidden rounded-2xl transition-all ease-in-out duration-700 sm:max-h-[250px] md:max-h-[350px] lg:max-h-[500px]',
                      {
                        'w-[calc(100vw-20px)] lg:w-[50vw] opacity-100':
                          index === selectedImageIndex,
                        'w-[calc(100vw-20px)] lg:w-[33.33vw]': index !== selectedImageIndex,
                        'opacity-40': index > selectedImageIndex,
                        'opacity-0': index < selectedImageIndex,
                      }
                    )}
                  >
                    <Image
                      src={imageSrc}
                      alt=""
                      width={isXl ? 1063.5 : isMd ? 709 : 340}
                      height={isXl ? 750 : isMd ? 500 : 250}
                      objectFit="cover"
                      objectPosition="center"
                      layout="fixed"
                      className="rounded-2xl"
                    />
                  </div>
                );
              })}
            </div>
            <div className="lg:absolute p-7 -translate-y-8 lg:-translate-y-full max-w-full lg:max-w-[500px] lg:left-1/2 bg-background-light rounded-xl mx-2">
              <div className="flex justify-between mb-2 align-middle">
                <div>
                  <p className="text-xl font-bold text-gray-600">
                    <span className="text-green-dark">0{selectedImageIndex + 1}</span> / 03
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <Button
                    theme="primary-white"
                    size="smallest"
                    className="justify-center w-8 h-8 border border-beige drop-shadow-lg focus-visible:!outline-green-dark"
                    onClick={() =>
                      setSelectedImageIndex(selectedImageIndex === 0 ? 2 : selectedImageIndex - 1)
                    }
                  >
                    <span className="sr-only">
                      <FormattedMessage defaultMessage="Previous" id="JJNc3c" />
                    </span>
                    <Icon
                      icon={ChevronLeft}
                      className="text-black transition-colors duration-300 ease-in-out"
                    />
                  </Button>

                  <Button
                    theme="primary-white"
                    size="smallest"
                    className="justify-center w-8 h-8 border border-beige drop-shadow-lg focus-visible:!outline-green-dark"
                    onClick={() =>
                      setSelectedImageIndex(selectedImageIndex === 2 ? 0 : selectedImageIndex + 1)
                    }
                  >
                    <span className="sr-only">
                      <FormattedMessage defaultMessage="Previous" id="JJNc3c" />
                    </span>
                    <Icon
                      icon={ChevronRight}
                      className="text-black transition-colors duration-300 ease-in-out"
                    />
                  </Button>
                </div>
              </div>
              <div className="text-left text-black">
                <h3 className="mb-6 font-serif text-2xl">{texts[selectedImageIndex].title}</h3>
                <p>{texts[selectedImageIndex].description}</p>
              </div>
            </div>
          </div>
          {(!userAccount || userIsError || accountIsError || userAccountLoading) && (
            <Button
              className="justify-center w-full md:w-auto"
              theme="secondary-white"
              to={Paths.SignUp}
            >
              <FormattedMessage defaultMessage="Create account" id="huqKGl" />
            </Button>
          )}
        </div>
      </LayoutContainer>
    </div>
  );
};

export default ForPublicPagesCarousel;
