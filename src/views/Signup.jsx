import Axios from "axios"
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setLoginState } from "../store/states/loginState";
import { setSignupState } from "../store/states/signupState";
import { useRef } from "react";
import { signupRoute } from "../routes/routes";

export default function Signup() {

    const dispatch = useDispatch();

    const loginForm = () => {
        dispatch(setLoginState(true))
        dispatch(setSignupState(false))
    }

    const usernameRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const signup = () => {
        const username = usernameRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (username && firstName && lastName && email && password) {
            
            Axios({
                method: 'POST',
                url: signupRoute,
                data: { username, firstName, lastName, email, password }
            }).then((response) => {
                if (response.data.acknowledged) {
                    if (confirm("Signup was successful, would you like to login?")) {
                        loginForm();
                    }
                }
            }).catch((error) => {
                if (error.response.data.msg)
                    alert(error.response.data.msg)
            })

        } else {
            alert("Please fill in the form")
        }
    }

    return (
        <div id="form-container">

            <svg onClick={() => dispatch(setSignupState(false))} className="closeBtn" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>

            <motion.div 
                initial={{
                    scale: 1.5,
                    opacity: 0,
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
                    <h1>Welcome!</h1>
                    <h2>Let's create your account</h2>
                </div>

                <div className="input-area">
                    <label htmlFor="name">Username</label>
                    <input type="text" name="name" id="name" ref={usernameRef} />
                </div>

                <div className="name-area">
                    <div className="input-area">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" name="firstName" id="firstName" ref={firstNameRef} />
                    </div>
                    <div className="input-area">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lastName" id="lastName" ref={lastNameRef} />
                    </div>
                </div>

                <div className="input-area">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" ref={emailRef} />
                </div>

                <div className="input-area">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" ref={passwordRef} />
                </div>

                <p>By signup you agree to our terms of service and privacy policy </p>

                <button onClick={signup}>Sign Up</button>

                <div className="option">
                    <p>Already have an account?</p>
                    <p onClick={loginForm} className="link">login here</p>
                </div>


            </motion.div>

        </div>
    )
}