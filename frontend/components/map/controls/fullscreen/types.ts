import { MutableRefObject } from 'react';

export interface FullscreenControlProps {
  /** Reference ot the map's container */
  mapRef: MutableRefObject<any>;
  /** Classname to apply to the control */
  className?: string;
}
