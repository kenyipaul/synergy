import Axios from "axios"
import { TagInput } from "rsuite";
import 'rsuite/TagInput/styles/index.css';
import React, { useState , useContext, useRef, useEffect} from "react";
import { EventCreatorContext } from "../pages/EventPage";
import { BackendHost, eventRoute } from "../routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client"
import { setUpdater } from "../store/states/updaterState";

const StepContext = React.createContext(null);

export default function EventCreator() {

    const [step, setStep] = useState(1);
    const [eventCreator, setEventCreator] = useContext(EventCreatorContext)

    return (
        <div id="event-creator">

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
                    { step === 1 ? <Step1 /> : step === 2 ? <Step2 /> : <Step3 /> }
                </div>
                </StepContext.Provider>

            </div>
        </div>
    )
}


function Step1() {

    const [step, setStep] = useContext(StepContext);
    const [eventCreator, setEventCreator] = useContext(EventCreatorContext)

    const titleRef = useRef(null);
    const dateRef = useRef(null);
    const descriptionRef = useRef(null);

    const next = () => {
        const title = titleRef.current.value;
        const date = dateRef.current.value;
        const description = descriptionRef.current.value;

        if (title && date && description) {
            const event = { title, date, description }
            sessionStorage.setItem("event", JSON.stringify(event));
            setStep(step + 1);
        } else {
            alert("Please fill out all fields.")
        }

    }

    return (
        <div className="form-content">
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
        </div>
    )
}

function Step2() {

    const [step, setStep] = useContext(StepContext);
    const [selectedImage, setSelectedImage] = useState("No image selected");

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

        if (image.size < 3000000) {

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
                    alert("Please fill out the fields.")
                }
            }
            
        } else {
            alert("Selected image is too large, try an image less than 3MB")
        }

    }

    return (
        <div className="form-content">
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
        </div>
    )
}

function Step3() {

    const socket = useRef();
    const [tags, setTags] = useState([])
    const [step, setStep] = useContext(StepContext);
    const [eventCreator, setEventCreator] = useContext(EventCreatorContext)
    const authorizedState = useSelector(store => store.authorizedState)

    const websiteRef = useRef(null);
    const contactRef = useRef(null);

    useEffect(() => {
        socket.current = io(BackendHost);
    }, [])

    const post = () => {
        const website = websiteRef.current.value;
        const contact = contactRef.current.value;

        const event = JSON.parse(sessionStorage.getItem("event"));
        event.tags = tags;
        event.website = website;
        event.contact = contact;
        event.admin = authorizedState.user.id

        let token = sessionStorage.getItem("token");

        if (token) {
            Axios({
                method: "POST",
                url: eventRoute,
                data: event,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) => {
                if (response.data.acknowledged) {
                    alert("Event posted successfully")
                    sessionStorage.removeItem("event");
                    setEventCreator(false)                    
                }
            })
        }
    }
    
    const dispatch  = useDispatch();
    const updaterState = useSelector(store => store.updaterState);
    
    useEffect(() => {
        socket.current.on('event-uploaded', () => {
            dispatch(setUpdater(!updaterState))
        })
    })

    return (
        <div className="form-content">
            <div className="input-area">
                <label htmlFor="tags">Tags (optional)</label>
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
                <button onClick={post}>Post Event</button>
            </div>
        </div>
    )
}