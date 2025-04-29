import axios from "axios";
import { useEffect, useState } from "react"
import moment from "moment"


function Dashboard(){

    const[booked,setBooked] = useState([]);

    useEffect(()=>{

        const getBookings = async () =>{
            try{
                const response = await axios.get('http://localhost:8080/flights/cities/dashboard');
                setBooked(response.data);
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
                    {booked.length === 0 ?
                    (<p>No Booking made!</p>) :
                    
                    <div className="bookedrow">
                        {booked.map(plane => (
                            <div key={plane.id} className="bookeddetails">
                                <p>{plane.origin}</p>
                                <p>{plane.destination}</p>
                                <p>Departure:{ moment(plane.departureTime).format('MMMM Do YYYY, h:mm a')} </p>
                                <p>Arrival: { moment(plane.arrivalTime).format('MMMM Do YYYY, h:mm a')}</p>
                                <p>Price: {plane.price}</p>
                                <p>Airline: {plane.flightName}</p>
                                <p>Flights: {plane.flightNumber}</p>
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