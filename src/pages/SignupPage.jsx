import Axios from "axios"
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BackendHost } from "../routes/routes";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useSocket } from "../providers/socketProvider";

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
                { stage == 1 ? <Stage1 /> : stage == 2 ? <Stage2 /> : <Stage3 /> }
            </motion.div>
        </div>
        </StageContext.Provider>
    )
}



function Stage1() {

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const navigate = useNavigate();
    const [stage, setStage] = useContext(StageContext);

    useEffect(() => {

        let storedUser = sessionStorage.getItem("tmp_user")

        if (storedUser) {
            storedUser = JSON.parse(storedUser)

            setUsername(storedUser.username)
            setFirstName(storedUser.firstName)
            setLastName(storedUser.lastName)
            setEmail(storedUser.email)
        }

    }, [])

    const proceed = () => {
        if (email && username && firstName && lastName) {
            if (firstName.length < 3) return alert("First Name should be at least 3 characters long")
            if (lastName.length < 3) return alert("Last Name should be at least 3 characters long")
            const pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

            if(email.match(pattern)) {
                const user = { email, username, firstName, lastName }
                sessionStorage.setItem("tmp_user", JSON.stringify(user))   
                setStage(stage + 1)
            } else {
                alert("Invalid email address")
            }

        } else {
            alert("Please fill in the form")
        }
    }

    return (
        <>
            <div className="top-bar">
                <h1>Welcome!</h1>
                <h2>Let's create your account</h2>
            </div>

            <div className="input-area">
                <label htmlFor="name">Username</label>
                <input type="text" name="name" maxLength="20" id="name" value={username} onChange={(e) => setUsername(e.target.value.replace(" ", ""))} />
            </div>

            <div className="name-area">
                <div className="input-area">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" maxLength="14" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value.replace(" ", ""))} />
                </div>
                <div className="input-area">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" maxLength="14" value={lastName} onChange={(e) => setLastName(e.target.value.replace(" ", ""))} />
                </div>
            </div>

            <div className="input-area">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value.replace(" ", ""))} />
            </div>

            <p>By creating an account, you agree to our <a href="/#/terms">terms and conditions</a> and <a href="/#/privacy">privacy policy</a></p>
            <button onClick={proceed}>Proceed</button>

            <div className="option">
                <p>Already have an account?</p>
                <p onClick={() => navigate("/login")} className="link">login here</p>
            </div>
        </>
    )
}


function Stage2() {

    const navigate = useNavigate();
    const [stage, setStage] = useContext(StageContext);
    const [selectedImage, setSelectedImage] = useState("No image selected")

    const [image, setImage] = useState('')
    const [dob, setDob] = useState('')

    const proceed = () => {
        const now = new Date();
        const birth = new Date(dob)
        const ageInMilli = now - birth;
        const ageInYears = ageInMilli / (365.25 * 24 * 60 * 60 * 1000);
        const age = Math.floor(ageInYears)

        if (dob) {
            if (age >= 13) {
                const fileReader = new FileReader();
                const user = JSON.parse(sessionStorage.getItem("tmp_user"))

                if (image) {
                    fileReader.onload = (e) => {
                        const bufferImage = fileReader.result

                        user.dob = dob;
                        user.image = bufferImage;
                        sessionStorage.setItem("tmp_user", JSON.stringify(user))
                        
                        setStage(stage + 1)
                    }
                    fileReader.readAsDataURL(image);
                } else {
                    user.dob = dob;
                    sessionStorage.setItem("tmp_user", JSON.stringify(user))
                    setStage(stage + 1)
                }
            } else {
                alert("You should be at least 13 years old to create an account.")
            }
        } else {
            alert("Please fill in the form")
        }
    }

    return (
        <>

            <div className="top-bar">
                <h1>Account Details</h1>
                <h2>This can be changed later in your profile settings except for the date of birth.</h2>
            </div>

            <div className="input-area">
                <p className="label">Profile Picture</p>
                <label htmlFor="file">{selectedImage}</label>
                <input type="file" id="file" onChange={(e) => {
                    setSelectedImage(e.target.files[0].name) 
                    setImage(e.target.files[0])
                }} />
            </div>

            <div className="input-area">
                <label htmlFor="date">Date of Birth</label>
                <input value={dob} onChange={e => setDob(e.target.value)} type="date" name="date" id="date" max={new Date().toISOString().split("T")[0]} />
                <p className="link">Why do I have to answer?</p>
            </div>

            {/* <p>I don't have time for this? <span onClick={() => setStage(stage + 1)}>skip this step</span></p> */}

            <div className="buttons">
                <button onClick={() => setStage(stage - 1)}><svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>Back</button>
                <button onClick={proceed}>Proceed<svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></button>
            </div>

        </>
    )
}


function Stage3() {

    const navigate = useNavigate();
    const [stage, setStage] = useContext(StageContext);
    const [loading, setLoading] = useState(false)
    const { socket, isConnected } = useSocket()

    const passwordRef = useRef();
    const password2Ref = useRef();

    const register = () => {

        setLoading(true)
        const user = JSON.parse(sessionStorage.getItem("tmp_user"))
        if (!user) {
            return setStage(1)
        }

        const password = passwordRef.current.value;
        const password2 = password2Ref.current.value;

        if (password && password2) {
            if (password == password2) {
                user.password = password;

                if (isConnected) {
                    socket.emit("user/create/account", user)
                    socket.on("user/create/account/response", response => {
                        if (response.error) {
                            alert(response.msg)
                        } else {
                            if (response.accepted) {
                                sessionStorage.removeItem("tmp_user")
                                if (confirm("Signup was successful, would you like to login?")) {
                                    navigate("/login")
                                }
                            }
                            setLoading(false)
                        }
                    })
                } else {
                    alert("Something went wrong when connecting to server")
                }

                // Axios({
                //     method: 'POST',
                //     url: `${BackendHost}/api/signup/`,
                //     data: user
                // }).then((response) => {
                    // if (response.data.accepted) {
                    //     sessionStorage.removeItem("tmp_user")
                    //     if (confirm("Signup was successful, would you like to login?")) {
                    //         navigate("/login")
                    //     }
                    // }
                    // setLoading(false)
                // }).catch((error) => {
                //     if (error.response.data.msg)
                //         alert(error.response.data.msg)
                // })
                
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

            <p>By creating an account, you agree to our <a href="/#/terms">terms and conditions</a> and <a href="/#/privacy">privacy policy</a></p>

            <div className="buttons">
                <button onClick={() => setStage(stage - 1)}><svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>Back</button>
                {
                    loading ?
                    <button className="processing">Processing...</button> :
                    <button onClick={register}>Register<svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></button>
                }
            </div>

        </>
    )
}