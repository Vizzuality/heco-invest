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
        className="h-1/2"
      >
        <Carousel defaultSlide={active} className="max-w-3xl m-12 h-fit">
          {images.map(({ file: { original, medium } }) => (
            <Slide key={original} className="w-full h-full text-center">
              <Image
                src={medium.replace('/backend', '')}
                alt=""
                // layout="fill"
                width={300}
                height={300}
                objectFit="contain"
              />
            </Slide>
          ))}
        </Carousel>
      </Modal>
    </div>
  );
};

export default ImageGallery;
