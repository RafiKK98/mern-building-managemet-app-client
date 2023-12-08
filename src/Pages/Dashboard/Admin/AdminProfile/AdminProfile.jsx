import useApartments from "../../../../Hooks/useApartments";
import useAuth from "../../../../Hooks/useAuth"
import { motion } from "framer-motion";

const AdminProfile = () => {

    const { user } = useAuth();
    const [apartments] = useApartments();


    return (
        <div className="my-10 w-2/3 mx-auto">
            <div className="text-center my-10">
                <h2 className="text-3xl font-medium bg-slate-500 py-5 rounded-md text-white">Admin Profile</h2>
            </div>
            <motion.div 
                className="flex gap-14"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.4}}
                >
                <figure className="h-96">
                    <img className="mask mask-square w-full h-full rounded-md" src={user.photoURL} alt="" />
                </figure>
                <div className="space-y-5 flex flex-col justify-center">
                    <h3 className="text-2xl">User name: { user.displayName }</h3>
                    <h3 className="text-2xl">Email: { user.email }</h3>
                    <h3 className="text-2xl">Total no of rooms: { apartments.length }</h3>
                </div>
            </motion.div>
        </div>
    )
}

export default AdminProfile