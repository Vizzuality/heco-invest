import { FC, useState } from 'react';

import cx from 'classnames';

import Image from 'next/image';

import Button from 'components/button';
import Carousel, { Slide } from 'components/carousel';
import Modal from 'components/modal';

import { ImageGalleryProps } from '.';

export const ImageGallery: FC<ImageGalleryProps> = ({ images }) => {
  const [active, setActive] = useState<number>();

  return (
    <div aria-hidden>
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
              >
                <Image
                  src={small.replace('/backend', '')}
                  alt=""
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
        title="Open image"
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
                  src={medium.replace('/backend', '')}
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
