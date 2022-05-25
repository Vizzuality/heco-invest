import { FC, useState } from 'react';

import { useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';

import Button from 'components/button';
import Carousel, { Slide } from 'components/carousel';
import Modal from 'components/modal';

import { ImageGalleryProps } from '.';

export const ImageGallery: FC<ImageGalleryProps> = ({ images }) => {
  // Sets the index of the image displayed on carousel. The default is undefined for not displaing any image.
  const [active, setActive] = useState<number>();
  const { formatMessage } = useIntl();

  return (
    <div area-hidden>
      <ul className="flex gap-1">
        {images.map(({ file: { small } }, index) => {
          const selected = active === index;
          return (
            <li key={small} className="inline">
              <Button
                theme={selected ? 'secondary-green' : 'naked'}
                className={cx('block w-8 h-8 px-0 py-0 rounded-none  transition-all', {
                  'brightness-125': selected,
                  'brightness-75': !selected,
                })}
                onClick={() => setActive(index)}
                title={formatMessage({ defaultMessage: 'Open image', id: 'TLn/wq' })}
              >
                <Image
                  src={small}
                  alt={formatMessage({ defaultMessage: 'Project image', id: 's07dAT' })}
                  width={32}
                  height={32}
                  objectFit="cover"
                />
              </Button>
            </li>
          );
        })}
      </ul>
      <Modal
        onDismiss={() => setActive(undefined)}
        title={formatMessage({ defaultMessage: 'Image gallery', id: 'K+Q04b' })}
        open={typeof active === 'number'}
        dismissable={true}
        size="wide"
        scrollable={false}
      >
        <Carousel defaultSlide={active} className="h-full sm:mx-12">
          {images.map(({ file: { original, medium } }) => (
            <Slide key={original} className="flex items-center justify-center w-full h-full">
              <div className="w-full">
                <Image
                  src={medium}
                  alt=""
                  layout="responsive"
                  width={300}
                  height={200}
                  objectFit="contain"
                />
              </div>
            </Slide>
          ))}
        </Carousel>
      </Modal>
    </div>
  );
};

export default ImageGallery;
