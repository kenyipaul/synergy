import themeState from "./states/themeState";
import navbarState from "./states/navbarState";
import { configureStore } from "@reduxjs/toolkit";
import userState from "./states/userState"

import loginState from "./states/loginState";
import dimmerState from "./states/dimmerState";
import signupState from "./states/signupState";
import comCreatorState from "./states/comCreatorState"

const store = configureStore({
    reducer: {
        userState,
        themeState,
        navbarState,
        loginState,
        dimmerState,
        signupState,
        comCreatorState,
    }
})

export default store;