import { useEffect, useState } from "react";
import { Link, Outlet ,useLocation } from "react-router-dom";

function Navbar(){

    const location = useLocation();
    const [admin, setAdmin]= useState(false)
    

    useEffect(()=>{
        const isAdmin = localStorage.getItem("isAdmin")
        const isAdminParse = JSON.parse(isAdmin)
        setAdmin(isAdminParse)
    },[location])

    return(
        <div className="">
            <nav>
                <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/flights">Flights</Link>
                </li>
                <li>
                    <Link to="/hotels">Hotels</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/signup">SignIn</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                {admin === true ? 
                    <li>
                        <Link to="/adminpanel">Admin Panel</Link>
                    </li>
                : ""}
                </ul>
            </nav>

            <Outlet />
        </ div>
    )
}

export default Navbar;



