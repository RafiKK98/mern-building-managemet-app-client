import { Watch } from "react-loader-spinner";
import useAnnouncements from "../../../../Hooks/useAnnouncements"
import { motion } from "framer-motion";
const Announcements = () => {

    const [ announcements, loading ] = useAnnouncements();

    return (
        <section className="my-10 w-2/3 mx-auto">
            <div className="text-center my-10">
                <h2 className="text-3xl font-medium bg-slate-500 py-5 rounded-md text-white">Announcements</h2>
            </div>
            <motion.div 
                className="table"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 1}}
                >
                { 
                    loading ? 
                    <Watch
                        height="80"
                        width="80"
                        radius="48"
                        color="#0891b2"
                        ariaLabel="watch-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
                    :
                    announcements.map((announcement) => (
                        <div key={announcement._id} className="flex items-center gap-5 px-4 py-5 border-2 rounded-lg text-xl mb-5">
                            {/* <p className="font-medium">{idx + 1}</p> */}
                            <div className="flex flex-col flex-1 gap-5">
                                <h2 className="font-semibold text-center w-full">{announcement.title}</h2>
                                <div className="divider my-0"></div>
                                <p className="font-normal text-justify">{announcement.description}</p>
                            </div>
                        </div>
                    )) 
                }
            </motion.div>
        </section>
    )
}

export default Announcements