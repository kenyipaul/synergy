import Axios from "axios"
import { useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { loginRoute } from "../routes/routes";
import { useNavigate } from "react-router-dom";
import { setAuthorized, setUser } from "../store/states/authorizedState";

export default function LoginPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailRef = useRef();
    const passwordRef = useRef();

    const login = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (email && password) {

            Axios({
                method: 'POST',
                url: loginRoute,
                data: { 
                    email,
                    password
                },
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                dispatch(setAuthorized(true));
                dispatch(setUser(response.data.user));
                sessionStorage.setItem("token", response.data.token)
                sessionStorage.setItem("user", JSON.stringify(response.data.user))
                navigate("/")
            }).catch((err) => {
                if (err.response.status == 401)
                    alert("Incorrect username or password")
            })

        } else {
            alert("Please fill in the form")
        }
    }

    return (
        <div id="form-container">

            <svg onClick={() => navigate("/")} className="closeBtn" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>

            <motion.div 
                initial={{
                    scale: 1.5,
                    opacity: 0
                }}
                whileInView={{
                    scale: 1,
                    opacity: 1
                }}
                transition={{
                    duration: .5,
                    ease: "backInOut"
                }}
            className="form">
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

                <a href="#">I forgot my password?</a>

                <button onClick={login}>Log In</button>

                <div className="option">
                    <p>Don't have an account?</p>
                    <p onClick={() => navigate("/signup")} className="link">Register</p>
                </div>

            </motion.div>

        </div>
    )
}
