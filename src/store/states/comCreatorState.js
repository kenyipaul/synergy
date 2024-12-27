import { createSlice } from "@reduxjs/toolkit";

const comCreatorState = createSlice({
    name: "comCreatorState",
    initialState: false,
    reducers: {
        setComCreatorState: (state, action) => {
            return state = action.payload
        }
    }
})

export default comCreatorState.reducer;
export const { setComCreatorState } = comCreatorState.actions;