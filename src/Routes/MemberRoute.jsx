import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useMember from "../Hooks/useMember";
import Skeleton from "react-loading-skeleton";

// eslint-disable-next-line react/prop-types
const MemberRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isMember, isMemberLoading] = useMember();
    const location = useLocation();

    if (loading || isMemberLoading) {
        return <Skeleton count={30}></Skeleton>
    }

    if (user && isMember) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>
}

export default MemberRoute