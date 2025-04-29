import axios from "axios";
import { useEffect, useState } from "react"
import moment from "moment"
import { useNavigate } from "react-router-dom";


function Bookings(){

    const navigate= useNavigate()

    const[booked,setBooked] = useState([]);

    useEffect(()=>{

        const getBookings = async () =>{
            try{
                const response = localStorage.getItem('bookingFlight')
                const parseresponse = JSON.parse(response)
                setBooked(parseresponse);
            }catch(err){
            console.error(err);
            }
        };
        getBookings();
    },[])

    const buy = async() =>{
        const buyingFLight = await axios.post('http://localhost:8080/flights/cities/booking',{
            origin: booked.origin,
            destination: booked.destination,
            departureTime: booked.departureTime,
            arrivalTime: booked.arrivalTime,
            price: booked.price,
            flightName: booked.flightName,
            flightNumber: booked.flightNumber,
        },{
            headers:{
                'Authorization': "bearer " + localStorage.getItem("token"),
            }
        })
        navigate('/flights/cities/dashboard')
    }

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
                        
                            <div key={booked.id} className="bookeddetails">
                                <p>{booked.origin}</p>
                                <p>{booked.destination}</p>
                                <p>Departure:{ moment(booked.departureTime).format('MMMM Do YYYY, h:mm a')} </p>
                                <p>Arrival: { moment(booked.arrivalTime).format('MMMM Do YYYY, h:mm a')}</p>
                                <p>Price: {booked.price}</p>
                                <p>Airline: {booked.flightName}</p>
                                <p>Flights: {booked.flightNumber}</p>
                                <button onClick={()=>buy() }>BUY</button>
                            </div>
                      
                    </div>
                    }
                </div>

            </div>
        </>
    )
}

export default Bookings;