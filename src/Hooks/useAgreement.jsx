import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAgreement = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: agreement = {}, isPending: agreementLoading } = useQuery({
        queryKey: [user?.email, 'agreements'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/agreements/${user.email}`);
            return res.data;
        }
    });
    return [agreement, agreementLoading]
}

export default useAgreement