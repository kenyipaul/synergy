import Axios from "axios"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import HomeView from "./views/HomeView"
import EventView from "./views/EventView"
import Navbar from "./modules/Navbar"
import { useSelector, useDispatch } from "react-redux"
import CommunityView from "./views/CommunityView"
import JobView from "./views/JobView"
import Signup from "./views/Signup"
import Login from "./views/Login"
import CommunityCreator from "./creators/communityCreator"
import { useEffect } from "react"
import { authRoute } from "./routes/routes"
import { setUser } from "./store/states/userState"

export default function App() {

    const dispatch = useDispatch();

    const userState = useSelector(store => store.userState);
    const loginState = useSelector(store => store.loginState);
    const themeState = useSelector(store => store.themeState);
    const signupState = useSelector(store => store.signupState);
    const comCreatorState = useSelector(store => store.comCreatorState);
    const dimmerState = useSelector(store => store.dimmerState)

    useEffect(() => {
        const token = sessionStorage.getItem("_token")

        if (token) {
            Axios({
                method: "POST",
                url: authRoute,
                data: { token }
            }).then((response) => {
                dispatch(setUser(response.data.data))
            })
        }

    }, [])

    return (
        <div id="app" className={themeState == "dark" ? "dark" : "light"}>
            <Router>
                <Navbar />

                <div id="main">
                    <Routes>
                        <Route path="/" element={<HomeView />} />
                        <Route path="/events" element={<EventView />} />
                        <Route path="/community" element={<CommunityView />} />
                        <Route path="/jobs" element={<JobView />} />
                    </Routes>

                    { dimmerState && <div className="dimmer"></div> }
                </div>

                { signupState && <Signup /> }
                { loginState && <Login /> }
                { comCreatorState && <CommunityCreator /> }
            </Router>
        </div>
    )
}