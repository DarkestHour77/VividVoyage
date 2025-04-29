import { BrowserRouter, Routes, Route } from "react-router-dom";
import Flights from "./Flights";
import Navbar from "./Navbar";
import Planes from "./Planes";
import Loginpage from "./Loginpage";
import SignInpage from "./SignInpage";
import Bookings from "./Bookings";
import Adminpanel from "./Adminpanel";
import Dashboard from "./Dashboard";

function Router(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route path="/" element={<Flights />} />
                        <Route path="/flights" element={<Flights />} />
                        <Route path="/login" element={<Loginpage />}  />
                        <Route path="/flights/cities" element={<Planes />}  />
                        <Route path="/signup" element={<SignInpage />}  />
                        <Route path="/flights/cities/booking" element={<Bookings />}  />
                        <Route path="/adminpanel" element={<Adminpanel />}  />
                        <Route path="/flights/cities/dashboard" element={<Dashboard />}  />
                    </Route>

                </Routes>
            </BrowserRouter>

            
        </>
    )
}
export default Router;