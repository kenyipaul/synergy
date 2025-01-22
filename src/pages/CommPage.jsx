import { AnimatePresence, motion } from "framer-motion"
import { Outlet } from "react-router-dom";

import Footer from "../layout/Footer";
import React, { useState, useEffect } from "react";
import CommCreator from "../creators/commCreator";
import PostCreator from "../creators/postCreator";
import { useSocket } from "../providers/socketProvider"

export const CommFormContext = React.createContext(null);
export const PostCreatorContext = React.createContext(null);
export const CommunitiesContext = React.createContext(null)

export default function CommPage() {

    const { socket, isConnected } = useSocket()
    const [communities, setCommunities] = useState([]);
    const [commFormState, setCommFormState] = useState(false);
    const [postCreatorState, setPostCreatorState] = useState({
        id: null,
        state: false,
    });

    useEffect(() => {
        if (isConnected) {
            socket.emit("/fetch/communities")
            socket.on("/fetch/communities/response", (response) => {
                if (response.error) {
                    alert(response.msg)
                } else {
                    setCommunities(response.data)
                }
            })
        }
    }, [socket])

    return (
        <PostCreatorContext.Provider value={[postCreatorState, setPostCreatorState]}>
        <CommFormContext.Provider value={[commFormState, setCommFormState]}>
        <CommunitiesContext.Provider value={[communities, setCommunities]}>

                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: .5 }} id="community-page">
                    <Outlet />
                    <Footer />
                    <AnimatePresence>
                        { commFormState ? <CommCreator /> : null }
                    </AnimatePresence>
                    { postCreatorState.state ? <PostCreator /> : <></> }
                </motion.div>

        </CommunitiesContext.Provider>
        </CommFormContext.Provider>
        </PostCreatorContext.Provider>
    )
}



