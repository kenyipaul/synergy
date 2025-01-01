export default function JobCard() {
    return (
        <div className="job-card">
            <div className="header">
                <div className="profile"></div>
                <button>Save</button>
            </div>
            <div className="main">
                <div className="title-bar">
                    <h1>Yeworks Limited</h1>
                    <p>12/01/2001</p>
                </div>
                <h1 className="title">Back-End Django Developer</h1>
                <div className="tags">
                    <p>Full-Time</p>
                    <p>Contract</p>
                </div>
            </div>
            <div className="footer">
                <div>
                    <h1>$10k - 25k</h1>
                    <p>Kampala, Uganda</p>
                </div>
                <button>Apply Now</button>
            </div>
        </div>
    )
}