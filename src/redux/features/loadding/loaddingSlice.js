import { createSlice } from '@reduxjs/toolkit';

export const loaddingSlice = createSlice({
    name: 'loadding',
    initialState: {
        value: true
    },
    reducers: {
        trigger(state, { payload }){
            state.value = payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { trigger } = loaddingSlice.actions;

export default loaddingSlice.reducer;