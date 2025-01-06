import Axios from "axios"

import { useEffect } from "react"
import Navbar from "./layout/Navbar"
import { Outlet } from "react-router-dom"
import { authRoute } from "./routes/routes"
import { useSelector, useDispatch } from "react-redux"
import { setAuthorized, setUser  } from "./store/states/authorizedState"
import { setTheme } from "./store/states/themeState"


export default function App() {

    const dispatch = useDispatch();
    const themeState = useSelector(store => store.themeState);

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
            }).catch((error) => {
                if (error.response.data.acknowledged) {
                    alert(error.response.data.msg)
                    sessionStorage.removeItem("token")
                    sessionStorage.removeItem("user")
                }
            })
        }

        const theme = localStorage.getItem("theme")

        if (theme) {
            dispatch(setTheme(theme));
        } else {
            dispatch(setTheme("light"));
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