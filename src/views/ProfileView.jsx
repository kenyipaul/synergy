export default function ProfileView() {
    return (
        <>
        <div className="profile-view">
            <div className="header">
                <section>
                    <div className="profile">
                        <div className="image"></div>
                        <h1>John Doe</h1>
                    </div>
                    <button>See Public View</button>
                </section>

                <section>
                    <button>Overview</button>
                    <button>Profile Setting</button>
                </section>
            </div>
        </div>
        <div className="profile-view">
            <div className="header">
                <section>
                    <div className="profile">
                        <div className="image"></div>
                        <h1>Google Inc</h1>
                    </div>
                    <button>See Public View</button>
                </section>

                <section>
                    <button>Overview</button>
                    <button>Posted Jobs</button>
                    <button>Candidates</button>
                    <button>Profile Setting</button>
                </section>
            </div>
        </div>
        </>
    )
}