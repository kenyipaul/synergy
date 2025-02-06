import Axios from "axios"
import { useEffect, useRef, useState } from "react";
import Footer from "../layout/Footer";
import EventCard from "../modules/EventCard";
import { BackendHost } from "../routes/routes";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setUser as updateUser, setAuthorized } from "../store/states/authorizedState"
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import PostsPage from "./components/profile_components/posts_page";
import { useSocket } from "../providers/socketProvider";
import {Backdrop} from "@mui/material";
import Overview from "./components/profile_components/overview.jsx";
import Communities from "./components/profile_components/communities.jsx";
import ProfileSettings from "./components/profile_components/profile_settings.jsx";

export default function ProfilePage() {

    const [currentTab, setCurrentTag] = useState(0);
    const authorizedState = useSelector(store => store.authorizedState);
    const [user, setUser] = useState(authorizedState.user)

    useEffect(() => {
        setUser(authorizedState.user)
    }, [authorizedState])

    return (
        <motion.div initial={{ scale: 0, opacity: 0, }} whileInView={{ scale: 1, opacity: 1, }} transition={{ duration: .5 }} id="profile-page">
            <div className="header">
                <section>
                    <div className="profile">
                        <div className="image" style={{
                            backgroundImage: `url(${BackendHost}/${user && user.image})`
                        }}></div>
                        <div>
                            <h1>{user&&user.firstName} {user&&user.lastName}</h1>
                            <p>@{user&&user.username}</p>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="buttons">
                        <button onClick={() => setCurrentTag(0) } className={currentTab === 0 ? "active" : ""} >Overview</button>
                        <button onClick={() => setCurrentTag(1) } className={currentTab === 1 ? "active" : ""} >Posts</button>
                         {/*<button onClick={() => setCurrentTag(2) } className={currentTab == 2 ? "active" : ""} >Communities</button>*/}
                        <button onClick={() => setCurrentTag(3) } className={currentTab === 3 ? "active" : ""} >Edit Profile</button>
                    </div>
                </section>
            </div>
            <div className="main">

                {
                    currentTab === 0 ? <Overview /> :
                    currentTab === 1 ? <PostsPage /> :
                    currentTab === 2 ? <Communities /> : <ProfileSettings />
                }

            </div>
        </motion.div>
    )
}


















