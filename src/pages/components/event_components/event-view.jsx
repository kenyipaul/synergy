import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BackendHost } from "../../../routes/routes";
import { SelectedEventContext, EventViewContext } from "../../EventPage";

export function EventView() {

    const navigate = useNavigate();
    const [selectedEvent, setSelectedEvent] = useContext(SelectedEventContext);
    const [eventViewState, setEventViewState] = useContext(EventViewContext);

    return selectedEvent && (
        <div className="event-view" style={{
            backgroundImage: selectedEvent && `url(${BackendHost}/${selectedEvent.poster})`
        }}>
            <svg onClick={() => setEventViewState(false)} className="closeBtn" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
            <div className="container">

                <div className="banner" style={{
                    backgroundImage: selectedEvent && `url(${BackendHost}/${selectedEvent.poster})`
                }}></div>
                <div className="top-bar">
                    <div>
                        <h1>{selectedEvent.title}</h1>
                        <p>{selectedEvent.category}</p>
                    </div>
                    {
                        selectedEvent.website && <button>Visit Website</button>
                    }
                </div>
                <div className="tags">
                    {
                        selectedEvent.tags.map((data, key) => {
                            return <p key={key}>#{data}</p>
                        })
                    }
                </div>
                <div className="content">
                    <p>{selectedEvent.description}</p>

                    <ul>
                        <li><b>Contact: </b>{selectedEvent.contact || "Unavailable"}</li>
                        <li><b>Venue/Location: </b>{selectedEvent.location || "Unavailable"}</li>
                        <li><b>Date: </b>{selectedEvent.date || "Unavailable"}</li>
                    </ul>
                    <ul>
                        <li><b>Date Posted: </b>{selectedEvent.createdAt}</li>
                    </ul>
                </div>

            </div>
        </div>
    )
}