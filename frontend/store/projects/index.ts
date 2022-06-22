import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UIState {
  bbox: number[];
}

// Define the initial state using that type
const initialState: UIState = {
  bbox: null,
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setBbox: (state, action: PayloadAction<number[]>) => {
      state.bbox = action.payload;
    },
  },
});

export const { setBbox } = applicationSlice.actions;

export default applicationSlice.reducer;
