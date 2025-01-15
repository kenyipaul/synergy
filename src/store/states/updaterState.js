import { createSlice } from "@reduxjs/toolkit";

const updaterState = createSlice({
    name: "updaterState",
    initialState: true,
    reducers: {
        setUpdater: (state, action) => {
            return state = action.payload
        }
    }
})

export default updaterState.reducer;
export const { setUpdater } = updaterState.actions;