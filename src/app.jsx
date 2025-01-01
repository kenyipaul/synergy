import Axios from "axios"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import HomeView from "./views/HomeView"
import EventView from "./views/EventView"
import Navbar from "./modules/Navbar"
import { useSelector, useDispatch } from "react-redux"
import CommunityView from "./views/community_views/CommunityView.jsx"
import JobView from "./views/JobView"
import Signup from "./views/Signup"
import Login from "./views/Login"
import ProfileView from "./views/ProfileView.jsx"
import CommunityCreator from "./creators/communityCreator"
import { useEffect } from "react"
import { authRoute } from "./routes/routes"
import { setUser } from "./store/states/userState"
import CommunityViewContent from "./views/community_views/CommunitViewContent.jsx"
import CommunityProfile from "./views/community_views/CommunityProfile.jsx"

export default function App() {

    const dispatch = useDispatch();

    const userState = useSelector(store => store.userState);
    const loginState = useSelector(store => store.loginState);
    const themeState = useSelector(store => store.themeState);
    const signupState = useSelector(store => store.signupState);
    const comCreatorState = useSelector(store => store.comCreatorState);
    const dimmerState = useSelector(store => store.dimmerState)

    useEffect(() => {
        const token = sessionStorage.getItem("token")

        if (token) {
            let auth = JSON.parse(token)
            console.log(auth)

            Axios({
                method: "GET",
                url: authRoute,
                headers: {
                    "Authorization": `Bearer ${auth.access}`
                }
            }).then((response) => {
                dispatch(setUser(response.data.data))
            })
            // 72c4dc3b7b90662822d7a2cc09c14756a028a801
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
                        
                        <Route path="/communities" element={<CommunityView />}>
                            <Route path="" element={<CommunityViewContent /> } />
                            <Route path="community" element={<CommunityProfile />} />
                        </Route>

                        <Route path="/jobs" element={<JobView />} children={[]} />
                        <Route path="/profile" element={<ProfileView />} />
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