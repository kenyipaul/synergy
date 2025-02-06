import {useSocket} from "../../../providers/socketProvider.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setAuthorized, setUser} from "../../../store/states/authorizedState.js";
import {motion} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef, useState} from "react";

export default function ProfileSettings() {

    const navigate = useNavigate();
    const {socket, isConnected} = useSocket();
    const authorizedState = useSelector(store => store.authorizedState)
    const user = authorizedState.user;
    const dispatch = useDispatch();

    const deleteAccount = () => {
        if (confirm("Are you sure you want to delete your account?")) {
            if (isConnected) {
                socket.emit("user/delete/account", { id: user.id })
                socket.on("user/delete/account/response", response => {
                    if (response.error) {
                        alert(response.msg)
                    } else {
                        alert(response.msg)
                        sessionStorage.removeItem("user");
                        sessionStorage.removeItem("token");
                        dispatch(setAuthorized(false))
                        dispatch(setUser({}))
                        navigate("/")
                    }
                })

            } else {
                alert("Failed to connect to server, please try again later")
            }
        }
    }

    return (
        <motion.div initial={{ translateY: 100 }} whileInView={{ translateY: 0 }} transition={{ duration: .3 }} className="edit-tab tab">

            <div className="form-container">
                <PasswordArea />

                <div className="form delete-form">
                    <h1>Delete account</h1>
                    <p>Deleting your account will remove all the content associated with it.</p>
                    <p className="link" onClick={deleteAccount}>I want to delete my account</p>
                </div>

            </div>
        </motion.div>
    )
}


function PasswordArea() {

    const newPassRef = useRef(null)
    const currentPassRef = useRef(null)
    const authorizedState = useSelector(store => store.authorizedState)
    const user = authorizedState.user;
    const {socket, isConnected} = useSocket();
    const [loading, setLoading] = useState(false)

    const changePassword = () => {
        setLoading(true)
        const newPassword = newPassRef.current.value;
        const currentPassword = currentPassRef.current.value;

        if (newPassword && currentPassword) {
            if (isConnected) {
                socket.emit("user/update/password", { newPassword, currentPassword, email: user.email })
                socket.on("user/update/password/response", response => {
                    alert(response.msg)
                    setLoading(false)
                })
            } else {
                alert("Something went wrong, try again later")
            }
        } else {
            alert("Please fill out all fields")
        }
    }

    return (
        <div className="form password-form">
            <h1>Change Password</h1>
            <div className="password-area">
                <div className="input-area">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input ref={currentPassRef} type="password" name="currentPassword" id="currentPassword" />
                </div>

                <div className="input-area">
                    <label htmlFor="newPassword">New Password</label>
                    <input ref={newPassRef} type="password" name="password" id="password" />
                </div>
            </div>
            { loading ? <button>Processing...</button> : <button onClick={changePassword}>Change Password</button> }
        </div>
    )
}