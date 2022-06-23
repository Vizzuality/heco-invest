import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';

import { useInViewRef } from 'rooks';

import Button from 'components/button';

export const Carousel = () => {
  const [slide2Ref, inViewSlide2] = useInViewRef(undefined, {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 1,
  });

  const [slide3Ref, inViewSlide3] = useInViewRef(undefined, {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 1,
  });

  const [slide4Ref, inViewSlide4] = useInViewRef(undefined, {
    root: null,
    rootMargin: '100% 0px 0px 0px',
    threshold: 1,
  });
  return (
    <div className="mt-7 md:mt-16 lg:relative bg-green-dark">
      <figure className="relative w-full h-64 lg:w-1/2 sm:h-72 md:h-96 lg:h-screen lg:sticky lg:top-0 lg:left-0">
        <Image
          src="/images/home-biodiversity.jpg"
          alt=""
          layout="fill"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <figcaption className="absolute text-white left-4 md:left-6 bottom-3 md:bottom-6 text-2xs">
          <FormattedMessage defaultMessage="© Luis Barreto / WWF-UK" id="tH/CDj" />
        </figcaption>
      </figure>
      <div className="mx-auto lg:mt-[-50vh] lg:mb-[50vh] pt-16 lg:pt-0 pb-20 lg:pb-0 w-full max-w-7xl lg:-translate-y-1/2 lg:flex items-center text-center lg:text-left">
        <div className="px-4 lg:ml-auto sm:px-8 xl:pl-28 lg:w-1/2 ">
          <h3 className="font-serif text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
            <FormattedMessage defaultMessage="Biodiversity" id="mbTJWV" />
          </h3>
          <p className="max-w-md mx-auto mt-3 text-base text-white md:mt-6 lg:mx-0 sm:text-lg md:text-xl opacity-70">
            <FormattedMessage
              defaultMessage="Contribute to protecting areas of greatest ecosystems diversity, conservation and restoration potential, degree of threat or protection for flora and fauna, landscape connectivity and degree of endemism."
              id="gF/kn9"
            />
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <Button theme="secondary-white" size="small" to="/discover?s=biodiversity">
              <FormattedMessage defaultMessage="Search biodiversity" id="PIZ1dD" />
            </Button>
          </div>
        </div>
      </div>

      <figure
        ref={slide2Ref}
        className={cx({
          'relative w-full lg:w-1/2 h-64 sm:h-72 md:h-96 lg:h-screen lg:sticky lg:top-0 lg:left-0 transition-opacity duration-300':
            true,
          'lg:opacity-0': !inViewSlide2,
          'opacity-100': inViewSlide2,
        })}
      >
        <Image
          src="/images/home-climate.jpg"
          alt=""
          layout="fill"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <figcaption className="absolute text-white left-4 md:left-6 bottom-3 md:bottom-6 text-2xs">
          <FormattedMessage defaultMessage="© Luis Barreto / WWF-UK" id="tH/CDj" />
        </figcaption>
      </figure>
      <div className="mx-auto lg:mt-[-50vh] lg:mb-[50vh] pt-16 lg:pt-0 pb-20 lg:pb-0 w-full max-w-7xl lg:-translate-y-1/2 lg:flex items-center text-center lg:text-left">
        <div className="px-4 lg:ml-auto sm:px-8 xl:pl-28 lg:w-1/2 ">
          <h3 className="font-serif text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
            <FormattedMessage defaultMessage="Climate" id="MuOp0t" />
          </h3>
          <p className="max-w-md mx-auto mt-3 text-base text-white md:mt-6 lg:mx-0 sm:text-lg md:text-xl opacity-70">
            <FormattedMessage
              defaultMessage="Contribute to addressing the effects of climate change through investments to reduce CO2 emissions and conserve or restore forest-related carbon sinks. <br></br><br></br> Nature based solutions have been estimated to have the potential of contributing to compensate for up to 30% of global emissions."
              id="fX9u5/"
              values={{
                br: () => <br />,
              }}
            />
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <Button theme="secondary-white" size="small" to="/discover?s=climate">
              <FormattedMessage defaultMessage="Search climate" id="kUPAU5" />
            </Button>
          </div>
        </div>
      </div>

      <figure
        ref={slide3Ref}
        className={cx({
          'relative w-full lg:w-1/2 h-64 sm:h-72 md:h-96 lg:h-screen lg:sticky lg:top-0 lg:left-0 transition-opacity duration-300':
            true,
          'lg:opacity-0': !inViewSlide3,
          'opacity-100': inViewSlide3,
        })}
      >
        <Image
          src="/images/home-community.jpg"
          alt=""
          layout="fill"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <figcaption className="absolute text-white left-4 md:left-6 bottom-3 md:bottom-6 text-2xs">
          <FormattedMessage defaultMessage="© Luis Barreto / WWF-UK" id="tH/CDj" />
        </figcaption>
      </figure>
      <div className="mx-auto lg:mt-[-50vh] lg:mb-[50vh] pt-16 lg:pt-0 pb-20 lg:pb-0 w-full max-w-7xl lg:-translate-y-1/2 lg:flex items-center text-center lg:text-left">
        <div className="px-4 lg:ml-auto sm:px-8 xl:pl-28 lg:w-1/2 ">
          <h3 className="font-serif text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
            <FormattedMessage defaultMessage="Community" id="4CrCbD" />
          </h3>
          <p className="max-w-md mx-auto mt-3 text-base text-white md:mt-6 lg:mx-0 sm:text-lg md:text-xl opacity-70">
            <FormattedMessage
              defaultMessage="By contributing to improve the productions systems and livelihoods of local communities and indigenous peoples to satisfy their basic needs, while enhancing their adaptation to climate change.<br></br><br></br>Supporting the consolidation of their lands governance structures and capacities for sound management."
              id="/aYUC+"
              values={{
                br: () => <br />,
              }}
            />
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <Button theme="secondary-white" size="small" to="/discover?s=community">
              <FormattedMessage defaultMessage="Search community" id="8R8Or7" />
            </Button>
          </div>
        </div>
      </div>

      <div className="top-0 lg:h-screen lg:sticky">
        <figure
          ref={slide4Ref}
          className={cx({
            'relative w-full lg:w-1/2 h-64 sm:h-72 md:h-96 lg:h-full lg:absolute lg:inset-y-0 lg:left-0 transition-opacity duration-300':
              true,
            'lg:opacity-0': !inViewSlide4,
            'opacity-100': inViewSlide4,
          })}
        >
          {' '}
          <Image
            src="/images/home-water.jpg"
            alt=""
            layout="fill"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <figcaption className="absolute text-white left-4 md:left-6 bottom-3 md:bottom-6 text-2xs">
            <FormattedMessage defaultMessage="© Luis Barreto / WWF-UK" id="tH/CDj" />
          </figcaption>
        </figure>
        <div className="items-center w-full pt-16 pb-20 mx-auto text-center max-w-7xl lg:h-full lg:flex lg:text-left">
          <div className="px-4 lg:ml-auto sm:px-8 xl:pl-28 lg:w-1/2 ">
            <h3 className="font-serif text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
              <FormattedMessage defaultMessage="Water" id="t7YvMF" />
            </h3>
            <p className="max-w-md mx-auto mt-3 text-base text-white md:mt-6 lg:mx-0 sm:text-lg md:text-xl opacity-70">
              <FormattedMessage
                defaultMessage="Support protecting the environmental factors that help maintain the availability and regulation of the water resources, which are vital for reducing risks such as floods and droughts, which in the face of climate change can become more frequent and larger in magnitude."
                id="ZcbMzP"
              />
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <Button theme="secondary-white" size="small" to="/discover?s=water">
                <FormattedMessage defaultMessage="Search water" id="XJqnLu" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
