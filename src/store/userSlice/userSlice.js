import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token:null,
        loading: false,
        error: null,
    },
    reducers: {
        getUser: (state, action) => {
            console.log("Redux getUser called with:", action.payload);
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
          },
    },
})

export const { getUser, clearUser } = userSlice.actions;
export default userSlice.reducer;