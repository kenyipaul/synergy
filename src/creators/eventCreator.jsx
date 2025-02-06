import "./styles/_eventCreator.scss";
import { TagInput } from "rsuite";
import 'rsuite/TagInput/styles/index.css';
import { AnimatePresence, motion } from "framer-motion";
import React, { useState , useContext, useRef, useEffect} from "react";
import { EventCreatorContext } from "../pages/EventPage";
import { BackendHost, eventRoute } from "../routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client"
import { setUpdater } from "../store/states/updaterState";
import { useSocket } from "../providers/socketProvider";
import {Alert, Snackbar} from "@mui/material";

const StepContext = React.createContext(null);

export default function EventCreator() {

    const [alertState, setAlertState] = useState({
        state: false,
        severity: "info",
        msg: ""
    })

    const [step, setStep] = useState(1);
    const [eventCreator, setEventCreator] = useContext(EventCreatorContext)

    return (
        <motion.div initial={{scale: 0, opacity: 0}} whileInView={{scale: 1, opacity: 1}} transition={{duration: .5}} exit={{scale: 0, opacity: 0}} id="event-creator">

            <svg onClick={() => setEventCreator(false)} className="closeBtn" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>

            <div className="container">

                <div className="form">
                    <div className="top-bar">
                        <h1>Post an Event</h1>
                        <p>Bring your community together! Post your event and let everyone know about the exciting things happening around them.</p>
                    </div>
                </div>

                <StepContext.Provider value={[step, setStep]}>
                <div className="form">
                    <AnimatePresence>{ step === 1 ? <Step1 /> : null }</AnimatePresence>
                    <AnimatePresence>{ step === 2 ? <Step2 /> : null }</AnimatePresence>
                    <AnimatePresence>{ step === 3 ? <Step3 /> : null }</AnimatePresence>
                </div>
                </StepContext.Provider>

            </div>
        </motion.div>
    )
}


function Step1() {

    const [step, setStep] = useContext(StepContext);
    const [eventCreator, setEventCreator] = useContext(EventCreatorContext)

    const [alertState, setAlertState] = useState({
        state: false,
        severity: "info",
        msg: ""
    })

    const titleRef = useRef(null);
    const dateRef = useRef(null);
    const descriptionRef = useRef(null);

    const next = () => {
        const title = titleRef.current.value;
        const date = new Date(dateRef.current.value);
        const description = descriptionRef.current.value;
        const dateCreated = new Date()

        if (title && date && description) {
            const event = { title, date, description, dateCreated }
            sessionStorage.setItem("event", JSON.stringify(event));
            setStep(step + 1);
        } else {
            setAlertState({ state: true, severity: "warning", msg: "Please fill out all fields."})
        }

    }

    return (
        <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: .5 }} exit={{ position: "absolute", scale: 0, opacity: 0, }} className="form-content">

            <Snackbar open={alertState.state} onClose={() => setAlertState({state: false, severity: "info", msg: ""})} autoHideDuration={5000} anchorOrigin={{ vertical: 'top', horizontal: 'top' }}>
                <Alert severity={alertState.severity}>{alertState.msg}</Alert>
            </Snackbar>

            <div className="input-area">
                <label htmlFor="title">Event Title</label>
                <input ref={titleRef} type="text" id="title" />
            </div>

            <div className="input-area">
                <label htmlFor="title">Date & Time</label>
                <input ref={dateRef} type="datetime-local" id="date" />
            </div>

            <div className="input-area">
                <label htmlFor="description">Description</label>
                <textarea ref={descriptionRef} id="textarea"></textarea>
            </div>

            <div className="buttons">
                <button onClick={() => setEventCreator(false)}>Cancel</button>
                <button onClick={next}>Next</button>
            </div>
        </motion.div>
    )
}

function Step2() {

    const [step, setStep] = useContext(StepContext);
    const [selectedImage, setSelectedImage] = useState("No image selected");

    const [alertState, setAlertState] = useState({
        state: false,
        severity: "info",
        msg: ""
    })

    const eventCategories = [
        "Concert/Live Music",
        "Festival",
        "Conference/Summit",
        "Seminar/Workshop",
        "Webinar/Online Event",
        "Meeting/Networking Event",
        "Exhibition/Trade Show",
        "Performance/Theater",
        "Comedy Show",
        "Movie Screening",
        "Sports Event",
        "Charity Event/Fundraiser",
        "Community Event",
        "Educational Event",
        "Religious Event",
        "Family Event",
        "Kids Event",
        "Food & Drink Event",
        "Art Exhibition/Gallery Opening",
        "Book Signing/Author Talk",
        "Dance/Party",
        "Gaming Event",
        "Hackathon",
        "Workshop/Class",
        "Lecture/Talk",
        "Tour/Trip",
        "Retreat",
        "Other" // Always useful for those that don't fit the predefined categories
    ];

    const imageRef = useRef();
    const venueRef = useRef();
    const categoryRef = useRef();

    const next = () => {
        const location = venueRef.current.value;
        const category = categoryRef.current.value;
        const image = imageRef.current.files[0];

        if (location && category && image) {
            if (image.size < 1500000) {
    
                if (image) {
                    const reader = new FileReader();
                    reader.readAsDataURL(image);
                    reader.onload = () => {
                        const event = JSON.parse(sessionStorage.getItem("event"));
                        event.location = location;
                        event.category = category;
                        event.image = reader.result;
                        sessionStorage.setItem("event", JSON.stringify(event));
                        setStep(step + 1);
                    }
                } else {
                    if (location && category) {
                        const event = JSON.parse(sessionStorage.getItem("event"));
                        event.location = location;
                        event.category = category;
                        event.image = "";
                        sessionStorage.setItem("event", JSON.stringify(event));
                        setStep(step + 1);
                    } else {
                        setAlertState({ state: true, severity: "warning", msg: "Please fill out all fields."})
                    }
                }

            } else {
                setAlertState({ state: true, severity: "error", msg: "Selected image is too large, try a smaller image"})
            }
        } else {
            setAlertState({ state: true, severity: "warning", msg: "Please fill out all fields."})
        }


    }

    return (
        <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: .5 }} exit={{ position: "absolute", scale: 0, opacity: 0, }} className="form-content">

            <Snackbar open={alertState.state} onClose={() => setAlertState({state: false, severity: "info", msg: ""})} autoHideDuration={5000} anchorOrigin={{ vertical: 'top', horizontal: 'top' }}>
                <Alert severity={alertState.severity}>{alertState.msg}</Alert>
            </Snackbar>

            <div className="image-area">
                <p>Event Poster</p>
                <label htmlFor="image">{selectedImage}</label>
                <input ref={imageRef} type="file" id="image" onChange={(e) => setSelectedImage(e.target.files[0].name)} />
            </div>

            <div className="input-area">
                <label htmlFor="location">Location/Venue</label>
                <input ref={venueRef} type="text" id="location" />
            </div>

            <div className="input-area">
                <label htmlFor="category">Category/Type</label>
                <select ref={categoryRef} id="category">
                    {eventCategories.map((category, index) => {
                        return <option key={index} value={category}>{category}</option>
                    })}
                </select>
            </div>

            <div className="buttons">
                <button onClick={() => setStep(step - 1)}>Back</button>
                <button onClick={next}>Next</button>
            </div>
        </motion.div>
    )
}



function Step3() {

    const [alertState, setAlertState] = useState({
        state: false,
        severity: "info",
        msg: ""
    })

    const [tags, setTags] = useState([])
    const [step, setStep] = useContext(StepContext);
    const [loading, setLoading] = useState(false)
    const [eventCreator, setEventCreator] = useContext(EventCreatorContext)
    const authorizedState = useSelector(store => store.authorizedState)
    const {socket, isConnected} = useSocket();

    const websiteRef = useRef(null);
    const contactRef = useRef(null);

    const post = () => {
        if (isConnected) {
            const website = websiteRef.current.value;
            const contact = contactRef.current.value;

            let modifiedWebsite = website.includes("http") ? website : `http://${website}`;

            const event = JSON.parse(sessionStorage.getItem("event"));
            event.tags = tags;
            event.website = modifiedWebsite;
            event.contact = contact;
            event.admin = authorizedState.user.id
            event.dateCreated = new Date()

            let token = sessionStorage.getItem("token");

            if (token) {
                setLoading(true)
                socket.emit("/create/event", event)
                socket.on("/create/event/response", response => {
                    if (response.error) {
                        setAlertState({ state: true, severity: "error", msg: response.msg})
                    } else {
                        setAlertState({ state: true, severity: "success", msg: response.msg})
                        sessionStorage.removeItem("event");
                        setEventCreator(false)
                    }
                    setLoading(false)
                });
            }
        } else {
            setAlertState({ state: true, severity: "error", msg: "Something went wrong when connecting to server"})
        }
    }
    

    return ( <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: .5 }} exit={{ position: "absolute", scale: 0, opacity: 0, }} className="form-content">

            <Snackbar open={alertState.state} onClose={() => setAlertState({state: false, severity: "info", msg: ""})} autoHideDuration={5000} anchorOrigin={{ vertical: 'top', horizontal: 'top' }}>
                <Alert severity={alertState.severity}>{alertState.msg}</Alert>
            </Snackbar>

            <div className="input-area">
                <label htmlFor="tags">Tags (optional)</label>
                <p>Click enter after input to save tag</p>
                <TagInput block onChange={(e) => setTags(e)} />
            </div>

            <div className="input-area">
                <label htmlFor="website">Website (optional)</label>
                <input ref={websiteRef} type="text" id="website" />
            </div>

            <div className="input-area">
                <label htmlFor="contact">Contact (optional)</label>
                <input ref={contactRef} type="text" id="contact" />
            </div>

            <div className="buttons">
                <button onClick={() => setStep(step - 1)}>Back</button>
                { loading ? <button>Uploading...</button> : <button onClick={post}>Post Event</button> }
            </div>
        </motion.div>
    )
}