import themeState from "./states/themeState";
import navbarState from "./states/navbarState";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        themeState,
        navbarState
    }
})

export default store;