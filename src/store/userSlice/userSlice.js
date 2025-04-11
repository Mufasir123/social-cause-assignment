import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        getUser: (state, action) => {
            console.log("Redux getUser called with:", action.payload);
            state.user = action.payload;
        },
    },
})

export const { getUser } = userSlice.actions;
export default userSlice.reducer;