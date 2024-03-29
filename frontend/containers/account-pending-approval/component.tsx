import { FormattedMessage } from 'react-intl';

import Image from 'next/image';
import Link from 'next/link';

import { FaqPaths, FaqQuestions } from 'hooks/useFaq';

import Button from 'components/button';

export const AccountPendingApproval = () => {
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
        <FormattedMessage defaultMessage="Pending approval" id="/CaREm" />
      </h1>
      <p className="my-6">
        <FormattedMessage
          defaultMessage="Your account was successfully created, but you still need to be approved by our platform administrators."
          id="c6KUQu"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="Until approval you can continue exploring our catalog."
          id="rVtR6m"
        />
      </p>
      <Button className="mt-6 mb-12" to="/discover">
        <FormattedMessage defaultMessage="Explore" id="7JlauX" />
      </Button>
      <Link href={FaqPaths[FaqQuestions.WhyAccountIsPendingApproval]} passHref>
        <a target="_blank" rel="noopener noreferrer" className="font-sans text-gray-600 underline">
          <FormattedMessage defaultMessage="Why is my account pending approval?" id="I2yxwP" />
        </a>
      </Link>
    </div>
  );
};
export default AccountPendingApproval;
