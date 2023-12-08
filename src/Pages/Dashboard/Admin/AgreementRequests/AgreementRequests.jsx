import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Watch } from "react-loader-spinner";

const AgreementRequests = () => {
    const axiosSecure = useAxiosSecure();

    const {data: agreements = [], isLoading: loading } = useQuery({
        queryKey: ['agreements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/agreements');
            return res.data;
        }
    });

    const handleAgreementAccept = async (id, email) => {
        console.log('Accept ', id, email);
        const res = await axiosSecure.patch(`/agreements-accept/${id}/${email}`);
        if (res.data) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Agreement accepted!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    const handleAgreementReject = async (id, email) => {
        console.log('Reject ', id, email);
        const res = await axiosSecure.patch(`/agreements-reject/${id}`);
        if (res.data) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Agreement rejected!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }


    return (
        <section className="my-10 w-2/3 mx-auto">
            <div className="text-center my-10">
                <h2 className="text-3xl font-medium bg-slate-500 py-5 rounded-md text-white">Agreement Requests</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User <br />name</th>
                            <th>User <br />email</th>
                            <th>Floor no</th>
                            <th>Block name</th>
                            <th>Room no</th>
                            <th>Rent</th>
                            <th>Agreement <br />request date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
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
                        <tbody>
                        {
                            agreements.map((agreement, agreementIdx) => (
                                <tr key={agreement._id}>
                                    <th>
                                        { agreementIdx + 1}
                                    </th>
                                    <td>
                                        { agreement.username }
                                    </td>
                                    <td>
                                        { agreement.email }
                                    </td>
                                    <td>
                                        { agreement.floor_no }
                                    </td>
                                    <td>
                                        { agreement.block_name }
                                    </td>
                                    <td>
                                        { agreement.apartment_no }
                                    </td>
                                    <td>
                                        { agreement.rent }
                                    </td>
                                    <td>
                                        { agreement?.agreementDate }
                                    </td>
                                    <td>
                                        { agreement?.status.charAt(0).toUpperCase() + agreement?.status.slice(1) }
                                    </td>
                                    <th className="flex gap-2">
                                        { 
                                            agreement?.status == 'checked' ? 
                                            <>
                                                <button onClick={() => handleAgreementAccept(agreement._id, agreement.email)} className="btn btn-success btn-disabled">
                                                    Accept
                                                </button>
                                                <button onClick={() => handleAgreementReject(agreement._id, agreement.email)} className="btn btn-error btn-disabled">
                                                    Reject
                                                </button>
                                            </>
                                            :
                                            <>
                                                <button onClick={() => handleAgreementAccept(agreement._id, agreement.email)} className="btn btn-success">
                                                    Accept
                                                </button>
                                                <button onClick={() => handleAgreementReject(agreement._id, agreement.email)} className="btn btn-error">
                                                    Reject
                                                </button>
                                            </>
                                        }
                                    </th>
                                </tr>
                            ))
                        }
                        </tbody>
                    }
                    
                </table>
            </div>
        </section>
    )
}

export default AgreementRequests