import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import HomePage from "../Pages/HomePage/HomePage/HomePage";
import Apartment from "../Pages/Apartment/Apartment";
import Dashboard from "../Layout/Dashboard";
import Announcements from "../Pages/Dashboard/User/Announcements/Announcements";
import MyProfile from "../Pages/Dashboard/User/MyProfile/MyProfile";
import MakePayment from "../Pages/Dashboard/Member/MakePayment/MakePayment";
import PaymentHistory from "../Pages/Dashboard/Member/PaymentHistory/PaymentHistory";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile/AdminProfile";
import AgreementRequests from "../Pages/Dashboard/Admin/AgreementRequests/AgreementRequests";
import MakeAnnouncement from "../Pages/Dashboard/Admin/MakeAnnouncement/MakeAnnouncement";
import ManageCoupons from "../Pages/Dashboard/Admin/ManageCoupons/ManageCoupons";
import ManageMembers from "../Pages/Dashboard/Admin/ManageMembers/ManageMembers";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import MemberRoute from "./MemberRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/apartments',
                element: <Apartment />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ],
        errorElement: <ErrorPage />
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            // user routes
            {
                path: '',
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute> // dynamic route
            },
            {
                path: 'announcements',
                element: <PrivateRoute><Announcements /></PrivateRoute>
            },
            // member routes
            {
                path: 'make-payment',
                element: <MemberRoute><MakePayment /></MemberRoute>
            },
            {
                path: 'payment-history',
                element: <MemberRoute><PaymentHistory /></MemberRoute>
            },
            // admin routes
            {
                path: 'admin-profile',
                element: <AdminRoute><AdminProfile /></AdminRoute>
            },
            {
                path: 'agreement-requests',
                element: <AdminRoute><AgreementRequests /></AdminRoute>
            },
            {
                path: 'make-announcement',
                element: <AdminRoute><MakeAnnouncement /></AdminRoute>
            },
            {
                path: 'manage-coupons',
                element: <AdminRoute><ManageCoupons /></AdminRoute>
            },
            {
                path: 'manage-members',
                element: <AdminRoute><ManageMembers /></AdminRoute>
            },
        ]
    },
]);

export default router;