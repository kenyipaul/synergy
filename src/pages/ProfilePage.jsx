export default function ProfilePage() {
    return (
        <div id="profile-page">
            <div className="header">
                <section>
                    <div className="profile">
                        <div className="image"></div>
                        <h1>John Doe</h1>
                    </div>
                    {/* <button>See Public View</button> */}
                </section>

                <section>
                    <div className="buttons">
                        <button>Overview</button>
                        <button>Posts</button>
                        <button>Communities</button>
                        <button>Profile Setting</button>
                    </div>
                </section>
            </div>
            <div className="main">

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

            </div>
        </div>
    )
} 