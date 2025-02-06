import { useEffect, useRef, useState } from "react"
import Footer from "../layout/Footer"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
// import AOS from "aos"
// import "aos/dist/aos.css"

export default function HomePage() {

    return (
        <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: .5 }} 
        id="home-page">
            
            <Header />
            <Banner />
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
                    <h1>"<span>Synergy</span>: Learn, Share, Grow"</h1>
                    <p>Beyond traditional learning, Synergy fosters a collaborative environment where knowledge is shared, skills are honed, and individuals grow together. Join the movement and unlock your full potential.</p>
                    {/* <button>Get Started</button> */}
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
                <video id={"video"} autoPlay={true} muted loop>
                    <source src="/assets/videos/banner.mp4" type="video/mp4" />
                    Your browser does not support the video tag
                </video>
                <div className="cover"></div>
                <div className="caption">
                    <h1>"Synergy is the magic that unlocks limitless innovation through the power of collaboration."</h1>
                </div>
            </div>
        </div>
    )
}


function TestimonialBoard() {

    const testimonials = [
        {
            "username": "CollaboratorX",
            "job_title": "Project Manager at Innovate Inc.",
            "message": "Synergy has completely transformed the way our team collaborates. The platform's intuitive interface and powerful features have streamlined our workflows, improved communication, and boosted our overall productivity. It's the perfect tool for any team looking to achieve true synergy.",
            "profile_image": "https://i.pravatar.cc/150?img=4"
        },
        {
            "username": "TeamBuilder22",
            "job_title": "HR Manager at Growth Dynamics",
            "message": "As an HR manager, fostering strong team dynamics is always a top priority. Synergy has been instrumental in helping us build stronger connections within our organization. The platform's focus on collaboration and communication has created a more unified and engaged workforce.",
            "profile_image": "https://i.pravatar.cc/150?img=11"
        },
        {
            "username": "SynergySeeker",
            "job_title": "Business Consultant at Peak Performance Group",
            "message": "I've been searching for a platform that truly embodies the concept of synergy, and I've finally found it with Synergy. The platform's ability to bring teams together and facilitate seamless collaboration is truly remarkable. It's a game-changer for businesses looking to maximize their potential.",
            "profile_image": "https://i.pravatar.cc/150?img=18"
        },
        {
            "username": "ConnectMaster",
            "job_title": "Community Manager at Global Networks",
            "message": "Synergy has made managing our online community so much easier. The platform's features for communication, event planning, and resource sharing are all incredibly valuable. It's helped us create a thriving and engaged community of professionals.",
            "profile_image": "https://i.pravatar.cc/150?img=25"
        },
          {
            "username": "EfficiencyExpert",
            "job_title": "Operations Manager at Streamline Solutions",
            "message": "Synergy has significantly improved our operational efficiency. The platform's tools for task management, project tracking, and communication have streamlined our workflows and eliminated many of the bottlenecks we were experiencing. It's a must-have for any organization looking to optimize its operations.",
            "profile_image": "https://i.pravatar.cc/150?img=32"
        },
          {
            "username": "GrowthCatalyst",
            "job_title": "Marketing Director at MarketLeap Strategies",
            "message": "Synergy has been a catalyst for growth in our marketing department. The platform's collaborative features have enabled us to brainstorm more effectively, share ideas more seamlessly, and execute campaigns more efficiently. It's helped us achieve significant results and drive business growth.",
            "profile_image": "https://i.pravatar.cc/150?img=39"
        },
        {
            "username": "InnovationLeader",
            "job_title": "CEO at FutureForward Innovations",
            "message": "At FutureForward Innovations, we're always looking for ways to foster innovation and collaboration. Synergy has provided us with the perfect platform to do just that. It's helped us break down silos, encourage cross-functional collaboration, and drive innovation across the organization.",
            "profile_image": "https://i.pravatar.cc/150?img=46"
        }
      ]

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
                    {
                        testimonials.map((data, key) => {
                            return <Testimony key={key} data={data} />
                        })
                    }
                </div>
            </div>
            <div className="navigation">
                <button onClick={scrollLeft}><svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z" fill="currentColor"></path> </g></svg></button>
                <button onClick={scrollRight}><svg width="1rem" height="1rem"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></button>
            </div>
        </div>
    )
}


function Testimony(props) {
    return (
        <motion.div className="testimony"
            initial={{
                translateY: 150,
                opacity: 0,
            }}
            whileInView={{
                translateY: 0,
                opacity: 1,
            }}
            transition={{
                duration: .5
            }}
        >
            <div className="topBar">
                <div className="profile" style={{
                    backgroundImage: `url(${props.data.profile_image})`
                }}></div>
                <div>
                    <h1>{props.data.username}</h1>
                    <p>{props.data.job_title}</p>
                </div>
            </div>
            <p className="message">{props.data.message}</p>
        </motion.div>
    )
}


function Dropdown(props) {

    const body = useRef(null)
    const [dropdownState, setDropdownState] = useState(false);

    useEffect(() => {
        body.current.innerHTML = props.data.answer
    }, [props])

    return (
        <motion.div className="dropdown-container" 
            initial={{
                translateY: 150
            }}
            whileInView={{
                translateY: 0
            }}
            transition={{
                duration: .5
            }}
        >
            <div className="question" onClick={() => setDropdownState(!dropdownState)}>
                <p>{props.data.question}</p>
                <svg viewBox="0 0 24 24" width="2rem" height="2rem" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="currentColor"></path> </g></svg>
            </div>
            <div className={ dropdownState ? "answer active" : "answer"}>
                <p ref={body}></p>
            </div>
        </motion.div>
    )
}


const faqs = [
    {
        "question": "What is Synergy?",
        "answer": "<p>Synergy is the concept that the value and performance of two or more companies combined will be greater than the sum of the separate individual parts. In essence, it's the idea that the whole is greater than the sum of its parts.</p>"
    },
    {
        "question": "What problems does Synergy solve?",
        "answer": `
                <p>• Isolation and Lack of Connection: In today's increasingly digital world, many individuals feel isolated and disconnected from their local communities.</p>
                <p>• Limited Access to Information: Finding local events, job opportunities, and community resources can be time-consuming and challenging.</p>
                <p>• Lack of Platforms for Collaboration: Existing platforms may not adequately support community-driven initiatives, collaborative projects, and knowledge sharing.</p>
        `
    },
    {
        "question": "Why was Synergy Created?",
        "answer": "<p>Synergy is a web-based platform designed to foster a strong sense of community among its users. It aims to connect individuals through shared interests, facilitate collaboration, and provide valuable resources such as event listings, community blogs, discussion forums, and a job board.</p>"
    }
]



function CommunityBoard() {

    const navigate = useNavigate();

    return (
        <motion.div className="community-board">
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

            <button onClick={() => navigate("/communities")}>Create Your Community</button>
        </motion.div>
    )
}

function Community(props) {
    return (
        <motion.div 
        initial={{
            scale: 150,
            opacity: 0,
        }}
        whileInView={{
            translateY: 0,
            opacity: 1,
        }}
        transition={{
            duration: .5
        }}
        className="community"> <h1>{props.title}</h1> </motion.div>
    )
}