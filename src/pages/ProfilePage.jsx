import Axios from "axios"
import { useEffect, useRef, useState } from "react";
import Footer from "../layout/Footer";
import { eventRoute } from "../routes/routes";
import EventCard from "../modules/EventCard";
import { BackendHost } from "../routes/routes";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setUser as updateUser } from "../store/states/authorizedState"
import { setUpdater } from "../store/states/updaterState";
import { io } from "socket.io-client";

export default function ProfilePage() {

    const [currentTab, setCurrentTag] = useState(0);
    const authorizedState = useSelector(store => store.authorizedState);
    const [user, setUser] = useState(authorizedState.user)

    useEffect(() => {
        setUser(authorizedState.user)
    }, [authorizedState])

    return (
        <div id="profile-page">
            <div className="header">
                <section>
                    <div className="profile">
                        <div className="image" style={{
                            backgroundImage: `url(${BackendHost}/${user.image})`
                        }}></div>
                        <div>
                            <h1>{user.firstName} {user.lastName}</h1>
                            <p>@{user.username}</p>
                        </div>
                    </div>
                    {/* <button>See Public View</button> */}
                </section>

                <section>
                    <div className="buttons">
                        <button onClick={() => setCurrentTag(0) } className={currentTab == 0 ? "active" : ""} >Overview</button>
                        <button onClick={() => setCurrentTag(1) } className={currentTab == 1 ? "active" : ""} >Posts</button>
                        <button onClick={() => setCurrentTag(2) } className={currentTab == 2 ? "active" : ""} >Communities</button>
                        <button onClick={() => setCurrentTag(3) } className={currentTab == 3 ? "active" : ""} >Edit Profile</button>
                    </div>
                </section>
            </div>
            <div className="main">

                {
                    currentTab == 0 ? <Overview /> :
                    currentTab == 1 ? <Posts /> :
                    currentTab == 2 ? <Communities /> : <ProfileSettings />
                }

            </div>
            {/* <Footer /> */}
        </div>
    )
}

function Overview() {

    const authorizedState = useSelector(store => store.authorizedState)

    return (
        <div className="overview-tab tab">
            <div className="info-card">
                <div className="top-bar">
                    <h1>Biography</h1>
                    {/* <svg viewBox="0 0 24 24" width="2rem" height="2rem" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.9445 9.1875L14.9445 5.1875M18.9445 9.1875L13.946 14.1859C13.2873 14.8446 12.4878 15.3646 11.5699 15.5229C10.6431 15.6828 9.49294 15.736 8.94444 15.1875C8.39595 14.639 8.44915 13.4888 8.609 12.562C8.76731 11.6441 9.28735 10.8446 9.946 10.1859L14.9445 5.1875M18.9445 9.1875C18.9445 9.1875 21.9444 6.1875 19.9444 4.1875C17.9444 2.1875 14.9445 5.1875 14.9445 5.1875M20.5 12C20.5 18.5 18.5 20.5 12 20.5C5.5 20.5 3.5 18.5 3.5 12C3.5 5.5 5.5 3.5 12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg> */}
                </div>
                <div className="body">
                    <p>{authorizedState.user.bio ? authorizedState.user.bio : "Not set"}</p>
                </div>
            </div>

            <div className="info-card">
                <div className="top-bar">
                    <h1>Profile Details</h1>
                    {/* <svg viewBox="0 0 24 24" width="2rem" height="2rem" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.9445 9.1875L14.9445 5.1875M18.9445 9.1875L13.946 14.1859C13.2873 14.8446 12.4878 15.3646 11.5699 15.5229C10.6431 15.6828 9.49294 15.736 8.94444 15.1875C8.39595 14.639 8.44915 13.4888 8.609 12.562C8.76731 11.6441 9.28735 10.8446 9.946 10.1859L14.9445 5.1875M18.9445 9.1875C18.9445 9.1875 21.9444 6.1875 19.9444 4.1875C17.9444 2.1875 14.9445 5.1875 14.9445 5.1875M20.5 12C20.5 18.5 18.5 20.5 12 20.5C5.5 20.5 3.5 18.5 3.5 12C3.5 5.5 5.5 3.5 12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg> */}
                </div>
                <div className="body">
                    {
                        authorizedState && authorizedState.authorized ?
                        <ul>
                            <li><b>Username:</b>{authorizedState.user.username}</li>
                            <li><b>First Name:</b>{authorizedState.user.firstName}</li>
                            <li><b>Last Name:</b>{authorizedState.user.lastName}</li>
                            <li><b>Email Address:</b>{authorizedState.user.email}</li> 
                        </ul>: <></>
                    }
                </div>
            </div>

            {/* <div className="info-card">
                <div className="top-bar">
                    <h1>Skills</h1>
                    <svg viewBox="0 0 24 24" width="2rem" height="2rem" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.9445 9.1875L14.9445 5.1875M18.9445 9.1875L13.946 14.1859C13.2873 14.8446 12.4878 15.3646 11.5699 15.5229C10.6431 15.6828 9.49294 15.736 8.94444 15.1875C8.39595 14.639 8.44915 13.4888 8.609 12.562C8.76731 11.6441 9.28735 10.8446 9.946 10.1859L14.9445 5.1875M18.9445 9.1875C18.9445 9.1875 21.9444 6.1875 19.9444 4.1875C17.9444 2.1875 14.9445 5.1875 14.9445 5.1875M20.5 12C20.5 18.5 18.5 20.5 12 20.5C5.5 20.5 3.5 18.5 3.5 12C3.5 5.5 5.5 3.5 12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </div>
                <div className="body">
                    <p>Not Set</p>
                </div>
            </div> */}
        </div>
    )
}



function Posts() {

    const scrollRight = () => { testimony_list_ref.current.scrollBy(300, 0); }
    const scrollLeft = () => { testimony_list_ref.current.scrollBy(-300, 0); }

    const [events, setEvents] = useState([])
    const authorizedState = useSelector(store => store.authorizedState)

    useEffect(() => {

        Axios({
            method: "GET",
            url: `${eventRoute}${authorizedState.user.id}`
        }).then((response) => {
            setEvents(response)
        })

    }, [])

    return (
        <div className="post-tab tab">
            <div className="container">
                <div className="top-bar">
                    <h1>Posted Events</h1>

                    <div className="navigation">
                        <button onClick={scrollLeft}><svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z" fill="currentColor"></path> </g></svg></button>
                        <button onClick={scrollRight}><svg width="1rem" height="1rem"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></button>
                    </div>
                </div>
                <div className="content">
                    {
                        events && events.length > 0 && events.map((data, key) => {
                            return <EventCard data={data} key={key} />
                        })
                    }
                    {/* <EventCard data={events} /> */}
                </div>
            </div>


            <div className="container">
                <div className="top-bar">
                    <h1>Community Posts</h1>

                    <div className="navigation">
                        <button onClick={scrollLeft}><svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z" fill="currentColor"></path> </g></svg></button>
                        <button onClick={scrollRight}><svg width="1rem" height="1rem"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></button>
                    </div>
                </div>
                <div className="content">
                    <div className="community"></div>
                </div>
            </div>
        </div>
    )
}



function Communities() {

    const scrollRight = () => { testimony_list_ref.current.scrollBy(300, 0); }
    const scrollLeft = () => { testimony_list_ref.current.scrollBy(-300, 0); }

    return (
        <div className="communities-tab tab">
            <div className="container">
                <div className="top-bar">
                    <h1>My Communities</h1>

                    <div className="navigation">
                        <button onClick={scrollLeft}><svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z" fill="currentColor"></path> </g></svg></button>
                        <button onClick={scrollRight}><svg width="1rem" height="1rem"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></button>
                    </div>
                </div>
                <div className="content">
                    <div className="community"></div>
                </div>
            </div>


            <div className="container">
                <div className="top-bar">
                    <h1>Joined Communities</h1>

                    <div className="navigation">
                        <button onClick={scrollLeft}><svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z" fill="currentColor"></path> </g></svg></button>
                        <button onClick={scrollRight}><svg width="1rem" height="1rem"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></button>
                    </div>
                </div>
                <div className="content">
                    <div className="community"></div>
                </div>
            </div>
        </div>
    )
}

function ProfileSettings() {
    return (
        <div className="edit-tab tab"> 

            <div className="form-container">  

                <BioArea />
                <AccountDetails />
                <PasswordArea />

                <div className="form delete-form">
                    <h1>Delete account</h1>
                    <p>Deleting your account will remove all the content associated with it.</p>
                    <a href="#">I want to delete my account</a>
                </div>

            </div>
        </div>
    )
}






function BioArea() {

    const bioRef = useRef();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const authorizedState = useSelector(store => store.authorizedState)
    const socket = useRef()

    useEffect(() => {
        socket.current = io(BackendHost);
    }, [])

    const updateBio = () => {
        setLoading(true)
        const bio = bioRef.current.value;
        const userId =  authorizedState.user.id;

        if (bio) {
            socket.current.emit("user/update/bio", { userId, bio })
            socket.current.on("user/update/bio/response", response => {
                if (response.error) {
                    alert(response.msg)
                } else {
                    dispatch(setUser(response.data))
                    alert(response.msg)
                }
                setLoading(false)
            })
        }
    }

    return (
        <div className="form bio-form">
            <h1>Biography</h1>
            <textarea ref={bioRef} name="bio" id="bio" placeholder="Write bio here..."></textarea>
            {
                loading ?
                <button>Updating...</button>
                :
                <button onClick={updateBio}>Update Bio</button>
            }
        </div>
    )
}


function AccountDetails() {

    const updaterState = useSelector(store => store.updaterState)
    const authorizedState = useSelector(store => store.authorizedState)
    const [user, setUser] = useState(authorizedState.user);
    
    const socket = useRef()
    const dispatch = useDispatch()
    const [email, setEmail] = useState(user.email);
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState(user.username);
    const [lastName, setLastName] = useState(user.lastName);
    const [firstName, setFirstName] = useState(user.firstName);

    useEffect(() => {
        setUser(authorizedState.user)
    }, [authorizedState])


    useEffect(() => {
        socket.current = io(BackendHost);
    }, [])

    const submit = () => {

        socket.current.emit("user/update/profile", { id: user._id, email, username, lastName, firstName })
        socket.current.on("user/update/profile/response", response => {
            if (response.error) {
                alert(response.msg)
            } else {
                dispatch(setUser(response.data))
                alert(response.msg)
            }
            setLoading(false)
        })

    }

    return (
        <div className="form">
            <h1>Account Profile</h1>

            <div className="input-area">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className="name-area">

                <div className="input-area">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>

                <div className="input-area">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>

            </div>

            <div className="input-area">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            {
                loading ? <button>Updating...</button> : <button onClick={submit}>Update Profile</button>
            }

        </div>
    )
}


function PasswordArea() {
    return (
        <div className="form password-form">
            <h1>Password</h1>
            <div className="password-area">
                <div className="input-area">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input type="password" name="currentPassword" id="currentPassword" />
                </div>

                <div className="input-area">
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" name="password" id="passwrod" />
                </div>
            </div>
            <button>Change Password</button>
        </div>
    )
}