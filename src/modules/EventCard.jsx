import { useContext, useEffect } from "react"
import "./styles/_event_card.scss"
import { BackendHost } from "../routes/routes"
import { EventViewContext, SelectedEventContext } from "../pages/EventPage"

export default function EventCard(props) {

    useEffect(() => {
        console.log(props.data)
    }, [])

    const [eventViewState, setEventViewState] = useContext(EventViewContext)
    const [selectedEvent, setSelectedEvent] = useContext(SelectedEventContext)

    const readmore = () => {
        setSelectedEvent(props.data)
        setEventViewState(true);
    }

    return (
        <div className="event-card">
            <div className="poster" style={{
                backgroundImage: props.data && `url(${BackendHost}/${props.data.poster})`
            }}></div>
            <div className="content">
                <p className="date">{props.data && new Date(props.data.date).toLocaleString()}</p>
                <h1>{props.data && props.data.title}</h1>
                <div className="tags">
                    {
                        props.data && props.data.tags.map((data, key) => {
                            return <p key={key}>#{data}</p>
                        })
                    }
                </div>
                <p className="description">{props.data && props.data.description}</p>
                <div className="footer">
                    <button onClick={readmore}>Read more <svg viewBox="0 0 24 24" width="1.5rem" height="1.5rem" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg> </button>
                    <svg width="1.7rem" height="1.7rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 16.0909V11.0975C21 6.80891 21 4.6646 19.682 3.3323C18.364 2 16.2426 2 12 2C7.75736 2 5.63604 2 4.31802 3.3323C3 4.6646 3 6.80891 3 11.0975V16.0909C3 19.1875 3 20.7358 3.73411 21.4123C4.08421 21.735 4.52615 21.9377 4.99692 21.9915C5.98402 22.1045 7.13673 21.0849 9.44216 19.0458C10.4612 18.1445 10.9708 17.6938 11.5603 17.5751C11.8506 17.5166 12.1494 17.5166 12.4397 17.5751C13.0292 17.6938 13.5388 18.1445 14.5578 19.0458C16.8633 21.0849 18.016 22.1045 19.0031 21.9915C19.4739 21.9377 19.9158 21.735 20.2659 21.4123C21 20.7358 21 19.1875 21 16.0909Z" stroke="currentColor" strokeWidth="1.5"></path> <path d="M15 6H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                </div>
            </div>
        </div>
    )
}




// }
// export default function EventCard() {
//     return (
//         <div className="event-card">
//             <div className="poster"></div>
//             <div className="content">
//                 <p className="date">Fri Jul 5th 2001</p>
//                 <h1>The Lumina Arts Festival</h1>
//                 <div className="tags">
//                     <p>#creativity</p>
//                     <p>#festival</p>
//                     <p>#art</p>
//                 </div>
//                 <p className="description">Illuminate your senses at The Lumina Arts Festival! ✨ Join us for a celebration of creativity, light, and inspiration. [12/25/2001/Rwanda - Kigali] #LuminaArtsFestival #ArtFestival #LightArt #Creativity</p>
//                 <div className="footer">
//                     <button>Read more <svg viewBox="0 0 24 24" width="1.5rem" height="1.5rem" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg> </button>
//                     <svg width="1.7rem" height="1.7rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 16.0909V11.0975C21 6.80891 21 4.6646 19.682 3.3323C18.364 2 16.2426 2 12 2C7.75736 2 5.63604 2 4.31802 3.3323C3 4.6646 3 6.80891 3 11.0975V16.0909C3 19.1875 3 20.7358 3.73411 21.4123C4.08421 21.735 4.52615 21.9377 4.99692 21.9915C5.98402 22.1045 7.13673 21.0849 9.44216 19.0458C10.4612 18.1445 10.9708 17.6938 11.5603 17.5751C11.8506 17.5166 12.1494 17.5166 12.4397 17.5751C13.0292 17.6938 13.5388 18.1445 14.5578 19.0458C16.8633 21.0849 18.016 22.1045 19.0031 21.9915C19.4739 21.9377 19.9158 21.735 20.2659 21.4123C21 20.7358 21 19.1875 21 16.0909Z" stroke="currentColor" strokeWidth="1.5"></path> <path d="M15 6H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
//                 </div>
//             </div>
//         </div>
//     )
// }