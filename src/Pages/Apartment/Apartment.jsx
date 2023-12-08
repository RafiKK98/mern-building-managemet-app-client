import { Helmet } from "react-helmet-async";
import useApartments from "../../Hooks/useApartments"
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useMember from "../../Hooks/useMember";
import useAdmin from "../../Hooks/useAdmin";
import moment from "moment";
import { Hourglass } from "react-loader-spinner";
import { motion } from "framer-motion";

const Apartment = () => {

    const [ apartments, loading ] = useApartments();
    const { user } = useAuth();
    const [ isMember ] = useMember();
    const [ isAdmin ] = useAdmin();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleAgreement = id => {
        if (!user) {
            navigate('/login');
        }
        if (isMember || isAdmin) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Members or admin cannot rent apartments!',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        const filteredApartment = apartments.filter(apartment => apartment._id == id);
        const agreementData = {
            username: user.displayName,
            email: user.email,
            floor_no: filteredApartment[0].floor_no,
            block_name: filteredApartment[0].block_name,
            apartment_no: filteredApartment[0].apartment_no,
            rent: filteredApartment[0].rent_price,
            status: 'pending',
            agreementDate: moment().format('Do-MMM-YYYY')
        }
        console.log(agreementData);
        axiosPublic.post('/agreements', agreementData)
        .then(res => {
            console.log(res.data);
            if (res.data.insertedId) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Agreement done!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }

    return (
        <>
            <Helmet>
                <title>Nilufa Foundation | Apartments</title>
            </Helmet>
            <section>
                <div>
                    <h2 className="text-3xl text-center my-10">Available Apartments</h2>
                </div>
                {
                    loading ? <Hourglass
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        colors={['#0891b2', '#0e7490']}
                    />
                    :
                    <motion.div className="overflow-x-auto"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 1}}
                        >
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Floor no</th>
                                    <th>Block name</th>
                                    <th>Apartment no</th>
                                    <th>Rent</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {/* row 1 */}
                            {
                                apartments.map((apartment, index) => (
                                    <tr key={apartment._id}>
                                        <th>
                                        { index + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-square w-20 h-20">
                                                        <img src={apartment.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            { apartment.floor_no }
                                        </td>
                                        <td>
                                            { apartment.block_name }
                                        </td>
                                        <td>
                                            { apartment.apartment_no }
                                        </td>
                                        <td>
                                            ${ apartment.rent_price }
                                        </td>
                                        <th>
                                            <button onClick={() => handleAgreement(apartment._id)} className="btn btn-info btn-sm">Agreement</button>
                                        </th>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </motion.div>
                }
            </section>
        </>
    )
}

export default Apartment