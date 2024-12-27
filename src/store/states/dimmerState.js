import { createSlice } from "@reduxjs/toolkit";

const dimmerState = createSlice({
    name: "dimmerSlice",
    initialState: false,
    reducers: {
        setDimmer: (state, action) => {
            return state = action.payload;
        }
    }
})

export default dimmerState.reducer;
export const { setDimmer } = dimmerState.actions;