import { Outlet } from "react-router-dom"
import Navbar from "../Pages/Shared/Navbar/Navbar"
import Footer from "../Pages/Shared/Footer/Footer"

function Main() {

    return (
        <main className="max-w-7xl mx-auto">
            <Navbar />
            <Outlet />
            <Footer />
        </main>
    )
}

export default Main
