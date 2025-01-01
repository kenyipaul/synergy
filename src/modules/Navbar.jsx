import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { setNavbarState } from "../store/states/navbarState";
import { setTheme } from "../store/states/themeState";
import { setLoginState } from "../store/states/loginState";
import { setSignupState } from "../store/states/signupState";
import { useEffect, useState } from "react";

export default function Navbar() {

    const location = useLocation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [user, setUser] = useState({});
    const [profileMenuState, setProfileMenuState] = useState(false)

    const userState = useSelector(store => store.userState);
    const themeState = useSelector(store => store.themeState);
    const navbarState = useSelector(store => store.navbarState);

    const route = (url) => {
        navigate(url)
        dispatch(setNavbarState(false));
    }

    const loginForm = () => {
        dispatch(setLoginState(true));
        dispatch(setSignupState(false));
        setProfileMenuState(false)
    }
    const signupForm = () => {
        dispatch(setSignupState(true));
        dispatch(setLoginState(false));
        setProfileMenuState(false)
    }

    useEffect(() => {
        if (Object.keys(userState).length > 0) {
            setUser(userState)
        }
    }, [userState])

    return (
        <motion.div 
            initial={{
                translateY: -55
            }}
            whileInView={{
                translateY: 0
            }}
            transition={{
                duration: .3,
                ease: "backInOut"
            }}
        id="navbar">

            <section>
                <svg onClick={() => dispatch(setNavbarState(!navbarState))} width="2.5rem" height="2.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Menu_Alt_05"> <path id="Vector" d="M5 17H13M5 12H19M11 7H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                <h1 onClick={() => navigate("/")}>Synergy</h1>
                <ul className={navbarState ? "active" : ""}>
                    <li className={location.pathname == "/" ? "active" : ""} onClick={() => route("/") }>Home</li>
                    <li className={location.pathname == "/events" ? "active" : ""} onClick={() => route("/events") }>Events</li>
                    <li className={location.pathname == "/jobs" ? "active" : ""} onClick={() => route("/jobs") }>Job Board</li>
                    <li className={location.pathname == "/communities" ? "active" : ""} onClick={() => route("/communities") }>Community</li>
                    <li className={location.pathname == "/about" ? "active" : ""} onClick={() => route("/about") }>About Us</li>

                    <svg onClick={() => dispatch(setNavbarState(false))} className="closeBtn" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>                </ul>
            </section>

            <section>
                

                { Object.keys(user).length > 0 ?

                    <div className="auth-user">
                        <div className="user-info">
                            <div className="profile-image"></div>
                            <h1>{`${user.firstName} ${user.lastName}`}</h1>
                        </div>
                        <div className="auth-menu">
                            <ul>
                                <li>Edit Profile</li>
                                <li>Bookmarks</li>
                                <li>My Community</li>
                                <li>Profile Settings</li>
                                <li></li>
                                <li>Log Out</li>
                            </ul>
                        </div>
                    </div> 
                    :
                    <>                
                        <div className={profileMenuState ? "buttons active" : "buttons" }>
                            <button onClick={loginForm}>Log In</button>
                            <button onClick={signupForm}>Register</button>
                        </div>
                        <svg onClick={() => setProfileMenuState(!profileMenuState)} className="profile" width="2rem" height="2rem" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -2159.000000)" fill="currentColor"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M134,2008.99998 C131.783496,2008.99998 129.980955,2007.20598 129.980955,2004.99998 C129.980955,2002.79398 131.783496,2000.99998 134,2000.99998 C136.216504,2000.99998 138.019045,2002.79398 138.019045,2004.99998 C138.019045,2007.20598 136.216504,2008.99998 134,2008.99998 M137.775893,2009.67298 C139.370449,2008.39598 140.299854,2006.33098 139.958235,2004.06998 C139.561354,2001.44698 137.368965,1999.34798 134.722423,1999.04198 C131.070116,1998.61898 127.971432,2001.44898 127.971432,2004.99998 C127.971432,2006.88998 128.851603,2008.57398 130.224107,2009.67298 C126.852128,2010.93398 124.390463,2013.89498 124.004634,2017.89098 C123.948368,2018.48198 124.411563,2018.99998 125.008391,2018.99998 C125.519814,2018.99998 125.955881,2018.61598 126.001095,2018.10898 C126.404004,2013.64598 129.837274,2010.99998 134,2010.99998 C138.162726,2010.99998 141.595996,2013.64598 141.998905,2018.10898 C142.044119,2018.61598 142.480186,2018.99998 142.991609,2018.99998 C143.588437,2018.99998 144.051632,2018.48198 143.995366,2017.89098 C143.609537,2013.89498 141.147872,2010.93398 137.775893,2009.67298" id="profile-[#1341]"> </path> </g> </g> </g> </svg>
                    </>
                }

                { themeState == "dark" ? <svg onClick={() => dispatch(setTheme("light"))} width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5"></circle> <path d="M12 2V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M12 21V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M22 12L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M3 12L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M19.0708 4.92969L18.678 5.32252" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M5.32178 18.6777L4.92894 19.0706" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M19.0708 19.0703L18.678 18.6775" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M5.32178 5.32227L4.92894 4.92943" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg> :
                <svg onClick={() => dispatch(setTheme("dark"))} width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.9001 2.30719C19.7392 1.8976 19.1616 1.8976 19.0007 2.30719L18.5703 3.40247C18.5212 3.52752 18.4226 3.62651 18.298 3.67583L17.2067 4.1078C16.7986 4.26934 16.7986 4.849 17.2067 5.01054L18.298 5.44252C18.4226 5.49184 18.5212 5.59082 18.5703 5.71587L19.0007 6.81115C19.1616 7.22074 19.7392 7.22074 19.9001 6.81116L20.3305 5.71587C20.3796 5.59082 20.4782 5.49184 20.6028 5.44252L21.6941 5.01054C22.1022 4.849 22.1022 4.26934 21.6941 4.1078L20.6028 3.67583C20.4782 3.62651 20.3796 3.52752 20.3305 3.40247L19.9001 2.30719Z" stroke="currentColor"></path> <path d="M16.0328 8.12967C15.8718 7.72009 15.2943 7.72009 15.1333 8.12967L14.9764 8.52902C14.9273 8.65407 14.8287 8.75305 14.7041 8.80237L14.3062 8.95987C13.8981 9.12141 13.8981 9.70107 14.3062 9.86261L14.7041 10.0201C14.8287 10.0694 14.9273 10.1684 14.9764 10.2935L15.1333 10.6928C15.2943 11.1024 15.8718 11.1024 16.0328 10.6928L16.1897 10.2935C16.2388 10.1684 16.3374 10.0694 16.462 10.0201L16.8599 9.86261C17.268 9.70107 17.268 9.12141 16.8599 8.95987L16.462 8.80237C16.3374 8.75305 16.2388 8.65407 16.1897 8.52902L16.0328 8.12967Z" stroke="currentColor"></path> <path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447Z" fill="currentColor"></path> </g></svg> }
            </section>

        </motion.div>        
    )
}