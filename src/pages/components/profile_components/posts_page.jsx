import Axios from "axios"
import "./styles/postPage.scss"
// import EventCard from "../../../modules/EventCard";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSocket } from "../../../providers/socketProvider";
import { BackendHost } from "../../../routes/routes";
import { motion } from "framer-motion";

const EventContext = React.createContext(null)

export default function PostsPage() {

    const commPostRef = useRef(null);
    const eventPostRef = useRef(null);

    const scrollCRight = () => { commPostRef.current.scrollBy(300, 0); }
    const scrollCLeft = () => { commPostRef.current.scrollBy(-300, 0); }

    const scrollERight = () => { eventPostRef.current.scrollBy(300, 0); }
    const scrollELeft = () => { eventPostRef.current.scrollBy(-300, 0); }

    const [events, setEvents] = useState([])
    const [communityPosts, setCommunityPosts] = useState([])
    const authorizedState = useSelector(store => store.authorizedState)
    const {socket, isConnected} = useSocket();

    useEffect(() => {

        if (isConnected) {
            socket.emit("user/event/posts", authorizedState.user.id)
            socket.on("user/event/posts/response", response => {
                if (response.error) {
                    alert(response.msg)
                } else {    
                    setEvents(response.data)
                }
            })

            socket.emit("user/community/posts", authorizedState.user.id)
            socket.on("user/community/posts/response", response => {
                if (response.error) {
                    alert(response.msg)
                } else {
                    setCommunityPosts(response.data)
                }
            })
        }

    }, [isConnected])

    return (
        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: .3 }} className="post-tab tab">
            <EventContext.Provider value={[events, setEvents]}>
            <div className="container">
                <div className="top-bar">
                    <h1>Posted Events</h1>

                    <div className="navigation">
                        <button onClick={scrollELeft}><svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z" fill="currentColor"></path> </g></svg></button>
                        <button onClick={scrollERight}><svg width="1rem" height="1rem"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></button>
                    </div>
                </div>
                <div className="content" ref={eventPostRef}>
                    {
                        events && events.length > 0 ? events.map((data, key) => {
                            return <EventCard data={data} key={key} />
                        }) : <EventPlaceholder />
                    }
                </div>
            </div>


            {/* <div className="container">
                <div className="top-bar">
                    <h1>Community Posts</h1>

                    <div className="navigation">
                        <button onClick={scrollCLeft}><svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z" fill="currentColor"></path> </g></svg></button>
                        <button onClick={scrollCRight}><svg width="1rem" height="1rem"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></button>
                    </div>
                </div>
                <div className="content" ref={commPostRef}>
                    {
                        communityPosts.map((data) => {
                            return <div className="community"></div>
                        })
                    }
                </div>
            </div> */}
            </EventContext.Provider>
        </motion.div>
    )
}

function EventCard(props) {

    const {socket, isConnected} = useSocket();
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useContext(EventContext)

    const deleteEvent = () => {
        if (confirm("Are you sure you want to delete this event?")) {
            setLoading(true)
            const id = props.data._id

            if (isConnected) {
                socket.emit("/delete/event", id)
                socket.on("/delete/event/response", response => {
                    if (response.error) {
                        alert(response.msg)
                    } else {
                        alert(response.msg)
                        setEvents(response.data)
                    }
                })
            } else {
                alert("Something went wrong when connecting to server")
            }
        }
    }

    return ( <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: .3 }} className="profileEventCard">
            <div className="banner" style={{
                backgroundImage: `url(${BackendHost}/${props.data.poster})`
            }}></div>
            <div className="body">
                <p className="date">{new Date(props.data.date).toLocaleString("us", { dateStyle: "long", timeStyle: "short" })}</p>
                <div className="tags">
                    {
                        props.data && props.data.tags.length > 0 ? props.data.tags.map((data, key) => {
                            return <p key={key}>#{data}</p>
                        }) : <p>No tags set</p>
                    }
                </div>
                <h1>{props.data.title}</h1>
                <p className="description">{props.data.description}</p>
            </div>
            <div className="footer">
                {/* <button>Edit</button> */}
                { loading ? <button>Deleting...</button> : <button onClick={deleteEvent}>Delete Event</button> }
            </div>
        </motion.div>
    )
}

function EventPlaceholder() {
    return (
        <div className="event-placeholder">
            <h1>No events</h1>
            <p>Looks like you have no posted events here</p>
        </div>
    )
}