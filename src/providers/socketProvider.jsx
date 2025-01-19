import { io } from "socket.io-client";
import { BackendHost } from "../routes/routes";
import React, { useEffect, useRef, useContext, useState } from "react"

const SocketContext = React.createContext(null)

export default function SocketProvider({children}) {

    const socketRef = useRef();
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = io(BackendHost)

            socketRef.current.on("connect", () => setIsConnected(true))
            socketRef.current.on("connect_error", (error) => {
                console.error("Socket connection error: ", error)
            })
            socketRef.current.on("disconnect", () => setIsConnected(false))
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        }
    }, [])

    return (
        <SocketContext.Provider value={{socket: socketRef.current, isConnected}}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    return useContext(SocketContext)
}