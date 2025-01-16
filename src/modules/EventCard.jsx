import { useContext, useEffect } from "react"
import "./styles/_event_card.scss"
import { BackendHost } from "../routes/routes"
import { EventViewContext, SelectedEventContext } from "../pages/EventPage"

export default function EventCard(props) {

    const [eventViewState, setEventViewState] = useContext(EventViewContext)
    const [selectedEvent, setSelectedEvent] = useContext(SelectedEventContext)

    const readmore = () => {
        setSelectedEvent(props.data)
        setEventViewState(true);
    }

    return (
        <div className="event-card">
            <div className="poster" style={{ backgroundImage: props.data && `url(${BackendHost}/${props.data.poster})` }}></div>

            <div className="content">
                <p className="date">{props.data && new Date(props.data.date).toLocaleString("us", { dateStyle: "long", timeStyle: "short" })}</p>
                <h1>{props.data && props.data.title}</h1>
                <div className="tags">
                    {
                        props.data && props.data.tags.length > 0 ? props.data.tags.map((data, key) => {
                            return <p key={key}>#{data}</p>
                        }) : <p style={{ color: "#999" }}>No tags</p>
                    }
                </div>
                <p className="description">{props.data && props.data.description}</p>
                <div className="footer">
                    <button onClick={readmore}>Read more <svg viewBox="0 0 24 24" width="1.5rem" height="1.5rem" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg> </button>
                </div>
            </div>
        </div>
    )
}