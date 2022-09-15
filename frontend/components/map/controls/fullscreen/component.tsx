import { FC, useCallback, useState } from 'react';

import { Maximize as MaximizeIcon, Minimize as MinimizeIcon } from 'react-feather';
import { useIntl } from 'react-intl';

import Icon from 'components/icon';

import type { FullscreenControlProps } from './types';

export const FullscreenControl: FC<FullscreenControlProps> = ({
  mapRef,
  className,
}: FullscreenControlProps) => {
  const intl = useIntl();
  const [fullscreen, setFullscreen] = useState(false);

  const onToggleFullscreen = useCallback(() => {
    if (!fullscreen) {
      // NOTE: Webkit is prefixing the function (`webkitRequestFullscreen`) *and* for some reason
      // won't let you request fullscreen if you store the function in a variable. For example, this
      // won't work:
      // ```tsx
      //   const requestFullscreen = mapRef.current?.webkitRequestFullscreen;
      //   requestFullscreen();
      // ```
      if (mapRef.current?.requestFullscreen) {
        mapRef.current?.requestFullscreen();
      } else if (mapRef.current?.webkitRequestFullscreen) {
        mapRef.current?.webkitRequestFullscreen();
      }

      setFullscreen(true);
    } else {
      // NOTE: Same issue here with Webkit :(
      if (document.exitFullscreen) {
        document.exitFullscreen();
        /** @ts-ignore */
      } else if (document.webkitExitFullscreen) {
        /** @ts-ignore */
        document.webkitExitFullscreen();
      }

      setFullscreen(false);
    }
  }, [fullscreen, mapRef]);

  return (
    <div className={className}>
      <button
        className="p-2 mb-1 text-gray-800 transition-all bg-white rounded shadow-sm focus-visible:outline-green-dark hover:text-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:text-opacity-60 disabled:pointer-events-none"
        title={intl.formatMessage({ defaultMessage: 'Toggle fullscreen mode', id: 'Xf3dpi' })}
        type="button"
        onClick={onToggleFullscreen}
      >
        <Icon icon={fullscreen ? MinimizeIcon : MaximizeIcon} />
      </button>
    </div>
  );
};

export default FullscreenControl;
