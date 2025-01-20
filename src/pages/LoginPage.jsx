import Axios from "axios"
import { motion } from "framer-motion";
import React, { useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { BackendHost } from "../routes/routes";
import { useNavigate } from "react-router-dom";
import { setAuthorized, setUser } from "../store/states/authorizedState";
import { useSocket } from "../providers/socketProvider";

const StageContext = React.createContext(null)

export default function LoginPage() {

    const navigate = useNavigate();
    const [stage, setStage] = useState(0)
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light"
    })

    const goBack = () => {
        window.history.back()
    }

    return (
        <StageContext.Provider value={[stage, setStage]}>
        <div id="form-container" className={theme == "dark" && theme}>
            <svg onClick={goBack} className="closeBtn" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
            { stage == 0 ? <LoginForm /> : <ForgotPassword /> }
        </div>
        </StageContext.Provider>
    )
}

function LoginForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useContext(StageContext)
    const { socket, isConnected } = useSocket()

    const emailRef = useRef();
    const passwordRef = useRef();

    const login = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        setLoading(true)

        if (email && password) {
            if (isConnected) {
                socket.emit("user/login", {email, password})
                socket.on("user/login/response", response => {
                    dispatch(setAuthorized(true));
                    dispatch(setUser(response.user));
                    sessionStorage.setItem("token", response.token)
                    sessionStorage.setItem("user", JSON.stringify(response.user))
    
                    if (document.referrer == "") {
                        window.history.back()
                    } else {
                        navigate("/")
                    }
                })
            } else {
                alert("Something went wrong when connecting to server")
            }

        } else {
            alert("Please fill in the form")
        }
    }

    return (
        <motion.div initial={{ scale: 1.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: .5, ease: "backInOut" }} className="form">
            <div className="top-bar">
                <h1>Welcome back</h1>
                <h2>Log into your account</h2>
            </div>

            <div className="input-area">
                <label htmlFor="email">Email</label>
                <input ref={emailRef} type="email" name="email" id="email" />
            </div>

            <div className="input-area">
                <label htmlFor="password">Password</label>
                <input ref={passwordRef} type="password" name="password" id="password" />
            </div>

            <p className="link" onClick={() => setStage(stage + 1)}>I forgot my password?</p>

            {
                loading ?
                <button className="processing">Processing...</button>
                : 
                <button onClick={login}>Log In</button>
            }

            <div className="option">
                <p>Don't have an account?</p>
                <p onClick={() => navigate("/signup")} className="link">Register</p>
            </div>

        </motion.div>
    )
}



function ForgotPassword() {

    const emailRef = useRef(null)
    const {socket, isConnected} = useSocket();
    const [stage, setStage] = useContext(StageContext)
    const [loading, setLoading] = useState(false)

    const sendLink = () => {
        setLoading(true)
        if (isConnected) {
            const email = emailRef.current.value;
            if (email !== "") {
                socket.emit("user/recover/password", email)

                socket.on("user/recover/password/response", response => {
                    if (response.error) {
                        alert(response.msg)
                    } else {
                        alert(response.msg)
                    }
                    setLoading(false)
                })
            }
        } else {
            alert("Failed to connect to server")
        }
    }

    return (
        <motion.div initial={{ scale: 1.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: .5, ease: "backInOut" }} className="form">
            
            <div className="topBar">
                <svg onClick={() => setStage(0)} width="1.5rem" height="1.5rem" fill="currentColor" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z"></path></g></svg>
                <h1>Recover you password</h1>
            </div>
            
            <div className="input-area">
                <label htmlFor="email">Email address</label>
                <input ref={emailRef} type="email"  id="email" />
            </div>

            <p><b>Enter the email</b> that you used when you signed up to recover you password. You will receive a <b>password reset link.</b></p>

            { loading ? <button>Processing...</button> : <button onClick={sendLink}>Send link</button> }

        </motion.div>
    )
}