import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import { LayerTooltipProps } from '.';

export const LayerTooltip: FC<LayerTooltipProps> = ({ selectedLayer }) => {
  return (
    <div>
      <div>
        <h1 className="font-serif text-3xl text-green-dark">{selectedLayer?.name}</h1>
      </div>
      <div className="max-w-full">
        <p className="mt-4 mb-2 text-sm font-semibold text-gray-600">
          <FormattedMessage defaultMessage="Description" id="Q8Qw5B" />
        </p>
        <p className="text-xs text-gray-900">{selectedLayer?.description}</p>
      </div>
      <div>
        <p className="mt-4 mb-2 text-sm font-semibold text-gray-600">
          {!!selectedLayer?.overview && <FormattedMessage defaultMessage="Overview" id="9uOFF3" />}
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
          {!!selectedLayer?.dataSource && <FormattedMessage defaultMessage="Source" id="aH4De2" />}
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
  );
};

export default LayerTooltip;
