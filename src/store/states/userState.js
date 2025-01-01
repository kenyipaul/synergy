import { createSlice } from "@reduxjs/toolkit";

const userState = createSlice({
    name: "userState",
    initialState: {},
    reducers: {
        setUser: (state, action) => {
            return state = action.payload
        }
    }
})

export default userState.reducer;
export const { setUser } = userState.actions;