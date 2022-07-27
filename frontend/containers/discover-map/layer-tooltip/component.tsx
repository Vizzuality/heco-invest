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
      aria-hidden={!isOpen}
      className={cx('z-10 transition-all ease-in-out duration-500 flex flex-col max-h-[500px]', {
        'opacity-0 p-0 w-0': !isOpen,
        'opacity-100 pt-4 pl-6 pr-3 pb-4 w-auto': isOpen,
      })}
    >
      <div className="flex justify-end p-0.5">
        <Button theme="naked" size="smallest" onClick={closeTooltip}>
          <CloseIcon className="w-4 h-4 transition-transform rotate-0 hover:rotate-180" />
        </Button>
      </div>
      <div className="overflow-y-auto">
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
          {Array.isArray(selectedLayer?.overview) ? (
            <div className="flex flex-col gap-2">
              {selectedLayer.overview.map((overview, index) => (
                <p key={index} className="text-xs text-gray-900">
                  {overview}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-900">{selectedLayer?.overview}</p>
          )}
        </div>
        <div>
          <p className="mt-4 mb-2 text-sm font-semibold text-gray-600">
            {!!selectedLayer?.dataSource && (
              <FormattedMessage defaultMessage="Source" id="aH4De2" />
            )}
          </p>
          {selectedLayer?.dataSourceUrl ? (
            <a
              className="text-xs text-gray-900 underline"
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
