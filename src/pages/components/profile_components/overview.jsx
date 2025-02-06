import "./styles/overview.scss";
import {useDispatch, useSelector} from "react-redux";
import {AnimatePresence, motion} from "framer-motion";
import {Alert, Backdrop, Snackbar} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {tailChase} from "ldrs";
import {setUser as changeUser} from "../../../store/states/authorizedState.js";
import {useSocket} from "../../../providers/socketProvider.jsx";

export default function Overview() {

    return (
        <motion.div initial={{ translateY: 100 }} whileInView={{ translateY: 0 }} transition={{ duration: .3 }} className="overview-tab tab">
            <BioContainer />
            <ProfileContainer />
        </motion.div>
    )
}


function BioContainer() {

    const [updater, setUpdater] = useState(false);
    const [loading, setLoading] = useState(false);
    const authorizedState = useSelector(store => store.authorizedState)


    const [alertState, setAlertState] = useState({
        state: false,
        severity: "info",
        msg: ""
    })


    return (
        <>

            <Snackbar open={alertState.state} onClose={() => setAlertState({state: false, severity: "info", msg: ""})} autoHideDuration={5000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity={alertState.severity}>{alertState.msg}</Alert>
            </Snackbar>

            <div className="info-card">
                <div className="top-bar">
                    <h1>Biography</h1>
                    <svg onClick={() => setUpdater(true)} viewBox="0 0 24 24" width="2rem" height="2rem" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.9445 9.1875L14.9445 5.1875M18.9445 9.1875L13.946 14.1859C13.2873 14.8446 12.4878 15.3646 11.5699 15.5229C10.6431 15.6828 9.49294 15.736 8.94444 15.1875C8.39595 14.639 8.44915 13.4888 8.609 12.562C8.76731 11.6441 9.28735 10.8446 9.946 10.1859L14.9445 5.1875M18.9445 9.1875C18.9445 9.1875 21.9444 6.1875 19.9444 4.1875C17.9444 2.1875 14.9445 5.1875 14.9445 5.1875M20.5 12C20.5 18.5 18.5 20.5 12 20.5C5.5 20.5 3.5 18.5 3.5 12C3.5 5.5 5.5 3.5 12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </div>
                <div className="body">
                    <p>{authorizedState.user && authorizedState.user.bio ? authorizedState.user.bio : "Not set"}</p>
                </div>
            </div>

            <AnimatePresence>
                { updater ? <BioUpdater loading={loading} setAlertState={(e) => setAlertState(e)} setUpdater={(e) => setUpdater(e)} setLoading={(e) => setLoading(e)} />  : null }
            </AnimatePresence>

        </>
    )
}


// BIOGRAPHY UPDATER

function BioUpdater({ loading, setUpdater, setLoading, setAlertState }) {

    const bioRef = useRef(null);
    const authorizedState = useSelector(store => store.authorizedState)
    const {socket, isConnected} = useSocket()
    const dispatch = useDispatch()


    useEffect(() => {
        bioRef.current.value = authorizedState.user.bio
    }, []);

    useEffect(() => {
        tailChase.register()
    }, []);

    const updateBio = () => {
        const bio = bioRef.current.value;
        const userId =  authorizedState.user.id;

        if (!bio) return setAlertState({ state: true, severity: "warning", msg: "Please fill out the form" })

        if (isConnected) {
            setLoading(true);

            socket.emit("user/update/bio", { userId, bio })
            socket.on("user/update/bio/response", response => {
                if (response.error) {
                    setAlertState({ state: true, severity: "error", msg: response.msg })
                } else {
                    dispatch(changeUser(response.data))
                    setAlertState({ state: true, severity: "success", msg: response.msg })
                }
                setLoading(false)
                setUpdater(false)
            })
        } else {
            setAlertState({ state: true, severity: "error", msg: "Something went wrong when connecting to server" })
        }
    }

    return (
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 2, opacity: 0 }} className="bio-updater updater">
            <div className="content">
                <svg onClick={() => setUpdater(false)} className="closeBtn" width="1.6rem" height="1.6rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                <h1>Update Bio</h1>
                <textarea ref={bioRef} name="bio" id="bio" placeholder="Write bio here..."></textarea>
                { loading ? <button>Updating...</button> : <button onClick={updateBio}>Update Bio</button> }
            </div>

            <Backdrop open={loading}><l-tail-chase size="40" speed="1.75" color="white"></l-tail-chase></Backdrop>
        </motion.div>
    )
}





// ACCOUNT PROFILE CONTAINER

function ProfileContainer() {

    const [updater, setUpdater] = useState(false)
    const [loading, setLoading] = useState(false);
    const authorizedState = useSelector(store => store.authorizedState)



    useEffect(() => {
        tailChase.register()
    }, []);

    useEffect(() => {
        // setUser(authorizedState.user)
    }, [authorizedState])

    return (
        <>
            <div className="info-card">
                <div className="top-bar">
                    <h1>Profile Details</h1>
                    <svg onClick={() => setUpdater(true)} viewBox="0 0 24 24" width="2rem" height="2rem" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.9445 9.1875L14.9445 5.1875M18.9445 9.1875L13.946 14.1859C13.2873 14.8446 12.4878 15.3646 11.5699 15.5229C10.6431 15.6828 9.49294 15.736 8.94444 15.1875C8.39595 14.639 8.44915 13.4888 8.609 12.562C8.76731 11.6441 9.28735 10.8446 9.946 10.1859L14.9445 5.1875M18.9445 9.1875C18.9445 9.1875 21.9444 6.1875 19.9444 4.1875C17.9444 2.1875 14.9445 5.1875 14.9445 5.1875M20.5 12C20.5 18.5 18.5 20.5 12 20.5C5.5 20.5 3.5 18.5 3.5 12C3.5 5.5 5.5 3.5 12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </div>
                <div className="body">
                    {
                        authorizedState && authorizedState.authorized ?
                        <ul>
                            <li><b>Username:</b>{authorizedState.user && authorizedState.user.username}</li>
                            <li><b>First Name:</b>{authorizedState.user && authorizedState.user.firstName}</li>
                            <li><b>Last Name:</b>{authorizedState.user && authorizedState.user.lastName}</li>
                            <li><b>Email Address:</b>{authorizedState.user && authorizedState.user.email}</li>
                        </ul>: <></>
                    }
                </div>
            </div>

            <AnimatePresence>
                { updater ? <ProfileUpdater loading={loading} setLoading={(e) => setLoading(e)} setUpdater={(e) => setUpdater(e)} /> : null }
            </AnimatePresence>
        </>
    )
}


// PROFILE UPDATER
// eslint-disable-next-line react/prop-types
function ProfileUpdater({loading, setUpdater, setLoading}) {

    const authorizedState = useSelector(store => store.authorizedState)
    const [user, setUser] = useState(authorizedState.user);
    const {socket, isConnected} = useSocket()
    const dispatch = useDispatch()

    const [alertState, setAlertState] = useState({
        state: false,
        severity: "info",
        msg: ""
    })

    const emailRef = useRef(null)
    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const usernameRef = useRef(null)

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            usernameRef.current.value = user.username
            firstNameRef.current.value = user.firstName
            lastNameRef.current.value = user.lastName
            emailRef.current.value = user.email
        }
    }, [user])


    const submit = () => {
        setLoading(true)
        const id = user.id;
        const email = emailRef.current.value;
        const lastName = lastNameRef.current.value;
        const firstName = firstNameRef.current.value;
        const username = usernameRef.current.value;

        socket.emit("user/update/profile", { id, email, username, lastName, firstName })
        socket.on("user/update/profile/response", response => {
            if (response.error) {
                setAlertState({ state: true, severity: "error", msg: response.msg })
            } else {
                dispatch(changeUser(response.data))
                setAlertState({ state: true, severity: "success", msg: response.msg })
            }
            setLoading(false)
            setUpdater(false)
        })
    }


    return (
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 2, opacity: 0 }} className="profile-updater updater">

            <Snackbar open={alertState.state} onClose={() => setAlertState({state: false, severity: "info", msg: ""})} autoHideDuration={5000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity={alertState.severity}>{alertState.msg}</Alert>
            </Snackbar>

            <div className="content">
                <svg onClick={() => setUpdater(false)} className="closeBtn" width="1.6rem" height="1.6rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                <h1>Update Profile</h1>

                <div className="input-area">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" ref={usernameRef} />
                </div>

                <div className="name-area">

                    <div className="input-area">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" ref={firstNameRef} />
                    </div>

                    <div className="input-area">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" ref={lastNameRef} />
                    </div>

                </div>

                <div className="input-area">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" ref={emailRef} />
                </div>

                {loading ? <button>Updating...</button> : <button onClick={submit}>Update Profile</button>}
                <Backdrop open={loading}><l-tail-chase size="40" speed="1.75" color="white"></l-tail-chase></Backdrop>
            </div>
        </motion.div>
    )
}