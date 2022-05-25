import { FC } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import Button from 'components/button';
import Modal from 'components/modal';

import ContactItem from './contact-item';
import type { ContactInformationModalProps } from './types';

export const ContactInformationModal: FC<ContactInformationModalProps> = ({
  isOpen,
  onDismiss,
  contacts: contactsProp,
}: ContactInformationModalProps) => {
  const intl = useIntl();

  const contacts = Array.isArray(contactsProp) ? contactsProp : [contactsProp];

  return (
    <Modal
      open={isOpen}
      title={intl.formatMessage({
        defaultMessage: 'Contact information',
        id: 'ITdmlJ',
      })}
      onDismiss={onDismiss}
    >
      <h1 className="font-serif text-2xl md:text-3xl text-green-dark">
        <FormattedMessage defaultMessage="Contact information" id="ITdmlJ" />
      </h1>
      <p className="mt-2">
        <FormattedMessage
          defaultMessage="Please use the contacts below to reach the project developer."
          id="JFkvlB"
        />
      </p>
      {contacts.map((contact) => (
        <ContactItem key={contact.name} {...contact} />
      ))}

      <div className="flex justify-center mt-6">
        <Button onClick={() => onDismiss()}>OK</Button>
      </div>
    </Modal>
  );
};

export default ContactInformationModal;
