import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Rings } from "react-loader-spinner";

const ManageMembers = () => {

    const axiosSecure = useAxiosSecure();

    const {data: users = [], isLoading: usersLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axiosSecure.get('/users');
            return response.data;
        }
    })

    const handleRemoveMemberRole = async (id) => {
        const res = await axiosSecure.patch(`/member-remove/${id}`);
        if (res.data) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Member removed!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <section className="my-10 w-2/3 mx-auto">
            <div className="text-center my-10">
                <h2 className="text-3xl font-medium bg-slate-500 py-5 rounded-md text-white">Manage Members</h2>
            </div>
            <motion.div 
                className="overflow-x-auto"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.4}}
                >
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User name</th>
                            <th>User email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        usersLoading ? 
                        <Rings
                            height="80"
                            width="80"
                            color="#0891b2"
                            radius="6"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="rings-loading"
                        />
                        :
                        <tbody>
                        {
                            users.map((user, userIdx) => (
                                <tr key={user._id}>
                                    <th>
                                        { userIdx + 1}
                                    </th>
                                    <td>
                                        { user.name }
                                    </td>
                                    <td>
                                        { user.email }
                                    </td>
                                    <td>
                                        { user.role.charAt(0).toUpperCase() + user.role.slice(1) }
                                    </td>
                                    <th>
                                        {
                                            user.role == 'user' || user.role == 'admin' ? 
                                            <button className="btn btn-error btn-sm btn-disabled">Remove</button>
                                            :
                                            <button onClick={() => handleRemoveMemberRole(user._id)} className="btn btn-error btn-sm">Remove</button>
                                        }
                                    </th>
                                </tr>
                            ))
                        }
                        </tbody>
                    }
                </table>
            </motion.div>
        </section>
    )
}

export default ManageMembers