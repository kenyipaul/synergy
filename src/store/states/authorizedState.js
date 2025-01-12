import { createSlice } from "@reduxjs/toolkit";

const authorizedState = createSlice({
    name: "authorized",
    initialState: {
        authorized: false,
        user: {}
    },
    reducers: {
        setAuthorized: (state, action) => {
            state.authorized = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export default authorizedState.reducer;
export const { setAuthorized, setUser } = authorizedState.actions;