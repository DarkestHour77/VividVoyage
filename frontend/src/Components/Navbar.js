import { useEffect, useState } from "react";
import { Link, Outlet ,useLocation } from "react-router-dom";
import { Plane, User } from 'lucide-react';

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
                <li className="logo">
                    <Link to="/">{<img src="/Images/logo.png" />}</Link>
                </li>
                <li>
                    <p><Plane size={30} /></p>
                    <Link to="/flights">Flights</Link>
                </li>
                <li>
                    <p><User size={30} /></p>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/signup">Register</Link>
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



