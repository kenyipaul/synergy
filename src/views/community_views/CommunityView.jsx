import { motion } from "framer-motion"
import Footer from "../../modules/Footer"
import { Outlet } from "react-router-dom";

export default function CommunityView() {
    return (
        <motion.div initial={{ scale: 2, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: .5 }} id="community-view">
            <Outlet />
            <Footer />
        </motion.div>
    )
}