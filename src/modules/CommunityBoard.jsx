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
                <motion.div 
                    initial={{
                        rotate: 0,
                        opacity: 0,
                        translateY: "-7rem"
                    }}
                    animate={{
                        rotate: 5,
                        opacity: 1,
                        translateY: "0"
                    }}
                    transition={{
                        duration: .5,
                        ease: "backInOut"
                    }}
                className="community">
                    <h1>Gaming Club</h1>
                </motion.div>

                <motion.div 
                    initial={{
                        rotate: 0,
                        opacity: 0,
                        translateY: "-7rem"
                    }}
                    animate={{
                        rotate: -5,
                        opacity: 1,
                        translateY: "0"
                    }}
                    transition={{
                        duration: .5,
                        ease: "backInOut"
                    }}
                className="community">
                    <h1>Programming Club</h1>
                </motion.div>

                <motion.div 
                    initial={{
                        rotate: 0,
                        opacity: 0,
                        translateY: "-7rem"
                    }}
                    animate={{
                        rotate: 5,
                        opacity: 1,
                        translateY: "0"
                    }}
                    transition={{
                        duration: .5,
                        ease: "backInOut"
                    }}
                className="community">
                    <h1>Party Club</h1>
                </motion.div>

                <motion.div 
                    initial={{
                        rotate: 0,
                        opacity: 0,
                        translateY: "-7rem"
                    }}
                    animate={{
                        rotate: -5,
                        opacity: 1,
                        translateY: "0"
                    }}
                    transition={{
                        duration: .5,
                        ease: "backInOut"
                    }}
                className="community">
                    <h1>Engineers Club</h1>
                </motion.div>

                <motion.div 
                    initial={{
                        rotate: 0,
                        opacity: 0,
                        translateY: "-7rem"
                    }}
                    animate={{
                        rotate: 5,
                        opacity: 1,
                        translateY: "0"
                    }}
                    transition={{
                        duration: .5,
                        ease: "backInOut"
                    }}
                className="community">
                    <h1>Science Club</h1>
                </motion.div>

                <motion.div 
                    initial={{
                        rotate: 0,
                        opacity: 0,
                        translateY: "-7rem"
                    }}
                    animate={{
                        rotate: -5,
                        opacity: 1,
                        translateY: "0"
                    }}
                    transition={{
                        duration: .5,
                        ease: "backInOut"
                    }}
                className="community">
                    <h1>Food & Drinks</h1>
                </motion.div>

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
            >Create Your Community</motion.button>
        </div>
    )
}