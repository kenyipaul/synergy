import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "../modules/Navbar"
import CommunityBoard from "../modules/CommunityBoard"
import EventBoard from "../modules/EventBoard"
import Footer from "../modules/Footer"

export default function HomeView() {
    return (
        <motion.div initial={{ scale: 1.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: .5 }} id="home">
            
            <Header />
            <CommunityBoard />
            {/* <Banner />    */}
            <TestimonialBoard />
            {/* <EventBoard /> */}

            <div className="qnb">
                <div className="content">
                    <h1>Frequently Asked Questions</h1>

                    <div className="dropdown-list">
                        <Dropdown />
                        <Dropdown />
                        <Dropdown />
                        <Dropdown />
                    </div>
                </div>
            </div>

            <Footer />
        </motion.div>
    )
}


function Header() {
    return (
        <div id="header">
            <main>
                <div className="content">
                    <h1>"Synergy: Learn, Share, Grow"</h1>
                    <p>Beyond traditional learning, Synergy fosters a collaborative environment where knowledge is shared, skills are honed, and individuals grow together. Join the movement and unlock your full potential.</p>
                    <button>Get Started</button>
                </div>
            </main>

            <div className="service-board">
                <div className="service-grid">
                    <div className="service">
                        <h1>Synergy Connections</h1>
                        <p>Connect with Professionals: Emphasize networking, mentorship, and collaboration opportunities within the community.</p>
                    </div>
                    
                    <div className="bar"></div>
                    <div className="service">
                        <h1>Synergy Careers</h1>
                        <p>Find Synergistic Opportunities: Frame job postings as chances for collaborative growth and impact.</p>
                    </div>

                    <div className="bar"></div>
                    <div className="service">
                        <h1>Synergy Events</h1>
                        <p>Attend Networking Events: Focus on events designed for making connections and fostering synergy.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


function Banner() {
    return (
        <div className="home-banner">
            <div className="banner">
                <h1>"Synergy is the magic that unlocks limitless innovation through the power of collaboration."</h1>
            </div>
        </div>
    )
}


function TestimonialBoard() {
    return (
        <div className="testimonial-board">
            <div className="top-bar">
                <h1>Trusted by Enterprise customers</h1>
                <p>Trusted by Enterprise Customers. Proven synergy solutions that drive results.</p>
            </div>
            <div className="testimonials">
                <Testimony />
                <Testimony />
                <Testimony />
                <Testimony />
                <Testimony />
                <Testimony />
            </div>
            <div className="navigation">
                <button><svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z" fill="currentColor"></path> </g></svg></button>
                <button><svg width="1rem" height="1rem"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
            </div>
        </div>
    )
}


function Testimony() {
    return (
        <div className="testimony">
            <div className="topBar">
                <div className="profile"></div>
                <div>
                    <h1>John Doe</h1>
                    <p>HR Manager at Yeworks</p>
                </div>
            </div>
            <p className="message">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam totam porro beatae dolor veritatis rem harum eaque vel iusto illum?</p>
        </div>
    )
}


function Dropdown() {

    const [dropdownState, setDropdownState] = useState(false);

    return (
        <div className="dropdown-container">
            <div className="question" onClick={() => setDropdownState(!dropdownState)}>
                <p>What is Synergy</p>
                <svg viewBox="0 0 24 24" width="2rem" height="2rem" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="currentColor"></path> </g></svg>
            </div>
            <div className={ dropdownState ? "answer active" : "answer"}>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id consequuntur a veritatis. Veniam itaque ab est illo autem ullam, incidunt assumenda at doloremque! Qui quibusdam tenetur beatae quas possimus accusantium.</p>
            </div>
        </div>
    )
}