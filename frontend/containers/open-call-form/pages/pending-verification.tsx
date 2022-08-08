import { FormattedMessage } from 'react-intl';

import Image from 'next/image';
import Link from 'next/link';

import { FaqPaths, FaqQuestions } from 'hooks/useFaq';

import Button from 'components/button';
import { Paths } from 'enums';

export const PendingVerification = ({ slug }: { slug: string }) => {
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
          defaultMessage="Your open call is awaiting verification. This means that the open call is visible in the platform but without the <b>Verification badge</b>."
          id="7NGqWp"
          values={{
            b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
          }}
        />
      </p>
      <Button className="mt-6 mb-12" to={`${Paths.Project}/${slug}`}>
        <FormattedMessage defaultMessage="Go to open call page" id="M4pZPN" />
      </Button>
      <Link href={FaqPaths[FaqQuestions.WhatIsAVerificationBadge]} passHref>
        <a target="_blank" rel="noopener noreferrer" className="font-sans text-gray-600 underline">
          <FormattedMessage defaultMessage="What is a verification badge?" id="qZPjW2" />
        </a>
      </Link>
      <Link href={FaqPaths[FaqQuestions.WhenWillTheOpenCallHaveTheVerificationBadge]} passHref>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 font-sans text-gray-600 underline"
        >
          <FormattedMessage
            defaultMessage="When will the open call have the Verification badge?"
            id="5DdRx+"
          />
        </a>
      </Link>
    </div>
  );
};
