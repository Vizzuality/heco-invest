import { FC } from 'react';

import { X as CloseIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import Button from 'components/button';

import { LayerTooltipProps } from '.';

export const LayerTooltip: FC<LayerTooltipProps> = ({ selectedLayer, closeTooltip }) => {
  const isOpen = !!selectedLayer;
  return (
    <div
      className={cx('z-10 transition-all ease-in-out duration-500', {
        'left-0 opacity-0 py-0 pt-0 pl-0 pr-0 pb-0 w-0': !isOpen,
        'left-auto opacity-100 pt-4 pl-6 pr-3 pb-4 w-auto': isOpen,
      })}
    >
      <div className="flex flex-col max-h-[500px] overflow-y-auto pr-2">
        <div className="flex justify-end">
          <Button theme="naked" className="px-0 py-0" onClick={closeTooltip}>
            <CloseIcon className="w-4 h-4 transition-transform rotate-0 hover:rotate-180" />
          </Button>
        </div>
        <div className="text-lg font-semibold text-gray-900">{selectedLayer?.name}</div>
        <div className="max-w-full">
          <p className="mt-4 mb-2 text-sm font-semibold text-gray-600">
            <FormattedMessage defaultMessage="Description" id="Q8Qw5B" />
          </p>
          <p className="text-xs text-gray-900">{selectedLayer?.description}</p>
        </div>
        <div>
          <p className="mt-4 mb-2 text-sm font-semibold text-gray-600">
            {!!selectedLayer?.overview && (
              <FormattedMessage defaultMessage="Overview" id="9uOFF3" />
            )}
          </p>
          <p className="text-xs text-gray-900">{selectedLayer?.overview}</p>
        </div>
        <div>
          <p className="mt-4 mb-2 text-sm font-semibold text-gray-600">
            {!!selectedLayer?.dataSource && (
              <FormattedMessage defaultMessage="Source" id="aH4De2" />
            )}
          </p>
          {selectedLayer?.dataSourceUrl ? (
            <a
              className="text-xs text-gray-900 hover:underline"
              target="_blanc"
              rel="noopener noreferrer"
              href={selectedLayer?.dataSourceUrl}
            >
              {selectedLayer?.dataSource}
            </a>
          ) : (
            <p className="text-xs text-gray-900">{selectedLayer?.dataSource}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LayerTooltip;
