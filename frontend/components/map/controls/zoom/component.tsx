import { FC, useCallback } from 'react';

import { ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon } from 'react-feather';
import { useIntl } from 'react-intl';

import cx from 'classnames';

import Icon from 'components/icon';

import type { ZoomControlProps } from './types';

export const ZoomControl: FC<ZoomControlProps> = ({
  className,
  viewport: { zoom, maxZoom, minZoom },
  onZoomChange,
}: ZoomControlProps) => {
  const intl = useIntl();

  const increaseZoom = useCallback(
    (e) => {
      e.stopPropagation();

      if (zoom + 1 <= maxZoom) {
        onZoomChange(zoom + 1);
      }
    },
    [zoom, maxZoom, onZoomChange]
  );

  const decreaseZoom = useCallback(
    (e) => {
      e.stopPropagation();

      if (zoom + 1 >= minZoom) {
        onZoomChange(zoom - 1);
      }
    },
    [zoom, minZoom, onZoomChange]
  );

  return (
    <div
      className={cx({
        'inline-flex flex-col': true,
        [className]: !!className,
      })}
    >
      <button
        className="p-2 mb-0.5 text-gray-800 transition-all bg-white rounded shadow focus-visible:outline-green-dark focus-visible:z-50 hover:text-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:text-opacity-60 disabled:pointer-events-none"
        title={intl.formatMessage({ defaultMessage: 'Zoom in', id: 'xbi38c' })}
        type="button"
        disabled={zoom === maxZoom}
        onClick={increaseZoom}
      >
        <Icon icon={ZoomInIcon} className="w-4 h-4" />
      </button>
      <button
        className="p-2 text-gray-800 transition-all bg-white rounded shadow focus-visible:outline-green-dark hover:text-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:text-opacity-60 disabled:pointer-events-none"
        title={intl.formatMessage({ defaultMessage: 'Zoom out', id: '/UnJ3S' })}
        type="button"
        disabled={zoom === minZoom}
        onClick={decreaseZoom}
      >
        <Icon icon={ZoomOutIcon} className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ZoomControl;
