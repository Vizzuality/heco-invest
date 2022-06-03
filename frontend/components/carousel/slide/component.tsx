import { FC } from 'react';

import { SlideProps } from './types';

export const Slide: FC<SlideProps> = ({
  className,
  width,
  height,
  onFocus,
  children,
}: SlideProps) => (
  <li
    className="inline-flex w-full transition-opacity duration-100 ease-in-out"
    style={{ width, height }}
    onFocus={onFocus}
  >
    <div className="w-full m-4">
      <div className={className}>{children}</div>
    </div>
  </li>
);

export default Slide;
