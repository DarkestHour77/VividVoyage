import { useEffect, useState } from "react";
import { Link, Outlet ,useLocation } from "react-router-dom";
import { Plane, User, LayoutDashboard  } from 'lucide-react';

function Navbar(){

    const location = useLocation();
    const [admin, setAdmin]= useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const logout = () =>{
        localStorage.clear();
        setIsLoggedIn(false);
        setAdmin(false)
    }

    useEffect(()=>{
        const isAdmin = localStorage.getItem("isAdmin")
        const isAdminParse = JSON.parse(isAdmin)
        setAdmin(isAdminParse)

        const response = localStorage.getItem('token')
        setIsLoggedIn(response)

         
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
                        
                {isLoggedIn ? 
                    <>  <li>
                        <p><User size={30} /></p>
                        <button onClick={()=>logout()} className="navbutton">LogOut</button>
                    </li>
                        <li>
                            <p><LayoutDashboard size={25} /></p>
                            <Link to="/flights/cities/dashboard">Dashboard</Link>
                        </li>
                    </>
                 :   
                    <>
                        <li>
                            <p><User size={30} /></p>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Register</Link>
                        </li>
                    </>
                }
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



