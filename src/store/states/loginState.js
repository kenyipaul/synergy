import { createSlice } from "@reduxjs/toolkit";

const loginState = createSlice({
    name: "loginState",
    initialState: false,
    reducers: {
        setLoginState(state, action) {
            return state = action.payload
        }
    }
})

export default loginState.reducer;
export const { setLoginState } = loginState.actions;