import { useState } from "react";
import { useSelector } from "react-redux";

export default function ProfilePage() {

    const [currentTab, setCurrentTag] = useState(0);
    const authorizedState = useSelector(store => store.authorizedState);

    return (
        <div id="profile-page">
            <div className="header">
                <section>
                    <div className="profile">
                        <div className="image"></div>
                        <div>
                            <h1>{authorizedState.user.firstName} {authorizedState.user.lastName}</h1>
                            <p>@{authorizedState.user.username}</p>
                        </div>
                    </div>
                    {/* <button>See Public View</button> */}
                </section>

                <section>
                    <div className="buttons">
                        <button onClick={() => setCurrentTag(0) } className={currentTab == 0 && "active"} >Overview</button>
                        <button onClick={() => setCurrentTag(1) } className={currentTab == 1 && "active"} >Posts</button>
                        <button onClick={() => setCurrentTag(2) } className={currentTab == 2 && "active"} >Communities</button>
                        <button onClick={() => setCurrentTag(3) } className={currentTab == 3 && "active"} >Profile Setting</button>
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
        </div>
    )
}

function Overview() {
    return (
        <>
            <div className="info-card">
                <div className="top-bar">
                    <h1>Biography</h1>
                    <svg viewBox="0 0 24 24" width="2rem" height="2rem" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.9445 9.1875L14.9445 5.1875M18.9445 9.1875L13.946 14.1859C13.2873 14.8446 12.4878 15.3646 11.5699 15.5229C10.6431 15.6828 9.49294 15.736 8.94444 15.1875C8.39595 14.639 8.44915 13.4888 8.609 12.562C8.76731 11.6441 9.28735 10.8446 9.946 10.1859L14.9445 5.1875M18.9445 9.1875C18.9445 9.1875 21.9444 6.1875 19.9444 4.1875C17.9444 2.1875 14.9445 5.1875 14.9445 5.1875M20.5 12C20.5 18.5 18.5 20.5 12 20.5C5.5 20.5 3.5 18.5 3.5 12C3.5 5.5 5.5 3.5 12 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </div>
                <div className="body">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos reiciendis exercitationem, labore odio qui sapiente molestias veritatis tenetur ea iusto.</p>
                </div>
            </div>

            <div className="info-card">
                <div className="top-bar">
                    <h1>Profile Details</h1>
                    <svg viewBox="0 0 24 24" width="2rem" height="2rem" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.9445 9.1875L14.9445 5.1875M18.9445 9.1875L13.946 14.1859C13.2873 14.8446 12.4878 15.3646 11.5699 15.5229C10.6431 15.6828 9.49294 15.736 8.94444 15.1875C8.39595 14.639 8.44915 13.4888 8.609 12.562C8.76731 11.6441 9.28735 10.8446 9.946 10.1859L14.9445 5.1875M18.9445 9.1875C18.9445 9.1875 21.9444 6.1875 19.9444 4.1875C17.9444 2.1875 14.9445 5.1875 14.9445 5.1875M20.5 12C20.5 18.5 18.5 20.5 12 20.5C5.5 20.5 3.5 18.5 3.5 12C3.5 5.5 5.5 3.5 12 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </div>
                <div className="body">
                    <ul>
                        <li><b>Username:</b>johndoe</li>
                        <li><b>First Name:</b>John</li>
                        <li><b>Last Name:</b>Doe</li>
                        <li><b>Email Address:</b>johndoe@work.org</li>
                    </ul>
                </div>
            </div>

            <div className="info-card">
                <div className="top-bar">
                    <h1>Skills</h1>
                    <svg viewBox="0 0 24 24" width="2rem" height="2rem" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.9445 9.1875L14.9445 5.1875M18.9445 9.1875L13.946 14.1859C13.2873 14.8446 12.4878 15.3646 11.5699 15.5229C10.6431 15.6828 9.49294 15.736 8.94444 15.1875C8.39595 14.639 8.44915 13.4888 8.609 12.562C8.76731 11.6441 9.28735 10.8446 9.946 10.1859L14.9445 5.1875M18.9445 9.1875C18.9445 9.1875 21.9444 6.1875 19.9444 4.1875C17.9444 2.1875 14.9445 5.1875 14.9445 5.1875M20.5 12C20.5 18.5 18.5 20.5 12 20.5C5.5 20.5 3.5 18.5 3.5 12C3.5 5.5 5.5 3.5 12 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </div>
                <div className="body">
                    <p>Not Set</p>
                </div>
            </div>
        </>
    )
}

function Posts() {
    return (
        <>
            <div className="container">
                <div className="top-bar">
                    <h1>Posted Events</h1>
                </div>
                <div className="content">

                </div>
            </div>


            <div className="container">
                <div className="top-bar">
                    <h1>Community Posts</h1>
                </div>
                <div className="content">
                    
                </div>
            </div>
        </>
    )
}

function Communities() {
    return (
        <div className="communities-tab">
            <div className="container">
                <div className="top-bar">
                    <h1>My Communities</h1>
                </div>
                <div className="content">

                </div>
            </div>


            <div className="container">
                <div className="top-bar">
                    <h1>Joined Communities</h1>
                </div>
                <div className="content">
                    
                </div>
            </div>
        </div>
    )
}

function ProfileSettings() {
    return (
        <> 
            <h1>PROFILE SETTINGS</h1>
        </>
    )
}