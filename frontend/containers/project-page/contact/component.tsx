import React, { useState } from 'react';

import { FormattedMessage } from 'react-intl';

import { useProjectContacts } from 'helpers/project';

import { ContactProps } from 'containers/project-page/contact/types';
import ContactInformationModal from 'containers/social-contact/contact-information-modal/component';

import Button from 'components/button';
import LayoutContainer from 'components/layout-container';

export const Contact: React.FC<ContactProps> = ({ project }: ContactProps) => {
  const [isContactInfoModalOpen, setIsContactInfoModalOpen] = useState<boolean>(false);

  const contacts = useProjectContacts(project);

  if (!contacts.length) return null;

  return (
    <section className="text-white bg-green-dark py-14 sm:py-18">
      <LayoutContainer className="flex flex-col items-center">
        <div className="flex flex-col items-center mb-8 space-y-6 sm:mb-14">
          <h2 className="font-serif text-3xl text-center sm:text-[3.5rem] md:mx-20 lg:mx-44 2xl:mx-96 xl:mx-64">
            <FormattedMessage defaultMessage="Want to know more about this project?" id="DeOyLr" />
          </h2>
          <h4 className="font-sans text-lg">
            <FormattedMessage
              defaultMessage="Contact the project developers to know more about the project."
              id="X2YMUl"
            />
          </h4>
        </div>
        <Button
          theme="primary-white"
          size="base"
          className="flex justify-center w-full py-3 sm:w-auto"
          onClick={() => setIsContactInfoModalOpen(true)}
        >
          <FormattedMessage defaultMessage="Contact" id="zFegDD" />
        </Button>
      </LayoutContainer>
      <ContactInformationModal
        isOpen={isContactInfoModalOpen}
        onDismiss={() => setIsContactInfoModalOpen(false)}
        contacts={contacts}
      />
    </section>
  );
};

export default Contact;
