import { useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EventCreatorContext } from "../../EventPage";

export function EventPlaceHolder() {

    const navigate = useNavigate();
    const authorizedState = useSelector(state => state.authorizedState)
    const [eventCreator, setEventCreator] = useContext(EventCreatorContext);

    return (
        <div className="no-event-placeholder">
        <h1>No Events</h1>
        <p>There are currently no upcoming events on this page, create one by clicking the button below.</p>
        <button onClick={() => {
            authorizedState.authorized ? setEventCreator(true) : navigate("/login")
        }}>Post An Event</button>
        </div>
    )
}

export function LoadingEvent() {
    return (
        <div className="loading-event">
            <div className="slider"></div>
            <h1>Loading...</h1>
        </div>
    )
}