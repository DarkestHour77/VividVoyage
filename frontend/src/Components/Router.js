import { BrowserRouter, Routes, Route } from "react-router-dom";
import Flights from "./Flights";
import Navbar from "./Navbar";
import Hotels from "./Hotels";
import Planes from "./Planes";
import Loginpage from "./Loginpage";

function Router(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route path="/" element={<Flights />} />
                        <Route path="/flights" element={<Flights />} />
                        <Route path="/hotels" element={<Hotels />}  />
                        <Route path="/login" element={<Loginpage />}  />
                        <Route path="/flights/search" element={<Planes />}  />
                    </Route>

                </Routes>
            </BrowserRouter>

            
        </>
    )
}
export default Router;