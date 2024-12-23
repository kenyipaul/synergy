import themeState from "./states/themeState";
import navbarState from "./states/navbarState";
import { configureStore } from "@reduxjs/toolkit";

import loginState from "./states/loginState";
import signupState from "./states/signupState";

const store = configureStore({
    reducer: {
        themeState,
        navbarState,
        loginState,
        signupState
    }
})

export default store;