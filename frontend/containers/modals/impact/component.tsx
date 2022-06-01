import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';

import { ImpactModalProps } from 'containers/modals/impact/types';

import Button from 'components/button';
import Modal from 'components/modal';

export const ImpactModal: React.FC<ImpactModalProps> = ({
  impactModalOpen,
  setImpactModalOpen,
}: ImpactModalProps) => {
  const intl = useIntl();
  return (
    <Modal
      title={intl.formatMessage({
        defaultMessage: 'How is the impact calculated?',
        id: '9cE0nR',
      })}
      open={impactModalOpen}
      onDismiss={() => setImpactModalOpen(false)}
    >
      <h1 className="font-serif text-2xl font-semibold sm:text-3xl">
        <FormattedMessage defaultMessage="How is the impact calculated?" id="9cE0nR" />
      </h1>
      <div className="flex flex-col-reverse mt-8 2xl:grid 2xl:grid-cols-2 2xl:gap-8">
        <div className="mt-5 2xl:mt-0">
          <p>
            <FormattedMessage
              defaultMessage="HeCo Invest relies on the <span>ARIES Artificial Intelligence</span> model to estimate − in a scientifically-informed and accurate manner − the impact of each project in each one of our four dimensions of interest based on existing knowledge and data. These impacts are calculated on a scale from 0 to 10 as shown in the chart of impact."
              id="1B1DeU"
              values={{
                span: (chunks) => <span className="font-semibold">{chunks}</span>,
              }}
            />
          </p>
          <ol className="pl-5 mt-4 list-disc">
            <li>
              <FormattedMessage
                defaultMessage="<span>Biodiversity:</span> endemism, conservation/restoration potential, landscape connectivity;"
                id="hiQOgT"
                values={{
                  span: (chunks) => <span className="font-semibold">{chunks}</span>,
                }}
              />
            </li>
            <li>
              <FormattedMessage
                defaultMessage="<span>Climate:</span> wood and soil biomass, application of sustainable forest measures;"
                id="aRIIAG"
                values={{
                  span: (chunks) => <span className="font-semibold">{chunks}</span>,
                }}
              />
            </li>
            <li>
              <FormattedMessage
                defaultMessage="<span>Community:</span> income, sustainable projects;"
                id="BAC0rl"
                values={{
                  span: (chunks) => <span className="font-semibold">{chunks}</span>,
                }}
              />
            </li>
            <li>
              <FormattedMessage
                defaultMessage="<span>Water:</span> water cycling, quality, and risk management."
                id="VG3saq"
                values={{
                  span: (chunks) => <span className="font-semibold">{chunks}</span>,
                }}
              />
            </li>
          </ol>
        </div>
        <div className="max-w-md mx-auto">
          <Image
            src="/images/about-impact-chart.svg"
            width={308}
            height={252}
            layout="intrinsic"
            alt=""
          />
        </div>
      </div>
      <div className="flex justify-center mt-5 text-center md:mt-12">
        <Button theme="primary-green" onClick={() => setImpactModalOpen(false)}>
          <FormattedMessage defaultMessage="Ok" id="jwimQJ" />
        </Button>
      </div>
    </Modal>
  );
};

export default ImpactModal;
