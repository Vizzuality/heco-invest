import { FC, useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import Button from 'components/button';
import Modal from 'components/modal';
import Tooltip from 'components/tooltip';

import { LayerInfoModalProps } from './types';

export const LayerInfoModal: FC<LayerInfoModalProps> = ({ layer }) => {
  const { formatMessage } = useIntl();
  const [open, setOpen] = useState(false);

  const { description, name, overview, dataSource, dataSourceUrl } = layer;

  return (
    <div>
      <Tooltip
        content={
          <div className="z-40 flex-shrink-0 max-w-xs p-2 font-sans text-sm font-normal text-white bg-black rounded-sm sm:max-w-md">
            {description}
          </div>
        }
        trigger="mouseenter"
        disabled={open}
        hideOnClick={true}
      >
        <Button
          theme="naked"
          size="smallest"
          className="flex items-center justify-center flex-shrink-0 w-4 h-4 text-gray-800 scale-90 border border-gray-800 rounded-full pointer focus-visible:outline-green-dark focus-visible:outline-2"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">{description}</span>
          <span className="pt-0.5 text-xs" aria-hidden>
            i
          </span>
        </Button>
      </Tooltip>

      <Modal open={open} onDismiss={() => setOpen(false)} title={name}>
        <div>
          <div>
            <h1 className="font-serif text-3xl text-green-dark">{name}</h1>
          </div>
          <div className="max-w-full">
            <p className="mt-4 mb-2 text-sm font-semibold text-gray-600">
              <FormattedMessage defaultMessage="Description" id="Q8Qw5B" />
            </p>
            <p className="text-xs text-gray-900">{description}</p>
          </div>
          <div>
            <p className="mt-4 mb-2 text-sm font-semibold text-gray-600">
              {!!overview && <FormattedMessage defaultMessage="Overview" id="9uOFF3" />}
            </p>
            {Array.isArray(overview) ? (
              <div className="flex flex-col gap-2">
                {overview.map((overview, index) => (
                  <p key={index} className="text-xs text-gray-900">
                    {overview}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-900">{overview}</p>
            )}
          </div>
          <div>
            <p className="mt-4 mb-2 text-sm font-semibold text-gray-600">
              {!!dataSource && <FormattedMessage defaultMessage="Source" id="aH4De2" />}
            </p>
            {dataSourceUrl ? (
              <a
                className="text-xs text-gray-900 underline"
                target="_blanc"
                rel="noopener noreferrer"
                href={dataSourceUrl}
              >
                {dataSource}
              </a>
            ) : (
              <p className="text-xs text-gray-900">{dataSource}</p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LayerInfoModal;
