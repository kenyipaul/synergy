import { motion } from "framer-motion"

export default function CommunityBoard() {
    return (
        <div className="community-board">
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
                <h1>Welcome To Our Community</h1>
                <p>We believe in the power of working together. Welcome to our community of synergy.</p>
            </motion.div>
            <div className="community-grid">

                <Community title="Gaming Club" />
                <Community title="Programming Club" />
                <Community title="Party Club" />
                <Community title="Engineers Club" />
                <Community title="Science Club" />
                <Community title="Food & Drinks" />

            </div>

            <button>Create Your Community</button>
        </div>
    )
}

function Community(props) {
    return (
        <div className="community"> <h1>{props.title}</h1> </div>
    )
}