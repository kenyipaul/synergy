import { motion } from "framer-motion"

export default function EventBoard() {
    return (
        <div className="event-board">
            <motion.div 
                initial={{
                    opacity: 0,
                    height: 0
                }}
                whileInView={{
                    opacity: 1,
                    height: "auto",
                }}
                transition={{
                    duration: .5
                }}
            className="title-bar">
                <h1>Explore The Event Hub</h1>
                <p> Your comprehensive resource for finding and attending events of all types.</p>
            </motion.div>

            <div className="event-grid">
                
                <Event />
                <Event />
                <Event />
                <Event />
                <Event />
                <Event />

            </div>

            <motion.button
                initial={{
                    scale: 0
                }}
                whileInView={{
                    scale: 1
                }}
                transition={{
                    duration: .3
                }}
            >Post an Event</motion.button>
        </div>
    )
}


function Event() {
    return (
        <motion.div 
            initial={{
                opacity: 0,
                scale: 0
            }}
            animate={{
                opacity: 1,
                scale: 1
            }}
            transition={{
                duration: .5,
                ease: "backInOut"
            }}
        className="event"></motion.div>
    )
}