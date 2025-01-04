import { TagInput } from "rsuite";
import 'rsuite/TagInput/styles/index.css';
import React, { useState , useContext} from "react";

const StepContext = React.createContext(null);

export default function EventCreator() {

    const [step, setStep] = useState(1);

    return (
        <div id="event-creator">
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

    return (
        <div className="form-content">
            <div className="input-area">
                <label htmlFor="title">Event Title</label>
                <input type="text" id="title" />
            </div>

            <div className="input-area">
                <label htmlFor="title">Date & Time</label>
                <input type="datetime-local" id="date" />
            </div>

            <div className="input-area">
                <label htmlFor="description">Description</label>
                <textarea id="textarea"></textarea>
            </div>

            <div className="buttons">
                <button>Cancel</button>
                <button onClick={() => setStep(step + 1)}>Next</button>
            </div>
        </div>
    )
}

function Step2() {

    const [step, setStep] = useContext(StepContext);

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

    return (
        <div className="form-content">
             <div className="image-area">
                <p>Event Poster</p>
                <label htmlFor="image">No image selected</label>
                <input type="file" id="image" />
            </div>

            <div className="input-area">
                <label htmlFor="location">Location/Venue</label>
                <input type="text" id="location" />
            </div>

            <div className="input-area">
                <label htmlFor="category">Category/Type</label>
                <select id="category">
                    {eventCategories.map((category, index) => {
                        return <option key={index} value={category}>{category}</option>
                    })}
                </select>
            </div>

            <div className="buttons">
                <button onClick={() => setStep(step - 1)}>Back</button>
                <button onClick={() => setStep(step + 1)}>Next</button>
            </div>
        </div>
    )
}

function Step3() {

    const [step, setStep] = useContext(StepContext);

    return (
        <div className="form-content">
            <div className="input-area">
                <label htmlFor="tags">Tags (optional)</label>
                <TagInput block />
            </div>

            <div className="input-area">
                <label htmlFor="website">Website (optional)</label>
                <input type="text" id="website" />
            </div>

            <div className="input-area">
                <label htmlFor="website">Contact (optional)</label>
                <input type="text" id="website" />
            </div>

            <div className="buttons">
                <button onClick={() => setStep(step - 1)}>Back</button>
                <button onClick={() => setStep(step + 1)}>Post Event</button>
            </div>
        </div>
    )
}