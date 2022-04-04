import Head from 'next/head';

import { withProtection } from 'hoc/auth';

import useMe from 'hooks/me';

import LayoutContainer from 'components/layout-container';
import Protected from 'layouts/protected-page';

export const getServerSideProps = withProtection();

const ProtectedPage: React.FC = () => {
  const { user } = useMe();

  return (
    <Protected>
      <Head title="Protected" />

      <LayoutContainer className="mt-24 mb-24">Logged in user: {user.email}</LayoutContainer>
    </Protected>
  );
};

export default ProtectedPage;
