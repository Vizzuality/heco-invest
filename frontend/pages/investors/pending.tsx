import React from 'react';

import { FormattedMessage } from 'react-intl';

import Image from 'next/image';
import Link from 'next/link';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Button from 'components/button';
import { Paths } from 'enums';
import FormPageLayout, { FormPageLayoutProps } from 'layouts/form-page';
import Header from 'layouts/static-page/header';
import { PageComponent } from 'types';

export async function getStaticProps(ctx) {
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
    },
  };
}

type PendingProjectProps = InferGetStaticPropsType<typeof getStaticProps>;

const Pending: PageComponent<PendingProjectProps, FormPageLayoutProps> = () => {
  return (
    <div className="flex items-center justify-center h-screen md:p-4">
      <Header />
      <div className="flex flex-col items-center max-w-xl m-auto text-center">
        <Image
          width={178}
          height={170}
          aria-hidden="true"
          src="/images/pending-approval.svg"
          alt=""
        />
        <h1 className="mt-6 font-serif text-3xl font-semibold text-green-dark">
          <FormattedMessage defaultMessage="Pending approval" id="/CaREm" />
        </h1>
        <p className="my-6">
          <FormattedMessage
            defaultMessage="Your account was successfully created, but you still need to be approved by our platform administrators."
            id="c6KUQu"
          />
        </p>
        <p className="my-6">
          <FormattedMessage
            defaultMessage="Until approval you can continue exploring our database."
            id="adPUXO"
          />
        </p>
        <Button className="mt-6 mb-12" to={`${Paths.Discover}`}>
          <FormattedMessage defaultMessage="Explore" id="7JlauX" />
        </Button>
        <Link href="/faq#pending-approval" passHref>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-gray-600 underline"
          >
            <FormattedMessage defaultMessage="Why is my account pending approval?" id="I2yxwP" />
          </a>
        </Link>
      </div>
    </div>
  );
};

Pending.layout = {
  Component: FormPageLayout,
};

export default Pending;
