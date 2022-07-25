import { createSlice } from '@reduxjs/toolkit';

export const collapsedSlice = createSlice({
  name: 'collapsed',
  initialState: {
    value: false,
  },
  reducers: {
    reversal: (state, payload) => {
      console.log(payload);
      state.value = !state.value;
    }
  }
})

// Action creators are generated for each case reducer function
export const { reversal } = collapsedSlice.actions;

export default collapsedSlice.reducer;