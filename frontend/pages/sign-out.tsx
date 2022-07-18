import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { Paths } from 'enums';

import { useSignOut } from 'services/authentication/authService';

const SignOut = () => {
  const signOut = useSignOut();
  const { replace } = useRouter();

  useEffect(() => {
    signOut.mutate(
      {},
      {
        onSuccess: () => {
          replace(Paths.Home);
        },
      }
    );
  }, []);

  return null;
};

export default SignOut;
