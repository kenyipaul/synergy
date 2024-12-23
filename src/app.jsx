import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import HomeView from "./views/HomeView"
import EventView from "./views/EventView"
import Navbar from "./modules/Navbar"
import { useSelector } from "react-redux"
import CommunityView from "./views/CommunityView"
import JobView from "./views/JobView"
import Signup from "./views/Signup"
import Login from "./views/Login"

export default function App() {

    const themeState = useSelector(store => store.themeState);
    const loginState = useSelector(store => store.loginState)
    const signupState = useSelector(store => store.signupState)

    return (
        <div id="app" className={themeState == "dark" && "dark"}>
            <Router>
                <Navbar />

                <div id="main">
                    <Routes>
                        <Route path="/" element={<HomeView />} />
                        <Route path="/events" element={<EventView />} />
                        <Route path="/community" element={<CommunityView />} />
                        <Route path="/jobs" element={<JobView />} />
                    </Routes>
                </div>
            </Router>

            { signupState && <Signup /> }
            { loginState && <Login /> }
        </div>
    )
}