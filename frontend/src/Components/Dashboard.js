import axios from "axios";
import { useEffect, useState } from "react"


function Dashboard(){

    const[booking,setBooking] = useState([]);

    useEffect(()=>{

        const getBookings = async () =>{
            try{
                const response = await axios.get('http://localhost:8080/flights/dashboard');

                setBooking(response.data);
                console.log(response)
            }catch(err){
            console.error(err);
            }
        };
        getBookings();
    },[])

    return(
        <>
            <div className="dashboard">
                <div class="heading">
                    <h2>Booking Details!</h2>
                </div>
                <div className="">
                    {booking.length === 0 ?
                    (<p>No Booking made!</p>) :
                    
                    <div className="bookingrow">
                        {booking.map(plane => (
                            <div key={plane.id} className="bookingdetails">
                                <p>{plane.from}</p>
                                <p>{plane.to}</p>
                                <p>{plane.departDate}</p>
                                <p>{plane.returnDate}</p>
                            </div>
                        ))}
                    </div>
                    }
                </div>

            </div>
        </>
    )
}

export default Dashboard;