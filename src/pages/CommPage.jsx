import React, { useContext, useState } from "react";
import { motion } from "framer-motion"
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import CommCreator from "../creators/commCreator";
import { useSelector } from "react-redux";


export const CommFormContext = React.createContext(null);

export default function CommPage() {

    const [comFormState, setComFormState] = useState(false);

    return (
        <CommFormContext.Provider value={[comFormState, setComFormState]}>
        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: .5 }} id="community-page">
            <Outlet />
            <Footer />
            { comFormState ? <CommCreator /> : <></> }
        </motion.div>
        </CommFormContext.Provider>
    )
}


export function CommunityProfile() {
    return (
        <div className="community-profile">

            <div className="community-profile-header">
                <div className="community-profile-banner">
                    <div className="cover"></div>
                    
                    <section>
                        <div className="profile">
                            <div className="image"></div>
                            <div>
                                <h1>BurgerHeads</h1>
                                <p>144k members</p>
                            </div>
                        </div>

                        <div className="buttons">
                            <button>Create Post</button>
                            <button>Join</button>
                        </div>
                    </section>
                </div>
                <div className="navigation-tabs">
                    <button>Feed</button>
                    <button>About</button>
                </div>
            </div>

            <div className="view feed-view">

                <Post />
                <Post />
                <Post />
                <Post />
                <Post />

            </div>

        </div>
    )
}

function Post() {
    return (
        <div className="post">
            <div className="post-header">
                <div className="post-header-image"></div>
                <div>
                    <h1>John Doe</h1>
                    <p>Posted 2 hours ago</p>
                </div>
            </div>
            <div className="post-content">
                <h1>How are you guys?</h1>
                <p>Hey guys, I'm new here. I'm a software engineer and I'm looking for a job. Can anyone help me out?</p>
            </div>
            <div className="post-footer">
                <button>
                    <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Arrow / Arrow_Up_SM"> <path id="Vector" d="M12 17V7M12 7L8 11M12 7L16 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                    <p>2k</p>
                    <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Arrow / Arrow_Down_SM"> <path id="Vector" d="M12 7V17M12 17L16 13M12 17L8 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                </button>
                <button>
                <svg width="1.5rem" height="1.5rem" fill="currentColor" viewBox="0 0 1024 1024" t="1569682881658" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8185" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style type="text/css"></style></defs><path d="M573 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40zM293 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40z" p-id="8186"></path><path d="M894 345c-48.1-66-115.3-110.1-189-130v0.1c-17.1-19-36.4-36.5-58-52.1-163.7-119-393.5-82.7-513 81-96.3 133-92.2 311.9 6 439l0.8 132.6c0 3.2 0.5 6.4 1.5 9.4 5.3 16.9 23.3 26.2 40.1 20.9L309 806c33.5 11.9 68.1 18.7 102.5 20.6l-0.5 0.4c89.1 64.9 205.9 84.4 313 49l127.1 41.4c3.2 1 6.5 1.6 9.9 1.6 17.7 0 32-14.3 32-32V753c88.1-119.6 90.4-284.9 1-408zM323 735l-12-5-99 31-1-104-8-9c-84.6-103.2-90.2-251.9-11-361 96.4-132.2 281.2-161.4 413-66 132.2 96.1 161.5 280.6 66 412-80.1 109.9-223.5 150.5-348 102z m505-17l-8 10 1 104-98-33-12 5c-56 20.8-115.7 22.5-171 7l-0.2-0.1C613.7 788.2 680.7 742.2 729 676c76.4-105.3 88.8-237.6 44.4-350.4l0.6 0.4c23 16.5 44.1 37.1 62 62 72.6 99.6 68.5 235.2-8 330z" p-id="8187"></path><path d="M433 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40z" p-id="8188"></path></g></svg>
                <p>24k</p>
                </button>
                <button>
                <svg width="2rem" height="2rem" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.734 15.8974L19.22 12.1374C19.3971 11.9927 19.4998 11.7761 19.4998 11.5474C19.4998 11.3187 19.3971 11.1022 19.22 10.9574L14.734 7.19743C14.4947 6.9929 14.1598 6.94275 13.8711 7.06826C13.5824 7.19377 13.3906 7.47295 13.377 7.78743V9.27043C7.079 8.17943 5.5 13.8154 5.5 16.9974C6.961 14.5734 10.747 10.1794 13.377 13.8154V15.3024C13.3888 15.6178 13.5799 15.8987 13.8689 16.0254C14.158 16.1521 14.494 16.1024 14.734 15.8974Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                <p>Share</p>
                </button>
            </div>
        </div>
    )
}



export function CommunityPage() {

    const navigate = useNavigate();
    const authorizedState = useSelector(store => store.authorizedState)
    const [comFormState, setComFormState] = useContext(CommFormContext);

    return (
        <div className="community-view-content">
        <div className="community-banner">
            <div className="container">
                <div className="content">
                    <h1>The Community Hub: Learn, Share and Grow</h1>
                    <p>The Community Hub: Where learning, sharing, and growth are at the heart of everything we do.</p>
                    <button onClick={() => {
                        authorizedState.authorized ? setComFormState(true) : navigate("/login")
                    }}>Create Your Community</button>
                </div>
            </div>
        </div>

        <div className="search-area">
            <div className="input-area">
                <svg width="2rem" height="2rem" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M5.5 11.1455C5.49956 8.21437 7.56975 5.69108 10.4445 5.11883C13.3193 4.54659 16.198 6.08477 17.32 8.79267C18.4421 11.5006 17.495 14.624 15.058 16.2528C12.621 17.8815 9.37287 17.562 7.3 15.4895C6.14763 14.3376 5.50014 12.775 5.5 11.1455Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M15.989 15.4905L19.5 19.0015" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                <input type="text" name="search" id="search" placeholder="Search for communities" />
            </div>
        </div>

        <div className="main">
            <div className="title-bar">
                <h1 className="title">Explore communities</h1>
                {/* <button>Create Your Community</button> */}
            </div>

            <div className="community-container">
                <div className="top-bar">
                    <h1>Foods & Drinks</h1>
                    <button>View All</button>
                </div>
                <div className="community-list">
                    <Community />
                    <Community />
                    <Community />
                    <Community />
                    <Community />
                    <Community />
                    <Community />
                    <Community />
                </div>
            </div>

            <div className="community-container">
                <div className="top-bar">
                    <h1>Programming</h1>
                    <button>View All</button>
                </div>
                <div className="community-list">
                    <Community />
                    <Community />
                    <Community />
                    <Community />
                    <Community />
                    <Community />
                    <Community />
                    <Community />
                </div>
            </div>

        </div>
    </div>
    )
}


function Community() {
    return (
        <div className="community">
            <div className="header">
                <div className="profile">
                    <div className="image"></div>
                    <h1>BurgerHeads</h1>
                </div>
                <button>Join</button>
            </div>
            <div className="main">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, soluta? Similique odio obcaecati maiores illo.</p>
            </div>
            <div className="footer">
                <p>12k members</p>
            </div>
        </div>
    )
}


