import Axios from "axios"

import { useEffect } from "react"
import Navbar from "./modules/Navbar"
import { Outlet } from "react-router-dom"
import { authRoute } from "./routes/routes"
import { useSelector, useDispatch } from "react-redux"
import { setAuthorized, setUser  } from "./store/states/authorizedState"


export default function App() {

    const dispatch = useDispatch();
    const themeState = useSelector(store => store.themeState);
    const authorizedState = useSelector(store => store.authorizedState);

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        const user = sessionStorage.getItem("user")


        if (token && user) {

            dispatch(setUser(JSON.parse(user)))

            Axios({
                method: "POST",
                url: authRoute,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) => {
                dispatch(setAuthorized(true))
            })
        }

    }, [])

    return (
        <div id="app" className={themeState == "dark" ? "dark" : "light"}>
            <Navbar />

            <div id="main">
                <Outlet />
            </div>
        </div>
    )
}