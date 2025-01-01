import { createSlice } from "@reduxjs/toolkit";

const signupState = createSlice({
    name: "signupState",
    initialState: false,
    reducers: {
        setSignupState(state, action) {
            return state = action.payload
        }
    }
})

export default signupState.reducer;
export const { setSignupState } = signupState.actions;