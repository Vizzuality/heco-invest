import Image from 'next/image';

import { Story, Meta } from '@storybook/react/types-6-0';

import Carousel, { Slide, CarouselProps } from '.';

export default {
  component: Carousel,
  title: 'Components/Carousel',
  argTypes: {},
} as Meta;

export const Default: Story<CarouselProps> = ({}: CarouselProps) => (
  <Carousel className="max-w-3xl m-12">
    {[...Array(6)].map((_, index) => (
      <Slide
        key={index}
        className="flex items-center justify-center p-20 bg-gray-200 border rounded-xl bg-gray h-96"
      >
        Slide number {index + 1}
      </Slide>
    ))}
  </Carousel>
);

export const DifferentHeights: Story<CarouselProps> = ({}: CarouselProps) => (
  <Carousel className="max-w-3xl m-12">
    <Slide className="p-4 bg-gray-200 border rounded-xl bg-gray">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis fringilla
        varius. Vivamus vulputate libero sed nibh egestas, eget porta velit tincidunt. Mauris et
        dictum lacus, ut volutpat nisi. In tempus magna non neque dictum dapibus. Maecenas est enim,
        scelerisque id blandit at, ornare ut ex. Etiam commodo orci risus, et scelerisque erat
        venenatis vel. Donec lobortis tortor tortor, vitae rutrum nunc faucibus efficitur. In a leo
        quis felis iaculis consectetur eu non turpis. Praesent et vulputate nisi. Duis ac est vitae
        neque faucibus varius.
      </p>
    </Slide>
    <Slide className="p-4 bg-gray-200 border rounded-xl bg-gray">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis fringilla
        varius. Vivamus vulputate libero sed nibh egestas, eget porta velit tincidunt. Mauris et
        dictum lacus, ut volutpat nisi. In tempus magna non neque dictum dapibus. Maecenas est enim,
        scelerisque id blandit at, ornare ut ex. Etiam commodo orci risus, et scelerisque erat
        venenatis vel. Donec lobortis tortor tortor, vitae rutrum nunc faucibus efficitur. In a leo
        quis felis iaculis consectetur eu non turpis. Praesent et vulputate nisi. Duis ac est vitae
        neque faucibus varius.
      </p>
      <p>
        Aliquam hendrerit rutrum justo, ut vestibulum lectus commodo in. Morbi ac enim eu mi
        pulvinar feugiat feugiat id leo. Donec in laoreet lacus. Vivamus egestas, sem non euismod
        sollicitudin, sem quam sagittis dui, laoreet gravida est dolor in lectus. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. In tincidunt dolor vitae molestie commodo.
        Cras a nunc euismod, finibus ipsum vulputate, volutpat quam. Donec sodales, diam hendrerit
        pulvinar consequat, ex urna pulvinar sapien, cursus mattis augue magna dignissim sapien.
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Nunc at convallis dolor, et malesuada mi.
      </p>
    </Slide>
  </Carousel>
);

export const WithImages: Story<CarouselProps> = ({}: CarouselProps) => (
  <Carousel className="max-w-3xl m-12">
    {[...Array(6)].map((_, index) => (
      <Slide key={index} className="pointer-events-none rounded-xl">
        <Image
          src="https://placekitten.com/g/768/400"
          alt="Image 1"
          width={768}
          height={400}
          priority={true}
        />
      </Slide>
    ))}
  </Carousel>
);
