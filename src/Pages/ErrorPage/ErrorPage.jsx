import { motion } from "framer-motion"
import Navbar from "../Shared/Navbar/Navbar"
import Footer from "../Shared/Footer/Footer"
import error404 from "/error404.png";

const ErrorPage = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Navbar />
            <motion.section
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 1}}
                >
                <img src={error404} alt="" />
            </motion.section>
            <Footer />
        </div>
    )
}

export default ErrorPage