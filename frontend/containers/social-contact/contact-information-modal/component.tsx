import { FC } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import Link from 'next/link';

import Button from 'components/button';
import Icon from 'components/icon';
import Modal from 'components/modal';

import ContactEmailSVG from 'svgs/contact/email.svg';
import ContactPhoneSVG from 'svgs/contact/phone.svg';

import type { ContactInformationModalProps } from './types';

export const ContactInformationModal: FC<ContactInformationModalProps> = ({
  isOpen,
  onDismiss,
  contact,
}: ContactInformationModalProps) => {
  const intl = useIntl();

  return (
    <Modal open={isOpen} title={'Contact information'} onDismiss={onDismiss}>
      <h1 className="font-serif text-2xl md:text-3xl text-green-dark">
        <FormattedMessage defaultMessage="Contact information" id="ITdmlJ" />
      </h1>
      <p className="mt-2">
        <FormattedMessage
          defaultMessage="Please use the contacts below to reach the project developer."
          id="JFkvlB"
        />
      </p>
      <div className="flex justify-center my-12">
        <div className="flex flex-col w-full max-w-md gap-5">
          {contact?.email && (
            <span
              className="flex items-center"
              aria-label={intl.formatMessage({
                defaultMessage: 'Contact email',
                id: 'DR+23P',
              })}
            >
              <Icon icon={ContactEmailSVG} className="w-12 h-12 mr-5" aria-hidden={true} />
              <Link href={`mailto:${contact.email}`}>
                <a
                  className="underline transition-all rounded text-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.email}
                </a>
              </Link>
            </span>
          )}
          {contact?.phone && (
            <span
              className="flex items-center"
              aria-label={intl.formatMessage({
                defaultMessage: 'Contact phone',
                id: '2CtPQ/',
              })}
            >
              <Icon icon={ContactPhoneSVG} className="w-12 h-12 mr-5" aria-hidden={true} />
              <Link href={`tel:${contact.phone}`}>
                <a className="underline transition-all rounded text-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark">
                  {contact.phone}
                </a>
              </Link>
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Button onClick={() => onDismiss()}>OK</Button>
      </div>
    </Modal>
  );
};

export default ContactInformationModal;
