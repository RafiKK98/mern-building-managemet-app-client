
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    
    if(loading) {
        return <>
            <Skeleton count={10}></Skeleton>
        </>
    }

    if (user) {
        return children
    }

    return (
        <Navigate to="/login"></Navigate>
    )
}

export default PrivateRoute