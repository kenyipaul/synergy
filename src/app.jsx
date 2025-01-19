import Axios from "axios"

import { useContext, useEffect } from "react"
import Navbar from "./layout/Navbar"
import { Outlet } from "react-router-dom"
import { authRoute } from "./routes/routes"
import { useSelector, useDispatch } from "react-redux"
import { setAuthorized, setUser  } from "./store/states/authorizedState"
import { setTheme } from "./store/states/themeState"
import SocketProvider, { useSocket } from "./providers/socketProvider"


// export default function App() {
//     return (
//         <SocketProvider>
//             <Root />
//         </SocketProvider>
//     )
// }


export default function App() {

    const dispatch = useDispatch();
    const themeState = useSelector(store => store.themeState);
    const updaterState = useSelector(store => store.updaterState)
    const {socket, isConnected} = useSocket();

    useEffect(() => {

        if (isConnected) {

            const token = sessionStorage.getItem("token")
            const user = sessionStorage.getItem("user")
            
            if (token && user) {
                socket.emit("auth/user", token)
                socket.on("auth/user/response", response => {
                    if (response.error) {
                        alert(response.msg)
                        sessionStorage.removeItem("token")
                        sessionStorage.removeItem("user")
                    } else {
                        dispatch(setAuthorized(true))
                        dispatch(setUser(response.data))
                    }
                })
            }

        }


        const theme = localStorage.getItem("theme")

        if (theme) {
            dispatch(setTheme(theme));
        } else {
            dispatch(setTheme("light"));
        }

    }, [updaterState, socket])

    return (
        <div id="app" className={themeState == "dark" ? "dark" : "light"}>
            <Navbar />
            <div id="main">
                <Outlet />
            </div>
        </div>
    )
}