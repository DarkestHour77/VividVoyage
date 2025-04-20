import { Link, Outlet } from "react-router-dom";

function Navbar(){
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
                </ul>
            </nav>

            <Outlet />
        </ div>
    )
}

export default Navbar;



