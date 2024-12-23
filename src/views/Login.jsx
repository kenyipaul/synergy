import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setLoginState } from "../store/states/loginState";
import { setSignupState } from "../store/states/signupState";

export default function Login() {

    const dispatch = useDispatch();

    const registerForm = () => {
        dispatch(setSignupState(true))
        dispatch(setLoginState(false))
    }

    return (
        <div id="form-container">

            <svg onClick={() => dispatch(setLoginState(false))} className="closeBtn" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>

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
                    <input type="email" name="email" id="email" />
                </div>

                <div className="input-area">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>

                <a href="#">I forgot my password?</a>

                <button>Log In</button>

                <div className="option">
                    <p>Don't have an account?</p>
                    <p onClick={registerForm} className="link">Register</p>
                </div>

            </motion.div>

        </div>
    )
}