import { MutableRefObject } from 'react';

export interface FullscreenControlProps {
  /** Reference ot the map's container */
  mapRef: MutableRefObject<HTMLElement>;
  /** Classname to apply to the control */
  className?: string;
}
