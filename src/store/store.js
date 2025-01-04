import { configureStore } from "@reduxjs/toolkit";

import themeState from "./states/themeState";
import navbarState from "./states/navbarState";
import authorizedState from "./states/authorizedState";

const store = configureStore({
    reducer: {
        themeState,
        navbarState,
        authorizedState
    }
})

export default store;