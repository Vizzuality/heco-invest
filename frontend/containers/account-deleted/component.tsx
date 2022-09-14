import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';

import Head from 'components/head';
import LayoutContainer from 'components/layout-container';

export const AccountDeleted = () => {
  const { formatMessage } = useIntl();
  return (
    <>
      <Head title={formatMessage({ defaultMessage: 'Account Deleted', id: '77qZcU' })} />
      <div className="flex justify-center min-h-screen">
        <LayoutContainer
          layout="narrow"
          className="flex flex-col items-center justify-center mt-24 md:mt-36 pb-[10%] text-center"
        >
          <Image
            width={178}
            height={170}
            aria-hidden="true"
            src="/images/account-deleted.svg"
            alt=""
          />
          <h1 className="mt-6 mb-6 font-serif text-3xl text-green-dark">
            <FormattedMessage defaultMessage="Your account has been deleted" id="d8knkp" />
          </h1>
          <p>
            <FormattedMessage defaultMessage="Thanks for using HeCo Invest" id="S2nxXm" />
          </p>
        </LayoutContainer>
      </div>
    </>
  );
};
export default AccountDeleted;
