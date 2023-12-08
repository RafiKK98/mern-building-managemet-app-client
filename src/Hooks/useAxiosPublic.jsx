import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'https://building-managemet-app-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
}

export default useAxiosPublic