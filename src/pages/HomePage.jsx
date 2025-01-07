import { useRef, useState } from "react"
import Footer from "../layout/Footer"
import { motion } from "framer-motion"

export default function HomePage() {
    return (
        <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: .5 }} 
        id="home-page">
            
            <Header />
            <CommunityBoard />
            <TestimonialBoard />

            <div className="qnb">
                <div className="content">
                    <h1>Frequently Asked Questions</h1>

                    <div className="dropdown-list">
                        {
                            faqs.map((data, index) => {
                                return <Dropdown data={data} key={index} />
                            })
                        }
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

    const testimony_list_ref = useRef();

    const scrollRight = () => { testimony_list_ref.current.scrollBy(300, 0); }
    const scrollLeft = () => { testimony_list_ref.current.scrollBy(-300, 0); }

    return (
        <div className="testimonial-board">
            <div className="top-bar">
                <h1>Trusted by Enterprise customers</h1>
                <p>Trusted by Enterprise Customers. Proven synergy solutions that drive results.</p>
            </div>
            <div className="testimonials">
                <div className="list" ref={testimony_list_ref}>
                    <Testimony />
                    <Testimony />
                    <Testimony />
                    <Testimony />
                    <Testimony />
                    <Testimony />
                </div>
            </div>
            <div className="navigation">
                <button onClick={scrollLeft}><svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z" fill="currentColor"></path> </g></svg></button>
                <button onClick={scrollRight}><svg width="1rem" height="1rem"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></button>
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


function Dropdown(props) {

    const [dropdownState, setDropdownState] = useState(false);

    return (
        <div className="dropdown-container">
            <div className="question" onClick={() => setDropdownState(!dropdownState)}>
                <p>{props.data.question}</p>
                <svg viewBox="0 0 24 24" width="2rem" height="2rem" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="currentColor"></path> </g></svg>
            </div>
            <div className={ dropdownState ? "answer active" : "answer"}>
                <p>{props.data.answer}</p>
            </div>
        </div>
    )
}


const faqs = [
    {
        "question": "What is Synergy?",
        "answer": "Synergy is the concept that the value and performance of two or more companies combined will be greater than the sum of the separate individual parts. In essence, it's the idea that the whole is greater than the sum of its parts."
    },
    {
        "question": "What problems does Synergy solve?",
        "answer": ""
    },
    {
        "question": "Why was Synergy Created?",
        "answer": "Synergy is a web-based platform designed to foster a strong sense of community among its users. It aims to connect individuals through shared interests, facilitate collaboration, and provide valuable resources such as event listings, community blogs, discussion forums, and a job board."
    }
]



function CommunityBoard() {
    return (
        <div className="community-board">
            <div className="title-bar">
                <h1>Welcome To Our Community</h1>
                <p>We believe in the power of working together. Welcome to our community of synergy.</p>
            </div>
            <div className="community-grid">

                <Community title="Gaming Club" />
                <Community title="Programming Club" />
                <Community title="Party Club" />
                <Community title="Engineers Club" />
                <Community title="Science Club" />
                <Community title="Food & Drinks" />

            </div>

            <button>Create Your Community</button>
        </div>
    )
}

function Community(props) {
    return (
        <div className="community"> <h1>{props.title}</h1> </div>
    )
}