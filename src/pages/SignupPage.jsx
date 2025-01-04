import Axios from "axios"
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signupRoute } from "../routes/routes";
import { createContext, useContext, useRef, useState } from "react";

const StageContext = createContext(null);

export default function SignupPage() {

    const navigate = useNavigate();
    const [stage, setStage] = useState(1);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light"
    })
    
    return (
        <StageContext.Provider value={[stage, setStage]}>
        <div id="form-container" className={theme == "dark" && theme}>

            <svg onClick={() => navigate("/")} className="closeBtn" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>

            <motion.div initial={{ scale: 1.5, opacity: 0, }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: .5, ease: "backInOut" }} className="form">            
                { stage == 1 ? <Stage1 /> : stage == 2 ? <Stage3 /> : null }
            </motion.div>
        </div>
        </StageContext.Provider>
    )
}



function Stage1() {

    const emailRef = useRef();
    const usernameRef = useRef();
    const lastNameRef = useRef();
    const firstNameRef = useRef();

    const navigate = useNavigate();
    const [stage, setStage] = useContext(StageContext);

    const proceed = () => {
        const email = emailRef.current.value;
        const lastName = lastNameRef.current.value;
        const username = usernameRef.current.value;
        const firstName = firstNameRef.current.value;

        const user = {
            email,
            username,
            firstName,
            lastName
        }

        sessionStorage.setItem("user", JSON.stringify(user))

        setStage(stage + 1)
    }

    return (
        <>
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

            <p>By signup you agree to our terms of service and privacy policy </p>
            <button onClick={proceed}>Proceed</button>

            <div className="option">
                <p>Already have an account?</p>
                <p onClick={() => navigate("/login")} className="link">login here</p>
            </div>
        </>
    )
}


// function Stage2() {

//     const navigate = useNavigate();
//     const [stage, setStage] = useContext(StageContext);

//     const imageRef = useRef();
//     const genderRef = useRef();

//     const proceed = () => {
//         const image = imageRef.current.files[0];
//         const gender = genderRef.current.value;

//         const fileReader = new FileReader();
//         const user = JSON.parse(sessionStorage.getItem("user"))

//         if (image) {
//             fileReader.onload = (e) => {
//                 const bufferImage = fileReader.result

//                 user.gender = gender;
//                 user.image = bufferImage;
//                 sessionStorage.setItem("user", JSON.stringify(user))
                
//                 setStage(stage + 1)
//             }
//             fileReader.readAsDataURL(image);
//         } else {
//             user.gender = gender;
//             sessionStorage.setItem("user", JSON.stringify(user))
//             setStage(stage + 1)
//         }

//     }

//     return (
//         <>

//             <div className="top-bar">
//                 <h1>Account Details</h1>
//                 <h2>All this can be changed later in your profile settings</h2>
//             </div>

//             <div className="input-area">
//                 <label htmlFor="file">Profile Picture</label>
//                 <input type="file" id="profile_image" ref={imageRef} />
//             </div>

//             <div className="input-area">
//                 <label htmlFor="gender">Gender</label>
//                 <select id="gender" ref={genderRef}>
//                     <option value="MALE">Male</option>
//                     <option value="FEMALE">Female</option>
//                 </select>
//             </div>

//             <p>I don't have time for this? <span onClick={() => setStage(stage + 1)}>skip this step</span></p>

//             <div className="buttons">
//                 <button onClick={() => setStage(stage - 1)}><svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>Back</button>
//                 <button onClick={proceed}>Proceed<svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
//             </div>

//         </>
//     )
// }


function Stage3() {

    const navigate = useNavigate();
    const [stage, setStage] = useContext(StageContext);

    const passwordRef = useRef();
    const password2Ref = useRef();

    const register = () => {

        const user = JSON.parse(sessionStorage.getItem("user"))
        if (!user) {
            return setStage(1)
        }

        const password = passwordRef.current.value;
        const password2 = password2Ref.current.value;

        if (password && password2) {
            if (password == password2) {
                user.password = password;

                Axios({
                    method: 'POST',
                    url: signupRoute,
                    data: user
                }).then((response) => {
                    if (response.data.acknowledged) {
                        sessionStorage.removeItem("user")
                        if (confirm("Signup was successful, would you like to login?")) {
                            navigate("/login")
                        }
                    }
                }).catch((error) => {
                    if (error.response.data.msg)
                        alert(error.response.data.msg)
                })
                
            } else {
                alert("Passwords do not match")
            }
        } else {
            alert("Please fill in the form")
        }

    }

    return (
        <>
        
            <div className="top-bar">
                <h1>Set Password</h1>
                {/* <p>Password should have at least one uppercase character, lowercase character, number, special character at should be at least 8 characters long</p> */}
            </div>

            <div className="input-area">
                <label htmlFor="password">Password</label>
                <input ref={passwordRef} type="password" id="password" />
            </div>

            <div className="input-area">
                <label htmlFor="password2">Confirm Password</label>
                <input ref={password2Ref} type="password" id="password2" />
            </div>

            <div className="buttons">
                <button onClick={() => setStage(stage - 1)}><svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>Back</button>
                <button onClick={register}>Register<svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
            </div>

        </>
    )
}