import { Helmet } from "react-helmet-async"
import AboutBuilding from "../AboutBuilding/AboutBuilding"
import Banner from "../Banner/Banner"
import LocationSection from "../LocationSection/LocationSection"
import { motion } from "framer-motion";

const HomePage = () => {
    return (
        <>
            <Helmet>
                <title>Nilufa Foundation | Home</title>
            </Helmet>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 1}}
            >
                <Banner />
                <AboutBuilding />
                <LocationSection />
            </motion.div>
        </>
    )
}

export default HomePage