import { FC } from 'react';

import Button from 'components/button';
import Tooltip from 'components/tooltip';

import { LayerInfoModalProps } from './types';

export const LayerInfoModal: FC<LayerInfoModalProps> = ({ description, openInfoModal }) => {
  return (
    <div>
      <Tooltip
        content={
          <div className="z-40 flex-shrink-0 max-w-xs p-2 font-sans text-sm font-normal text-white bg-black rounded-sm sm:max-w-md">
            {description}
          </div>
        }
        trigger="mouseenter"
        hideOnClick={true}
      >
        <Button
          theme="naked"
          size="smallest"
          className="flex items-center justify-center flex-shrink-0 w-4 h-4 text-gray-800 scale-90 border border-gray-800 rounded-full pointer focus-visible:outline-green-dark focus-visible:outline-2"
          onClick={openInfoModal}
        >
          <span className="sr-only">{description}</span>
          <span className="pt-0.5 text-xs" aria-hidden>
            i
          </span>
        </Button>
      </Tooltip>
    </div>
  );
};

export default LayerInfoModal;
