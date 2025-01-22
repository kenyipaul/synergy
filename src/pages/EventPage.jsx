import Axios from "axios"
import { io } from "socket.io-client";
import EventCard from "../modules/EventCard"
import { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import Footer from "../layout/Footer";
import EventCreator from "../creators/eventCreator";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";
import { BackendHost, eventsRoute } from "../routes/routes";

import { EventView } from "./components/event_components/event-view";
import { EventPlaceHolder, LoadingEvent } from "./components/event_components/event-components";
import { useSocket } from "../providers/socketProvider";

const LoadingContext = React.createContext(null)
export const EventViewContext = React.createContext(null)
export const EventCreatorContext = React.createContext(null);
export const SelectedEventContext = React.createContext(null);

export default function EventPage() {

    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [eventCreator, setEventCreator] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [eventViewState, setEventViewState] = useState(false)
    const {socket, isConnected} = useSocket();
    

    useEffect(() => {

        if (isConnected) {
            socket.emit("/fetch/events")
            socket.on("/fetch/events/response", response => {
                if (response.error) {
                    alert(response.msg)
                } else {
                    setLoading(false)
                    let eventData = response.data.reverse();
                    setEvents(eventData)
                }
            })
        }

    }, [isConnected, eventCreator])


    return (
        <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{ duration: .5 }} className="event-page">
            <SelectedEventContext.Provider value={[selectedEvent, setSelectedEvent]}>
                <EventCreatorContext.Provider value={[eventCreator, setEventCreator]}>
                    <EventViewContext.Provider value={[eventViewState, setEventViewState]}>
                        <LoadingContext.Provider value={[loading, setLoading]}>

                        <AnimatePresence> { eventCreator ? <EventCreator /> : null } </AnimatePresence>
                        <AnimatePresence> { eventViewState ? <EventView /> : null } </AnimatePresence>

                        <EventBanner data={events} />
                        <UpcomingEvents data={events} />
                        <PastEvents data={events} />
                        <Footer />

                        </LoadingContext.Provider>
                    </EventViewContext.Provider>
                </EventCreatorContext.Provider>
            </SelectedEventContext.Provider>
        </motion.div>
    )
}

function EventBanner(props) {
    const navigate = useNavigate();
    const authorizedState = useSelector(state => state.authorizedState)
    const [eventCreator, setEventCreator] = useContext(EventCreatorContext);

    return (
        <>
            <div className="event-banner">
                <div className="container">
                    <div className="content">
                        <h1>The Event Hub: Your Source for All Events</h1>
                        <p>The Event Hub: Simplifying your event search and connecting you to experiences that matter.</p>
                        <button onClick={() => {
                            authorizedState.authorized ? setEventCreator(true) : navigate("/login")
                        }}>Post An Event</button>
                    </div>
                </div>
            </div>
            
            <SearchArea data={props.data} />
        </>
    )
}


function SearchArea(props) {

    const [searchState, setSearchState] = useState(false)
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        if (props.data) {
            setSearchResults(props.data)
        }
    }, [props])

    const search = (e) => {
        let results = []
        const searchInput = e.target.value.toLowerCase()

        for (let i = 0; i < props.data.length; i++) {
            let title = props.data[i].title.toLowerCase()
            if (title.includes(searchInput)) {
                results.push(props.data[i])
            }
        }

        console.log(results)
        setSearchResults(results)
    }

    return (
        <div className={ searchState ? "search-area active" : "search-area"}>
            <div className="input-area">
                <svg className="searchBtn" width="2rem" height="2rem" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M5.5 11.1455C5.49956 8.21437 7.56975 5.69108 10.4445 5.11883C13.3193 4.54659 16.198 6.08477 17.32 8.79267C18.4421 11.5006 17.495 14.624 15.058 16.2528C12.621 17.8815 9.37287 17.562 7.3 15.4895C6.14763 14.3376 5.50014 12.775 5.5 11.1455Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M15.989 15.4905L19.5 19.0015" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                <svg onClick={() => setSearchState(false)} className="closeBtn" width="1.3rem" height="1.3rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="currentColor"></path> </g></svg>
                <input onInput={search} onFocus={() => setSearchState(true)} type="text" name="search" id="search" placeholder="Search for events" />
            </div>
            <div className="search-result-area">
                <h1 className="title">Search Results:</h1>
                <div className="event-list">
                    {
                        searchResults.map((data, key) => {
                            return <EventCard data={data} key={key} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}


function UpcomingEvents(props) {

    const upcomingRef = useRef();
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useContext(LoadingContext);

    useEffect(() => {
        let now = new Date().getTime();
        let past =  []

        props.data.map((data) => {

            let postedDate = new Date(data.date).getTime();
            let difference = now - postedDate

            if (difference < 0) {
                past.push(data)
            }

        })

        setResponse(past)

    }, [props.data])

    const scrollFRight = () => { upcomingRef.current.scrollBy(300, 0); }
    const scrollFLeft = () => { upcomingRef.current.scrollBy(-300, 0); }

    return (
        <div className="upcoming-event event-container">
            <div className="title-bar">
                <h1>Upcoming Events</h1>
                <div className="navigation">
                    <button onClick={scrollFLeft}><svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z" fill="currentColor"></path> </g></svg></button>
                    <button onClick={scrollFRight}><svg width="1rem" height="1rem"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></button>
                </div>
            </div>

            <div className="event-grid-container">
                <div className="event-grid" ref={upcomingRef}>
                    {
                        !loading ? 
                            response && response.length > 0 ? response.map((data, key) => {
                                return <EventCard data={data} key={key} />
                            }) : <EventPlaceHolder />
                            : <>
                            <LoadingEvent />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}


function PastEvents(props) {

    const pastRef = useRef(null);
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useContext(LoadingContext);

    const scrollLRight = () => { pastRef.current.scrollBy(300, 0); }
    const scrollLLeft = () => { pastRef.current.scrollBy(-300, 0); }

    useEffect(() => {
        let now = new Date().getTime();
        let past =  []

        props.data.map((data) => {

            let postedDate = new Date(data.date).getTime();
            let difference = now - postedDate

            if (difference > 0) {
                past.push(data)
            }

        })

        setResponse(past)

    }, [props.data])

    return (
        <div className="past-event event-container">
            <div className="title-bar">
                <h1>Past Events</h1>
                <div className="navigation">
                    <button onClick={scrollLLeft}><svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z" fill="currentColor"></path> </g></svg></button>
                    <button onClick={scrollLRight}><svg width="1rem" height="1rem"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></button>
                </div>
            </div>
            <div className="event-grid-container">
                <div className="event-grid" ref={pastRef}>
                    {
                        !loading ? 
                            response && response.length > 0 ? response.map((data, key) => {
                                return <EventCard data={data} key={key} />
                            }) : <EventPlaceHolder />
                            : <>
                            <LoadingEvent />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}