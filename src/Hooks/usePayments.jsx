import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"
import useAuth from "./useAuth";

const usePayments = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: paymentHistory = [], refetch } = useQuery({
        queryKey: ['payments', user?.email ],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    })

    return [paymentHistory, refetch ];
}

export default usePayments