import React from 'react';

import { FormattedMessage } from 'react-intl';

import Image from 'next/image';
import Link from 'next/link';

import { FaqPaths } from 'hooks/useFaq';

import Button from 'components/button';
import { Paths } from 'enums';

export const PendingApproval = ({ projectSlug }: { projectSlug: string }) => {
  return (
    <div className="flex flex-col items-center max-w-xl m-auto text-center">
      <Image
        width={178}
        height={170}
        aria-hidden="true"
        src="/images/pending-approval.svg"
        alt=""
      />
      <h1 className="mt-6 font-serif text-3xl font-semibold text-green-dark">
        <FormattedMessage defaultMessage="Pending verification" id="n6KNWj" />
      </h1>
      <p className="my-6">
        <FormattedMessage
          defaultMessage="Your project is awaiting verification. This means that the project is visible in the platform but without the <b>Verification badge</b>."
          id="ygAxHr"
          values={{
            b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
          }}
        />
      </p>
      <Button className="mt-6 mb-12" to={`${Paths.Project}/${projectSlug}`}>
        <FormattedMessage defaultMessage="Go to project page" id="mMReor" />
      </Button>
      <Link href={FaqPaths['what-is-a-verification-badge']} passHref>
        <a target="_blank" rel="noopener noreferrer" className="font-sans text-gray-600 underline">
          <FormattedMessage defaultMessage="What is a verification badge?" id="qZPjW2" />
        </a>
      </Link>
      <Link href={FaqPaths['when-will-the-project-have-the-verification-badge']} passHref>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 font-sans text-gray-600 underline"
        >
          <FormattedMessage
            defaultMessage="When will the project have the Verification badge?"
            id="E/YxHp"
          />
        </a>
      </Link>
    </div>
  );
};

export default PendingApproval;
