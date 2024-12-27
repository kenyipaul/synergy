import { motion } from "framer-motion"
import Footer from "../modules/Footer"
import { useDispatch } from "react-redux";
import { setComCreatorState } from "../store/states/comCreatorState"

export default function CommunityView() {

    const dispatch = useDispatch();

    return (
        <motion.div 
            initial={{
                scale: 2,
                opacity: 0
            }}
            whileInView={{
                scale: 1,
                opacity: 1
            }}
            transition={{
                duration: .5
            }}
        id="community-view">

            <div className="community-banner">
                <div className="container">
                    <div className="content">
                        <h1>The Community Hub: Learn, Share and Grow</h1>
                        <p>The Community Hub: Where learning, sharing, and growth are at the heart of everything we do.</p>
                        <button onClick={() => dispatch(setComCreatorState(true))}>Create Your Community</button>
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
                <h1 className="title">Explore communities</h1>

                <div className="community-container">
                    <div className="top-bar">
                        <h1>Foods & Drinks</h1>
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

            <Footer />
        </motion.div>
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