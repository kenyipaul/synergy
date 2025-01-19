import { motion } from "framer-motion"

export default function AboutPage() {
    return (
        <motion.div id="about-page"
            initial={{
                scale: 0,
                opacity: 0
            }}
            animate={{
                scale: 1,
                opacity: 1
            }}
            transition={{
                duration: 1
            }}
        >
            <div className="content">
                <h1>About Synergy</h1>

                <div className="section">
                    <h2>Our Mission</h2>
                    <p>At Synergy, our mission is to empower individuals and organizations to connect, collaborate, and achieve more together. We believe that true success comes from working in synergy, where the combined efforts of a group are greater than the sum of their individual parts. We provide a platform that fosters meaningful connections, facilitates seamless communication, and empowers communities to thrive.</p>
                </div>

                <div className="section">
                    <h2>Our Story</h2>
                    <p>Synergy was founded in [Year] by a team of passionate individuals who recognized the need for a better way to connect and collaborate. We saw that many people were struggling to find the right communities, organize effective events, and maintain meaningful connections. That's why we created Synergy – a platform designed to simplify these processes and empower people to achieve their goals together.</p>
                    <p>From our initial concept to the platform you see today, we've been driven by a commitment to innovation, user experience, and the power of community. We're constantly working to improve Synergy and add new features that will help our users connect and collaborate more effectively.</p>
                </div>

                <div className="section">
                    <h2>Our Values</h2>
                    <ul>
                        <li><strong>Collaboration:</strong> We believe in the power of teamwork and collaboration to achieve extraordinary results.</li>
                        <li><strong>Community:</strong> We are committed to building a vibrant and supportive community where everyone feels welcome and valued.</li>
                        <li><strong>Innovation:</strong> We are constantly striving to innovate and improve our platform to provide the best possible user experience.</li>
                        <li><strong>Empowerment:</strong> We empower individuals and organizations to achieve their goals by providing them with the tools and resources they need to succeed.</li>
                        <li><strong>Integrity:</strong> We operate with the highest ethical standards and are committed to transparency and accountability.</li>
                    </ul>
                </div>

                <div className="section">
                    <h2>Our Team</h2>
                    <p>Meet the team behind Synergy:</p>

                    <div className="members">
                        <div className="team-member">
                            <img src="https://i.pravatar.cc/150?img=1" alt="Team Member 1" />
                            <div className="team-member-info">
                                <h3>John Doe</h3>
                                <h4>CEO & Co-Founder</h4>
                                <p>John has a passion for building innovative technology solutions that bring people together.</p>
                            </div>
                        </div>

                        <div className="team-member">
                            <img src="https://i.pravatar.cc/150?img=2" alt="Team Member 2" />
                            <div className="team-member-info">
                                <h3>Jane Smith</h3>
                                <h4>CTO & Co-Founder</h4>
                                <p>Jane is a highly skilled software engineer with a vision for creating intuitive and user-friendly platforms.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <h2>Contact Us</h2>
                    <p>We'd love to hear from you! Contact us at <b>synergy@tutamail.com</b>.</p>
                </div>
            </div>
        </motion.div>
    )
}