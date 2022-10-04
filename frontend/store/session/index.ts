import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'store';
import { SignIn } from 'types/sign-in';

// Define the initial state using that type
const initialState: SignIn = {
  email: undefined,
  password: undefined,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionData: (state, action: PayloadAction<SignIn>) => ({
      email: action.payload.email,
      password: action.payload.password,
    }),
  },
});

export const { setSessionData } = sessionSlice.actions;

export const session = (state: RootState) => state['session'];

export default sessionSlice.reducer;
