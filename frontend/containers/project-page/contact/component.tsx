import React, { useState, useMemo } from 'react';

import { FormattedMessage } from 'react-intl';

import { ContactProps } from 'containers/project-page/contact/types';
import ContactInformationModal from 'containers/social-contact/contact-information-modal/component';

import Button from 'components/button';
import LayoutContainer from 'components/layout-container';

export const Contact: React.FC<ContactProps> = ({ project }: ContactProps) => {
  const [isContactInfoModalOpen, setIsContactInfoModalOpen] = useState<boolean>(false);

  const contacts = useMemo(
    () =>
      [project?.project_developer, ...project?.involved_project_developers]
        .map((developer) => {
          if (!developer?.contact_email && !developer?.contact_phone) return;

          return {
            name: developer.name,
            email: developer.contact_email,
            phone: developer.contact_phone,
            picture: developer.picture?.small,
          };
        })
        .filter((developer) => !!developer),
    [project]
  );

  if (!contacts.length) return null;

  return (
    <section className="text-white bg-green-dark py-18">
      <LayoutContainer className="flex flex-col items-center">
        <div className="flex flex-col items-center space-y-6 mb-14">
          <h2 className="font-serif text-4xl text-center md:mx-20 lg:mx-44 2xl:mx-96 xl:mx-64">
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
          className="py-3"
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
