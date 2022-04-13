import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useSignOut } from 'services/authentication/authService';

const SignOut = () => {
  const signOut = useSignOut();
  const { push } = useRouter();

  useEffect(() => {
    signOut.mutate({}, { onSuccess: () => push('/') });
  }, []);

  return <div>SIGN OUT</div>;
};

export default SignOut;
