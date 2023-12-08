import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const MakeAnnouncement = () => {

    const axiosSecure = useAxiosSecure();

    const handleAnnouncement = event => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        console.log(title, description);
        const announcement = {
            title: title,
            description: description
        }
        axiosSecure.post('/announcements', announcement)
        .then(res => {
            console.log(res.data);
            if (res.data.insertedId) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Announcement made successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            form.reset();
        })
    }


    return (
        <section className="my-10 w-2/3 mx-auto">
            <div className="text-center my-10">
                <h2 className="text-3xl font-medium bg-slate-500 py-5 rounded-md text-white">Make an Announcement</h2>
            </div>
            <motion.div 
                className="w-1/2 mx-auto mt-10"
                initial={{y: 500, opacity: 0.1}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.5}}
            >
                <form onSubmit={handleAnnouncement} className="space-y-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" name="title" placeholder="Announcement title" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24" name="description" placeholder="Announcement description"></textarea>
                    </div>
                    <div className="form-control">
                        <button className="btn btn-info uppercase text-white">Post</button>
                    </div>
                </form>
            </motion.div>
        </section>
    )
}

export default MakeAnnouncement