<<<<<<< HEAD
=======
// import { useEffect } from "react"
// import { io } from "socket.io-client"
>>>>>>> b293a4d (Switched backend url to server url)
// export const BackendHost = "http://localhost:3303"
export const BackendHost = "https://synergy-backend-u63k.onrender.com"

export const loginRoute = `${BackendHost}/api/login/`
export const signupRoute = `${BackendHost}/api/signup/`
export const authRoute = `${BackendHost}/api/auth/`
export const eventRoute = `${BackendHost}/api/event/`
export const eventsRoute = `${BackendHost}/api/events/`
export const communityRoute = `${BackendHost}/api/community`
export const postRoute = `${BackendHost}/api/post`

// const socket = useRef();

// useEffect(() => {
//     socket.current = io();
// }, [])

// const login = () => {

//     socket.current.emit("addUser", id)

// }