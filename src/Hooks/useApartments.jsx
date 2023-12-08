import useAxiosPublic from "./useAxiosPublic"
import { useQuery } from "@tanstack/react-query";

const useApartments = () => {

    const axiosPublic = useAxiosPublic();

    const {data: apartments = [], isLoading: loading } = useQuery({
        queryKey: ['apartments'],
        queryFn: async () => {
            const res = await axiosPublic.get('/apartments');
            return res.data;
        }
    })

    return [apartments, loading];
}

export default useApartments