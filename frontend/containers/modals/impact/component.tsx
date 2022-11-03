import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';
import Link from 'next/link';

import { FaqPaths } from 'hooks/useFaq';

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
              defaultMessage="HeCo Invest relies on the <span>ARIES Artificial Intelligence</span> platform to estimate − in a scientifically-informed and accurate manner − the impact of each project in each one of our four dimensions of interest based on existing knowledge and data. These impacts are calculated on a scale from 0 to 10 as shown in the chart of impact, considering a combination of landscape-level variables and self-reported project data."
              id="ScQ9Mo"
              values={{
                span: (chunks) => <span className="font-semibold">{chunks}</span>,
              }}
            />
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <Image
            src="/images/about/about-impact-chart.png"
            width={450}
            height={450}
            layout="intrinsic"
            alt=""
          />
        </div>
      </div>
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
            defaultMessage="<span>Climate:</span> carbon sequestration, wood and soil biomass, application of sustainable forest measures;"
            id="2B3k2/"
            values={{
              span: (chunks) => <span className="font-semibold">{chunks}</span>,
            }}
          />
        </li>
        <li>
          <FormattedMessage
            defaultMessage="<span>Community:</span> income generation, empowerment, sustainable projects;"
            id="OTytPB"
            values={{
              span: (chunks) => <span className="font-semibold">{chunks}</span>,
            }}
          />
        </li>
        <li>
          <FormattedMessage
            defaultMessage="<span>Water:</span> water cycle regulation, water quality, and risk management."
            id="h+MPP2"
            values={{
              span: (chunks) => <span className="font-semibold">{chunks}</span>,
            }}
          />
        </li>
      </ol>
      <p className="mt-4">
        <FormattedMessage
          defaultMessage="Project developers provide their perceived impact from a pre-defined checklist during the project registration phase, by selecting one or more indicators for each dimension."
          id="p++eM/"
        />
      </p>
      <p className="mt-4">
        <FormattedMessage
          defaultMessage="Values of 0 (non-selected) and 1 (selected) are assigned for each indicator. However, if all the indicators of a given dimension are selected, then the <b>score goes automatically to 0</b>. This is to ensure that the project developers only report the direct impacts of their projects and avoid exaggerating the project’s scope."
          id="zQaj4V"
          values={{
            b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
          }}
        />
      </p>
      <p className="mt-4">
        <FormattedMessage
          defaultMessage="To estimate the project’s impact, these scores are then combined with landscape-level knowledge, provided by ARIES, which identifies the contextual needs."
          id="eHgiRK"
        />
      </p>
      <p className="mt-4">
        <Link href={FaqPaths['how-is-the-impact-calculated']}>
          <a className="underline text-green-dark" target="_blank">
            <FormattedMessage defaultMessage="Learn more" id="TdTXXf" />
          </a>
        </Link>
      </p>
      <div className="flex justify-center mt-5 text-center md:mt-12">
        <Button theme="primary-green" onClick={() => setImpactModalOpen(false)}>
          <FormattedMessage defaultMessage="Ok" id="jwimQJ" />
        </Button>
      </div>
    </Modal>
  );
};

export default ImpactModal;
