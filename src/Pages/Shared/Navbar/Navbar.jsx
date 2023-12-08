import { Link, NavLink } from "react-router-dom"
import logo from "../../../assets/siteLogo.png";
import useAuth from "../../../Hooks/useAuth";
import useAdmin from "../../../Hooks/useAdmin";
import Swal from "sweetalert2";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [ isAdmin ] = useAdmin();

    const navOptions = <>
        <li className="mx-2"><NavLink to="/">Home</NavLink></li>
        <li className="mx-2"><NavLink to="/apartments">Apartments</NavLink></li>
    </>

    const handleLogout = () => {
        logOut()
            .then(() => { 
                console.log(`User logged out`);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User logged out successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => console.log(error));
    }


    return (
        <div className="navbar bg-cyan-600">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            navOptions
                        }
                    </ul>
                </div>
                <Link to="/" className="text-xl flex flex-col items-center">
                    <img src={logo} className="mask mask-square w-12 h-12" alt="" />
                    <p>Nilufa Foundation</p>
                </Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        navOptions
                    }
                </ul>
                {
                    user ? 
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    {user.displayName}
                                </a>
                            </li>
                            <li><Link to={ isAdmin ? "/dashboard/admin-profile" : "/dashboard"}>Dashboard</Link></li>
                            <li onClick={handleLogout}><a>Logout</a></li>
                        </ul>
                    </div>
                    :
                    <div>
                        <Link to="/login" className="btn">Login</Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar