import { motion } from "framer-motion"

export default function JobPage() {
    return (
        <motion.div 
            initial={{scale: 0,}}
            whileInView={{scale: 1,}}
            transition={{duration: .5}}
        id="job-page">

            <div className="job-banner">
                <div className="banner">
                    <div className="content">
                        <h1>The Job Board: Find jobs that match your skills and experience.</h1>
                        <p>Find jobs that not only match your current skills and experience but also offer opportunities for growth and advancement.</p>
                        <button>Post A Job</button>
                    </div>
                </div>
            </div>

        </motion.div>
    )
}