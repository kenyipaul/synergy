import { motion } from "framer-motion"
import { Outlet } from "react-router-dom";

import Footer from "../layout/Footer";
import React, { useState } from "react";
import CommCreator from "../creators/commCreator";
import PostCreator from "../creators/postCreator";


export const CommFormContext = React.createContext(null);
export const PostCreatorContext = React.createContext(null);

export default function CommPage() {

    const [commFormState, setCommFormState] = useState(false);
    const [postCreatorState, setPostCreatorState] = useState({
        id: null,
        state: false,
    });

    return (
        <PostCreatorContext.Provider value={[postCreatorState, setPostCreatorState]}>
        <CommFormContext.Provider value={[commFormState, setCommFormState]}>
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: .5 }} id="community-page">
                <Outlet />
                <Footer />
                { commFormState ? <CommCreator /> : <></> }
                { postCreatorState.state ? <PostCreator /> : <></> }
            </motion.div>
        </CommFormContext.Provider>
        </PostCreatorContext.Provider>
    )
}