import React, { useState, useMemo } from 'react';

import { FormattedMessage } from 'react-intl';

import { ContactProps } from 'containers/project-page/contact/types';
import { ContactItemType } from 'containers/social-contact/contact-information-modal';
import ContactInformationModal from 'containers/social-contact/contact-information-modal/component';

import Button from 'components/button';
import LayoutContainer from 'components/layout-container';

export const Contact: React.FC<ContactProps> = ({ project }: ContactProps) => {
  const [isContactInfoModalOpen, setIsContactInfoModalOpen] = useState<boolean>(false);

  const contacts = useMemo<ContactItemType[]>(
    () =>
      [project?.project_developer, ...project?.involved_project_developers].reduce(
        (prev: ContactItemType[], { contact_email, contact_phone, name, picture, id }, index) => {
          if (
            // If there are values for contacts AND the involved_project_developer is not the project_developer
            (contact_email || contact_phone) &&
            (index === 0 || id !== project?.project_developer.id)
          )
            return [
              ...prev,
              { email: contact_email, name, picture: picture?.small, phone: contact_phone },
            ];
          return prev;
        },
        []
      ),
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
