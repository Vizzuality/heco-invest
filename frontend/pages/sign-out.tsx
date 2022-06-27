import { useEffect } from 'react';

import { useQueryClient } from 'react-query';

import { useRouter } from 'next/router';

import { Paths, Queries } from 'enums';

import { useSignOut } from 'services/authentication/authService';

const SignOut = () => {
  const signOut = useSignOut();
  const { replace, locale } = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    signOut.mutate(
      {},
      {
        onSuccess: () => {
          queryClient.setQueryData([Queries.User, locale], undefined);
          replace(Paths.Home);
        },
      }
    );
  }, []);

  return null;
};

export default SignOut;
