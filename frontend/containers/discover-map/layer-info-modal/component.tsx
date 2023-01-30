import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import Button from 'components/button';
import Modal from 'components/modal';

import { LayerInfoModalProps } from './types';

const LayerInfoModal: FC<LayerInfoModalProps> = ({ layer, closeLayerInfoModal }) => {
  return (
    <Modal open={!!layer?.name} onDismiss={closeLayerInfoModal} title={layer?.name}>
      <div>
        <div>
          <h1 className="font-serif text-3xl text-green-dark">{layer?.name}</h1>
        </div>
        <div className="max-w-full">
          <p className="mt-4 mb-2 text-sm font-semibold text-gray-600">
            <FormattedMessage defaultMessage="Description" id="Q8Qw5B" />
          </p>
          <p className="text-xs text-gray-900">{layer?.description}</p>
        </div>
        <div>
          <p className="mt-4 mb-2 text-sm font-semibold text-gray-600">
            {!!layer?.overview && <FormattedMessage defaultMessage="Overview" id="9uOFF3" />}
          </p>
          {Array.isArray(layer?.overview) ? (
            <div className="flex flex-col gap-2">
              {layer?.overview.map((overview, index) => (
                <p key={index} className="text-xs text-gray-900">
                  {overview}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-900">{layer?.overview}</p>
          )}
        </div>
        <div>
          <p className="mt-4 mb-2 text-sm font-semibold text-gray-600">
            {!!layer?.dataSource && <FormattedMessage defaultMessage="Source" id="aH4De2" />}
          </p>
          {layer?.dataSourceUrl ? (
            <a
              className="text-xs text-gray-900 underline"
              target="_blanc"
              rel="noopener noreferrer"
              href={layer?.dataSourceUrl}
            >
              {layer?.dataSource}
            </a>
          ) : (
            <p className="text-xs text-gray-900">{layer?.dataSource}</p>
          )}
        </div>
        <div className="flex justify-center mt-14">
          <Button onClick={closeLayerInfoModal}>
            <FormattedMessage defaultMessage="Ok" id="jwimQJ" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LayerInfoModal;
