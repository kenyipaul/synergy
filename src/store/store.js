import { configureStore } from "@reduxjs/toolkit";

import themeState from "./states/themeState";
import navbarState from "./states/navbarState";
import updaterState from "./states/updaterState";
import authorizedState from "./states/authorizedState";

const store = configureStore({
    reducer: {
        themeState,
        navbarState,
        updaterState,
        authorizedState,
    }
})

export default store;