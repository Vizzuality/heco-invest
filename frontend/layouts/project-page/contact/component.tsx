import React, { useState } from 'react';

import { FormattedMessage } from 'react-intl';

import Button from 'components/button';
import LayoutContainer from 'components/layout-container';
import { ContactProps } from 'layouts/project-page/contact/types';

export const Contact: React.FC<ContactProps> = ({ project }: ContactProps) => {
  const { contact_email: email, contact_phone: phone } = project?.project_developer;
  const [contactInfoModalOpen, setIsContactInfoModalOpen] = useState<boolean>(false);
  // TODO: add contactInfoModal component when set contactInfoModalOpen to true
  return (
    (!!phone || !!email) && (
      <section className="text-white bg-green-dark py-18">
        <LayoutContainer className="flex flex-col items-center">
          <div className="flex flex-col items-center space-y-6 mb-14">
            <h2 className="mx-20 font-serif text-5xl text-center lg:mx-44 2xl:mx-96 xl:mx-64">
              <FormattedMessage
                defaultMessage="Want to know more about this project?"
                id="DeOyLr"
              />
            </h2>
            <h4 className="font-sans text-lg">
              <FormattedMessage
                defaultMessage="Contact the project developers to know more about the project."
                id="X2YMUl"
              />
            </h4>
          </div>
          <Button
            disabled={!phone && !email}
            theme="primary-white"
            size="base"
            className="py-3"
            onClick={() => setIsContactInfoModalOpen(true)}
          >
            <FormattedMessage defaultMessage="Contact" id="zFegDD" />
          </Button>
        </LayoutContainer>
      </section>
    )
  );
};

export default Contact;
