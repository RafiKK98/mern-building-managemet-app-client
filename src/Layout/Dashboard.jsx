import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaNewspaper } from "react-icons/fa";
import useAdmin from "../Hooks/useAdmin";
import useMember from "../Hooks/useMember";

const Dashboard = () => {

    const [ isAdmin ] = useAdmin();
    const [ isMember ] = useMember();

    

    return (
        <main className="flex flex-row">
            <div className="w-64 min-h-screen bg-cyan-600">
                <ul className="menu">
                    <>
                        {
                            !isAdmin && <>
                                <li>
                                    <NavLink to="/dashboard">
                                        <FaHome></FaHome>
                                        My Profile</NavLink>
                                </li>
                            </>
                        }
                        <li>
                            <NavLink to="/dashboard/announcements">
                                <FaNewspaper></FaNewspaper>
                                Announcements</NavLink>
                        </li>
                        {
                            isMember && <>
                                <li>
                                    <NavLink to="/dashboard/make-payment">
                                        <FaHome></FaHome>
                                        Make Payment</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/payment-history">
                                        <FaHome></FaHome>
                                        Payment History</NavLink>
                                </li>
                            </>
                        }
                        {
                            isAdmin && <>
                                <li>
                                    <NavLink to="/dashboard/admin-profile">
                                        <FaHome></FaHome>
                                        Admin Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-members">
                                        <FaHome></FaHome>
                                        Manage Members</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/make-announcement">
                                        <FaHome></FaHome>
                                        Make Announcement</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/agreement-requests">
                                        <FaHome></FaHome>
                                        Agreement Requests</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-coupons">
                                        <FaHome></FaHome>
                                        Manage Coupons</NavLink>
                                </li>
                            </>
                        }
                        <li>
                            <NavLink to="/">
                                <FaHome></FaHome>
                                Home</NavLink>
                        </li>
                    </>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet />
            </div>
        </main>
    )
}

export default Dashboard