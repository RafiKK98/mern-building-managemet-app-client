import useAuth from "../../../../Hooks/useAuth"
import useMember from "../../../../Hooks/useMember";
import useAgreement from "../../../../Hooks/useAgreement";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const MyProfile = () => {

    const { user } = useAuth();
    const [isMember, isMemberLoading] = useMember();
    const [ agreement, agreementLoading ] = useAgreement();


    return (
        <div className="my-10 w-2/3 mx-auto">
            <div className="text-center my-10">
                <h2 className="text-3xl font-medium bg-slate-500 py-5 rounded-md text-white">User Profile</h2>
            </div>
            <div className="flex gap-14">
                <figure className="h-96">
                    <img className="mask mask-square w-full h-full rounded-md" src={user.photoURL} alt="" />
                </figure>
                <div className="space-y-5 flex flex-col justify-center">
                    <h3 className="text-2xl">User name: { user.displayName }</h3>
                    <h3 className="text-2xl">Email: { user.email }</h3>
                    {
                        isMember ? 
                        <>
                            {
                                isMemberLoading ? <Skeleton count={5} />
                                :
                                <>
                                    <h3 className="text-2xl">Rented Floor no: {agreementLoading ? <span className="loading loading-spinner loading-lg"></span> : agreement.floor_no}</h3>
                                    <h3 className="text-2xl">Rented Block name: {agreementLoading ? <span className="loading loading-spinner loading-lg"></span> : agreement.block_name}</h3>
                                    <h3 className="text-2xl">Rented Apartment no: {agreementLoading ? <span className="loading loading-spinner loading-lg"></span> : agreement.apartment_no}</h3>
                                </>
                            }
                            
                        </>
                        :
                        <>
                            <h3 className="text-2xl">Rented Floor no: None</h3>
                            <h3 className="text-2xl">Rented Block name: None</h3>
                            <h3 className="text-2xl">Rented Apartment no: None</h3>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default MyProfile