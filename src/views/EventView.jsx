import EventCard from "../modules/EventCard"
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion"

export default function EventView() {

    const pastRef = useRef();
    const upcomingRef = useRef();

    const scrollFRight = () => { upcomingRef.current.scrollBy(300, 0); }
    const scrollFLeft = () => { upcomingRef.current.scrollBy(-300, 0); }
    
    const scrollLRight = () => { pastRef.current.scrollBy(300, 0); }
    const scrollLLeft = () => { pastRef.current.scrollBy(-300, 0); }

    // useEffect(() => {
    //     handleResize()

    //     function handleResize(e) {
    //         let device_width = window.innerWidth

    //         if (device_width >= 1280) {
    //             let eventCard = document.querySelectorAll(".event-grid")

    //             eventCard.forEach((elem) => {
    //                 elem.firstChild.style.marginLeft = (device_width - 1280) / 2 + "px"
    //             })
    //         }
    //     }

    //     window.addEventListener('resize', handleResize)
    //     window.addEventListener('fullscreenchange', handleResize)
    //     window.addEventListener('orientationchange', handleResize)
    
    //     return () => {
    //         window.removeEventListener("resize", handleResize)
    //         window.removeEventListener("fullscreenchange", handleResize)
    //         window.removeEventListener("orientationchange", handleResize)
    //     }
    // }, [])

    return (
        <motion.div 
            initial={{
                scale: 2,
                opacity: 0
            }}
            whileInView={{
                scale: 1,
                opacity: 1
            }}
            transition={{
                duration: .5
            }}
        className="event-view">

            <div className="event-banner">
                <div className="container">
                    <div className="content">
                        <h1>The Event Hub: Your Source for All Events</h1>
                        <p>The Event Hub: Simplifying your event search and connecting you to experiences that matter.</p>
                        <button>Post An Event</button>
                    </div>
                </div>
            </div>

            <div className="search-area">
                <div className="input-area">
                    <svg width="2rem" height="2rem" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 11.1455C5.49956 8.21437 7.56975 5.69108 10.4445 5.11883C13.3193 4.54659 16.198 6.08477 17.32 8.79267C18.4421 11.5006 17.495 14.624 15.058 16.2528C12.621 17.8815 9.37287 17.562 7.3 15.4895C6.14763 14.3376 5.50014 12.775 5.5 11.1455Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.989 15.4905L19.5 19.0015" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    <input type="text" name="search" id="search" placeholder="Search for communities" />
                </div>
            </div>

            <div className="upcoming-event event-container">
                <div className="title-bar">
                    <h1>Upcoming Events</h1>
                    <div className="navigation">
                        <button onClick={scrollFLeft}><svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z" fill="currentColor"></path> </g></svg></button>
                        <button onClick={scrollFRight}><svg width="1rem" height="1rem"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
                    </div>
                </div>
                <div className="event-grid-container">
                    <div className="event-grid" ref={upcomingRef}>
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                    </div>
                </div>
            </div>

            <div className="past-event event-container">
                <div className="title-bar">
                    <h1>Past Events</h1>
                    <div className="navigation">
                        <button onClick={scrollLLeft}><svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z" fill="currentColor"></path> </g></svg></button>
                        <button onClick={scrollLRight}><svg width="1rem" height="1rem"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
                    </div>
                </div>
                <div className="event-grid-container">
                    <div className="event-grid" ref={pastRef}>
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                    </div>
                </div>
            </div>

        </motion.div>
    )
}