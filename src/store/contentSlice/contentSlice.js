import { createSlice } from '@reduxjs/toolkit';

const contentSlice = createSlice({
    name: 'content',
    initialState: {
        content: [],
        loading: false,
        error: null,
    },
    reducers: {
        getContent: (state, action) => {
            console.log("Redux getContent called with:", action.payload);
            state.content = action.payload;
        },
    },
})

export const { getContent } = contentSlice.actions;
export default contentSlice.reducer;